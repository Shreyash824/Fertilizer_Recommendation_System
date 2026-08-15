import csv
import random

CROPS = ["rice", "wheat", "maize", "cotton", "sugarcane", "potato", "tomato", "soybean",
         "groundnut", "banana", "mango", "grapes", "watermelon", "onion", "chickpea",
         "pearl millet", "sorghum", "sweet potato", "coffee", "tea", "beans", "pigeon peas"]

SOIL_TYPES = ["clay", "sandy", "loamy", "black", "red", "alluvial"]

CROP_NPK = {
    "rice": (120, 60, 40), "wheat": (100, 50, 40), "maize": (80, 40, 30),
    "cotton": (90, 45, 40), "sugarcane": (150, 60, 60), "potato": (120, 60, 100),
    "tomato": (100, 50, 100), "soybean": (20, 40, 40), "groundnut": (20, 40, 40),
    "banana": (100, 40, 200), "mango": (60, 30, 40), "grapes": (60, 40, 80),
    "watermelon": (80, 40, 60), "onion": (90, 40, 60), "chickpea": (20, 40, 30),
    "pearl millet": (60, 30, 30), "sorghum": (80, 40, 30), "sweet potato": (60, 40, 80),
    "coffee": (100, 40, 60), "tea": (120, 40, 80), "beans": (20, 40, 40),
    "pigeon peas": (20, 40, 30),
}

FERTILIZERS = {
    "Urea": (46, 0, 0),
    "DAP": (18, 46, 0),
    "14-35-14": (14, 35, 14),
    "28-28": (28, 28, 0),
    "17-17-17": (17, 17, 17),
    "20-20": (20, 20, 0),
    "10-26-26": (10, 26, 26),
}

NO_FERTILIZER = "No Fertilizer Needed"


def soil_baseline(soil):
    base = {"clay": (180, 60, 150), "sandy": (60, 25, 60),
            "loamy": (120, 40, 100), "black": (140, 50, 180),
            "red": (90, 35, 90), "alluvial": (130, 45, 120)}
    return base[soil]


def fertilizer_fit(n_def, p_def, k_def):
    best, best_score = None, -1
    for name, (fn, fp, fk) in FERTILIZERS.items():
        score = fn * max(n_def, 0) + fp * max(p_def, 0) + fk * max(k_def, 0)
        penalty = 0.8 * (fn * max(-n_def, 0) + fp * max(-p_def, 0) + fk * max(-k_def, 0))
        score -= penalty
        if score > best_score:
            best, best_score = name, score
    if best_score <= 0:
        return NO_FERTILIZER
    return best


def generate(num_rows=3000, seed=42):
    random.seed(seed)
    rows = []
    header = ["Temperature", "Humidity", "Moisture", "Soil Type", "Crop Type",
              "Nitrogen", "Potassium", "Phosphorous", "Fertilizer Name"]
    for _ in range(num_rows):
        crop = random.choice(CROPS)
        soil = random.choice(SOIL_TYPES)
        temp = round(random.uniform(10, 40), 1)
        humidity = round(random.uniform(20, 90), 1)
        moisture = round(random.uniform(10, 60), 1)

        tgt_n, tgt_p, tgt_k = CROP_NPK[crop]
        bl_n, bl_p, bl_k = soil_baseline(soil)
        rand_n = round(bl_n * random.uniform(0.35, 1.1), 1)
        rand_p = round(bl_p * random.uniform(0.35, 1.1), 1)
        rand_k = round(bl_k * random.uniform(0.35, 1.1), 1)

        deficit_n = tgt_n - rand_n
        deficit_p = tgt_p - rand_p
        deficit_k = tgt_k - rand_k

        current_n = rand_n + max(deficit_n, 0)
        current_p = rand_p + max(deficit_p, 0)
        current_k = rand_k + max(deficit_k, 0)

        fert = fertilizer_fit(deficit_n, deficit_p, deficit_k)

        rows.append([temp, humidity, moisture, soil, crop,
                     round(current_n, 1), round(current_k, 1), round(current_p, 1), fert])

    with open("data/fertilizer_dataset.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)

    print(f"Generated {num_rows} rows -> data/fertilizer_dataset.csv")


if __name__ == "__main__":
    generate()
