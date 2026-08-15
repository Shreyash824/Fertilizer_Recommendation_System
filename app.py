import os
import warnings

warnings.filterwarnings("ignore")
os.environ["OMP_NUM_THREADS"] = "4"

import joblib
import pandas as pd
from flask import Flask, jsonify, render_template, request

from data.soil_advisor import (
    SOIL_COLORS,
    COLOR_BASELINES,
    COLOR_CROPS,
    estimate_npk,
    rate_nutrient,
    suggested_tests,
    suggest_tests_for,
    bags_for,
    tenure_of,
    alerts_for,
    npk_balance,
    combination_for,
    alternatives_from,
    stage_plan,
    FERTILIZER_PRICES,
    BAG_WEIGHT_KG,
)

MODEL_PATH = "model/fertilizer_model.pkl"
ENCODERS_PATH = "model/encoders.pkl"

app = Flask(__name__)

model = None
encoders = None


def load_artifacts():
    global model, encoders
    if model is None:
        model = joblib.load(MODEL_PATH)
        encoders = joblib.load(ENCODERS_PATH)


def predict(features):
    load_artifacts()
    df = pd.DataFrame([features])
    df["Soil Type"] = encoders["Soil Type"].transform(df["Soil Type"])
    df["Crop Type"] = encoders["Crop Type"].transform(df["Crop Type"])
    pred = model.predict(df)[0]
    proba = model.predict_proba(df)[0]
    top3_idx = proba.argsort()[::-1][:3]
    top3 = [
        {
            "fertilizer": model.classes_[i],
            "confidence": round(float(proba[i]) * 100, 1),
        }
        for i in top3_idx
    ]
    return pred, top3


def _to_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/predict", methods=["POST"])
def api_predict():
    data = request.get_json(force=True)
    try:
        soil_type = data["soil_type"].lower()
        soil_color = (data.get("soil_color") or "").lower().strip()

        est_n, est_p, est_k = estimate_npk(soil_color, soil_type)
        n_val, p_val, k_val = est_n, est_p, est_k

        crop = data["crop_type"].lower()
        land_area = _to_float(data.get("land_area")) or 1.0
        crop_stage = (data.get("crop_stage") or "flowering").lower().strip()
        if land_area <= 0:
            land_area = 1.0

        features = {
            "Temperature": float(data["temperature"]),
            "Humidity": 60.0,
            "Moisture": 35.0,
            "Soil Type": soil_type,
            "Crop Type": crop,
            "Nitrogen": n_val,
            "Potassium": k_val,
            "Phosphorous": p_val,
        }
        pred, top3 = predict(features)

        bags_per_acre, kg_per_acre = bags_for(pred, crop, n_val, p_val, k_val, crop_stage)
        total_bags = bags_per_acre * round(land_area)

        combination = combination_for(pred, crop, n_val, p_val, k_val, crop_stage)
        combo_bags = sum(c["bags"] for c in combination)
        combo_cost = sum(c["cost"] for c in combination)
        alts = alternatives_from(top3)

        ratings = {
            "nitrogen": rate_nutrient("Nitrogen", n_val),
            "phosphorous": rate_nutrient("Phosphorous", p_val),
            "potassium": rate_nutrient("Potassium", k_val),
        }
        estimated = {
            "nitrogen": True,
            "phosphorous": True,
            "potassium": True,
        }
        used = {"nitrogen": n_val, "phosphorous": p_val, "potassium": k_val}

        soil_advice = suggest_tests_for(soil_color, soil_type)

        return jsonify(
            {
                "recommendation": pred,
                "top3": top3,
                "ratings": ratings,
                "estimated": estimated,
                "used": used,
                "bags": {
                    "per_acre": bags_per_acre,
                    "total": total_bags,
                    "kg_per_acre": round(kg_per_acre, 1),
                    "acres": round(land_area, 2),
                },
                "tenure_days": tenure_of(crop),
                "price": {
                    "per_bag": FERTILIZER_PRICES.get(pred, 0),
                    "total": FERTILIZER_PRICES.get(pred, 0) * total_bags,
                    "bag_kg": BAG_WEIGHT_KG,
                },
                "combination": combination,
                "alt": alts,
                "combo_total": {"bags": combo_bags, "cost": combo_cost},
                "alerts": alerts_for(soil_color, soil_type),
                "balance": npk_balance(n_val, p_val, k_val),
                "soil_tests": soil_advice["tests"],
                "crops": soil_advice["crops"],
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/soil-advice")
def api_soil_advice():
    color = (request.args.get("color") or "").lower().strip()
    if color not in SOIL_COLORS:
        return jsonify({"error": "unknown soil colour"}), 400
    baseline = COLOR_BASELINES[color]
    return jsonify(
        {
            "tests": suggested_tests(color),
            "crops": COLOR_CROPS[color],
            "baseline": {
                "nitrogen": baseline[0],
                "phosphorous": baseline[1],
                "potassium": baseline[2],
            },
        }
    )


@app.route("/api/options")
def api_options():
    load_artifacts()
    return jsonify(
        {
            "soil_types": encoders["Soil Type"].classes_.tolist(),
            "crop_types": encoders["Crop Type"].classes_.tolist(),
        }
    )


@app.route("/api/care-plan", methods=["POST"])
def api_care_plan():
    data = request.get_json(force=True)
    try:
        crop = data["crop"].lower()
        soil_color = (data.get("soil_color") or "").lower().strip()
        soil_type = (data.get("soil_type") or "").lower().strip()
        return jsonify(stage_plan(crop, soil_color, soil_type))
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    load_artifacts()
    app.run(host="0.0.0.0", port=5000, debug=True)
