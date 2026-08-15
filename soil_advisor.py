SOIL_COLORS = ["black", "brown", "red", "yellow", "gray", "sandy", "white"]

COLOR_BASELINES = {
    "black": (140, 50, 180),
    "brown": (130, 45, 120),
    "red": (90, 35, 90),
    "yellow": (80, 30, 80),
    "gray": (100, 40, 90),
    "sandy": (60, 25, 60),
    "white": (70, 30, 70),
}

SOIL_TYPE_BASELINES = {
    "clay": (180, 60, 150),
    "sandy": (60, 25, 60),
    "loamy": (120, 40, 100),
    "black": (140, 50, 180),
    "red": (90, 35, 90),
    "alluvial": (130, 45, 120),
}

RATING_LIMITS = {
    "Nitrogen": (100, 180),
    "Phosphorous": (35, 55),
    "Potassium": (100, 170),
}

REASONS = {
    "acidic_fertility": "Red/laterite soils are often acidic and can fix phosphorus, making it unavailable.",
    "salinity": "Black/white soils are prone to salinity and alkalinity build-up.",
    "zinc_deficient": "Calcareous and black soils are commonly zinc deficient.",
    "npk": "Alluvial/brown soils need balanced N, P and K checking.",
    "oc": "Sandy and red soils lose organic matter quickly.",
    "fe_mn": "Yellowish/grey (waterlogged) soils can accumulate iron and manganese.",
    "drainage": "Grey soils indicate poor drainage and waterlogging.",
    "leaching": "Sandy/pale soils have low nutrient retention and high leaching loss.",
    "sodicity": "White crusting indicates sodium/salinity problems.",
    "micronutrients": "Sandy soils are often deficient in micronutrients like Zn and B.",
    "ph": "Soil pH controls availability of all nutrients.",
}

COLOR_TESTS = {
    "black": [
        ("ph", "high", "ph"),
        ("ec", "high", "salinity"),
        ("zn", "high", "zinc_deficient"),
        ("p", "medium", "acidic_fertility"),
        ("oc", "medium", "oc"),
    ],
    "brown": [
        ("n", "high", "npk"),
        ("p", "high", "npk"),
        ("k", "high", "npk"),
        ("ec", "medium", "salinity"),
        ("oc", "medium", "oc"),
    ],
    "red": [
        ("ph", "high", "ph"),
        ("p", "high", "acidic_fertility"),
        ("zn", "high", "zinc_deficient"),
        ("oc", "medium", "oc"),
        ("fe", "medium", "fe_mn"),
    ],
    "yellow": [
        ("ph", "high", "ph"),
        ("fe", "high", "fe_mn"),
        ("mn", "high", "fe_mn"),
        ("n", "medium", "npk"),
    ],
    "gray": [
        ("ec", "high", "drainage"),
        ("fe", "high", "fe_mn"),
        ("mn", "high", "fe_mn"),
        ("ph", "medium", "ph"),
    ],
    "sandy": [
        ("oc", "high", "leaching"),
        ("n", "high", "leaching"),
        ("k", "high", "leaching"),
        ("zn", "medium", "micronutrients"),
        ("b", "medium", "micronutrients"),
    ],
    "white": [
        ("ec", "high", "sodicity"),
        ("ph", "high", "ph"),
        ("na", "high", "sodicity"),
        ("n", "medium", "npk"),
    ],
}

COLOR_CROPS = {
    "black": ["cotton", "sugarcane", "sorghum"],
    "brown": ["wheat", "rice", "sugarcane"],
    "red": ["groundnut", "chickpea", "pearl millet"],
    "yellow": ["rice", "tea"],
    "gray": ["rice", "tea"],
    "sandy": ["groundnut", "watermelon", "potato", "sweet potato"],
    "white": ["sorghum", "onion"],
}


def estimate_npk(soil_color, soil_type):
    if soil_color and soil_color in COLOR_BASELINES:
        return COLOR_BASELINES[soil_color]
    if soil_type and soil_type in SOIL_TYPE_BASELINES:
        return SOIL_TYPE_BASELINES[soil_type]
    return 100, 40, 100


def rate_nutrient(name, value):
    low, high = RATING_LIMITS[name]
    if value < low:
        return "low"
    if value <= high:
        return "medium"
    return "high"


def suggested_tests(color):
    return [
        {"key": key, "priority": priority, "reason": REASONS[reason_key]}
        for (key, priority, reason_key) in COLOR_TESTS[color]
    ]


SOIL_TYPE_TESTS = {
    "clay": [
        ("ph", "high", "ph"),
        ("ec", "medium", "salinity"),
        ("oc", "medium", "oc"),
        ("n", "medium", "npk"),
    ],
    "sandy": COLOR_TESTS["sandy"],
    "loamy": [
        ("n", "high", "npk"),
        ("p", "high", "npk"),
        ("k", "high", "npk"),
        ("oc", "medium", "oc"),
    ],
    "black": COLOR_TESTS["black"],
    "red": COLOR_TESTS["red"],
    "alluvial": COLOR_TESTS["brown"],
}

SOIL_TYPE_CROPS = {
    "clay": ["rice", "sugarcane", "maize"],
    "sandy": ["groundnut", "watermelon", "potato", "sweet potato"],
    "loamy": ["wheat", "rice", "vegetables"],
    "black": ["cotton", "sugarcane", "sorghum"],
    "red": ["groundnut", "chickpea", "pearl millet"],
    "alluvial": ["wheat", "rice", "sugarcane"],
}

CROP_DOSES = {
    "rice": (48, 24, 16), "wheat": (40, 20, 16), "maize": (32, 16, 12),
    "cotton": (36, 18, 16), "sugarcane": (60, 24, 24), "potato": (48, 24, 40),
    "tomato": (40, 20, 40), "soybean": (8, 16, 16), "groundnut": (8, 16, 16),
    "banana": (40, 16, 80), "mango": (24, 12, 16), "grapes": (24, 16, 32),
    "watermelon": (32, 16, 24), "onion": (36, 16, 24), "chickpea": (8, 16, 12),
    "pearl millet": (24, 12, 12), "sorghum": (32, 16, 12), "sweet potato": (24, 16, 32),
    "coffee": (40, 16, 24), "tea": (48, 16, 32), "beans": (8, 16, 16),
    "pigeon peas": (8, 16, 12),
}

STAGES = ["vegetative", "flowering", "fruiting", "maturity"]

CROP_TENURE = {
    "rice": 120, "wheat": 130, "maize": 110, "cotton": 180,
    "sugarcane": 360, "potato": 90, "tomato": 120, "soybean": 95,
    "groundnut": 120, "banana": 330, "mango": 270, "grapes": 240,
    "watermelon": 90, "onion": 120, "chickpea": 110,
    "pearl millet": 95, "sorghum": 110, "sweet potato": 120,
    "coffee": 270, "tea": 365, "beans": 80, "pigeon peas": 150,
}

TENURE_BUCKETS = {
    "short": {"vegetative": 0.7, "flowering": 1.0, "fruiting": 0.6, "maturity": 0.2},
    "medium": {"vegetative": 0.6, "flowering": 1.0, "fruiting": 0.8, "maturity": 0.3},
    "long": {"vegetative": 0.5, "flowering": 1.0, "fruiting": 0.9, "maturity": 0.5},
}


def tenure_bucket(tenure):
    if tenure < 120:
        return "short"
    if tenure <= 200:
        return "medium"
    return "long"

FERTILIZER_GRADES = {
    "Urea": (0.46, 0.0, 0.0),
    "DAP": (0.18, 0.46, 0.0),
    "14-35-14": (0.14, 0.35, 0.14),
    "28-28": (0.28, 0.28, 0.0),
    "17-17-17": (0.17, 0.17, 0.17),
    "20-20": (0.20, 0.20, 0.0),
    "10-26-26": (0.10, 0.26, 0.26),
    "MOP": (0.0, 0.0, 0.6),
    "No Fertilizer Needed": (0.0, 0.0, 0.0),
}

BAG_WEIGHT_KG = 50

FERTILIZER_PRICES = {
    "Urea": 300,
    "DAP": 1350,
    "14-35-14": 1800,
    "28-28": 1200,
    "17-17-17": 1500,
    "20-20": 1100,
    "10-26-26": 1400,
    "MOP": 1600,
}


def suggest_tests_for(soil_color, soil_type):
    if soil_color and soil_color in COLOR_TESTS:
        return {
            "tests": suggested_tests(soil_color),
            "crops": COLOR_CROPS.get(soil_color, []),
        }
    if soil_type and soil_type in SOIL_TYPE_TESTS:
        return {
            "tests": [
                {"key": key, "priority": priority, "reason": REASONS[reason_key]}
                for (key, priority, reason_key) in SOIL_TYPE_TESTS[soil_type]
            ],
            "crops": SOIL_TYPE_CROPS.get(soil_type, []),
        }
    return {"tests": [], "crops": []}


def _availability_factor(soil_value, low, high):
    if soil_value <= low:
        return 1.0
    if soil_value >= high:
        return 0.4
    frac = (soil_value - low) / (high - low)
    return round(1.0 - 0.6 * frac, 2)


def _effective_doses(crop, n, p, k, stage):
    dose_n, dose_p, dose_k = CROP_DOSES[crop]
    tenure = CROP_TENURE.get(crop, 130)
    factors = TENURE_BUCKETS[tenure_bucket(tenure)]
    stage_factor = factors.get(stage, 1.0)
    f_n = _availability_factor(n, *RATING_LIMITS["Nitrogen"])
    f_p = _availability_factor(p, *RATING_LIMITS["Phosphorous"])
    f_k = _availability_factor(k, *RATING_LIMITS["Potassium"])
    return (
        round(dose_n * f_n * stage_factor, 1),
        round(dose_p * f_p * stage_factor, 1),
        round(dose_k * f_k * stage_factor, 1),
    )


def tenure_of(crop):
    return CROP_TENURE.get(crop, 130)


SOIL_ALERTS = {
    "black": [
        {
            "level": "high",
            "title": "Zinc deficiency likely",
            "advice": "About 65% of Indian soils are zinc-deficient. Consider 0.5 kg zinc sulphate /acre foliar spray before flowering.",
        },
        {
            "level": "medium",
            "title": "Salinity / alkalinity risk",
            "advice": "Black cotton soils are calcareous. Test EC; apply gypsum if pH is above 8.5 and avoid over-watering.",
        },
        {
            "level": "medium",
            "title": "Phosphorus may be locked",
            "advice": "Alkaline soils can fix phosphorus. Place DAP near the root zone or use 14-35-14.",
        },
    ],
    "brown": [
        {
            "level": "low",
            "title": "Generally balanced soil",
            "advice": "Alluvial/brown soils are usually fertile. Maintain organic matter and avoid over-applying urea.",
        },
        {
            "level": "medium",
            "title": "Check EC",
            "advice": "Monitor salinity build-up from canal irrigation; test EC once a year.",
        },
    ],
    "red": [
        {
            "level": "high",
            "title": "Acidity + phosphorus fixation",
            "advice": "Red/laterite soils are acidic and fix phosphorus. Apply lime (~500 kg/acre) and prefer DAP/SSP with organic matter.",
        },
        {
            "level": "medium",
            "title": "Zinc / iron deficiency risk",
            "advice": "Use zinc and iron chelates if deficiency symptoms (yellowing, stunted growth) appear.",
        },
    ],
    "yellow": [
        {
            "level": "high",
            "title": "Waterlogging / Fe-Mn toxicity",
            "advice": "Yellowish soils suggest poor drainage. Improve drainage, avoid excess water, and test Fe and Mn.",
        },
    ],
    "gray": [
        {
            "level": "high",
            "title": "Poor drainage",
            "advice": "Grey soils are waterlogged. Create field drains and test EC, Fe, and Mn before planting.",
        },
    ],
    "sandy": [
        {
            "level": "high",
            "title": "Low organic carbon",
            "advice": "Sandy soils lose organic carbon fast. Add compost/FYM (2-4 tonnes/acre) every year.",
        },
        {
            "level": "high",
            "title": "N and K leaching",
            "advice": "Nutrients leach quickly in sandy soils. Split nitrogen into 3 doses and prefer neem-coated / slow-release urea.",
        },
    ],
    "white": [
        {
            "level": "high",
            "title": "Salinity / sodicity",
            "advice": "White crusting indicates salts or sodium. Leach with good-quality water, apply gypsum, and test EC and pH.",
        },
    ],
}

SOIL_TYPE_ALERTS = {
    "clay": [
        {
            "level": "medium",
            "title": "Poor aeration / drainage",
            "advice": "Clay soils hold water and drain slowly. Avoid waterlogging and test EC for salinity.",
        },
    ],
    "sandy": SOIL_ALERTS["sandy"],
    "loamy": SOIL_ALERTS["brown"],
    "black": SOIL_ALERTS["black"],
    "red": SOIL_ALERTS["red"],
    "alluvial": SOIL_ALERTS["brown"],
}


def alerts_for(soil_color, soil_type):
    if soil_color and soil_color in SOIL_ALERTS:
        return SOIL_ALERTS[soil_color]
    if soil_type and soil_type in SOIL_TYPE_ALERTS:
        return SOIL_TYPE_ALERTS[soil_type]
    return []


def npk_balance(n, p, k):
    flags = []
    n_over_p = n / max(p, 1)
    n_over_k = n / max(k, 1)
    if n_over_p > 3:
        flags.append(
            "Phosphorus is relatively low vs nitrogen — prefer P-rich grades (DAP or 14-35-14)."
        )
    if n_over_k > 6:
        flags.append(
            "Potassium is relatively low vs nitrogen — add 10-26-26 or a potassic source."
        )
    if n_over_p <= 3 and n_over_k <= 6:
        flags.append("Soil N:P:K balance is near the 4:2:1 ideal. Maintain a balanced grade.")
    return flags


CROP_NOTES = {
    "rice": "Maintain 2-5 cm standing water; apply urea in 2-3 splits.",
    "wheat": "Avoid late irrigation; give the last water at grain-filling.",
    "maize": "Earthing-up at knee height; control fall armyworm.",
    "cotton": "Monitor pink bollworm; stop irrigation after 50% boll opening.",
    "sugarcane": "Trash mulching saves moisture; de-trash at 5 months.",
    "potato": "Hilling at 30 days; control late blight.",
    "tomato": "Staking and mulching; watch for fruit borer and leaf curl.",
    "soybean": "Rhizobium-treated seed; control girdle beetle.",
    "groundnut": "Hoeing and earthing-up; control leaf miner and tikka leaf spot.",
    "banana": "Keep the basin clean; remove suckers regularly.",
    "mango": "Control hopper and powdery mildew at flowering.",
    "grapes": "Bunch tipping; control downy mildew.",
    "watermelon": "Thin to 2 fruits per vine; control aphids.",
    "onion": "Stop irrigation 15 days before harvest; control thrips.",
    "chickpea": "Control pod borer; avoid excess irrigation.",
    "pearl millet": "Thin at 15 days; control shoot fly.",
    "sorghum": "Thin at 20 days; control shoot fly and stem borer.",
    "sweet potato": "De-vine after 60 days; control weevils.",
    "coffee": "Manage shade; control white stem borer.",
    "tea": "Regular plucking rounds; monitor tea mosquito bug.",
    "beans": "Stake pole beans; control bean fly.",
    "pigeon peas": "Inter-culture and earthing-up; use pheromone traps for pod borer.",
}

SOIL_TIPS = {
    "black": "Zinc foliar spray at flowering; avoid excess irrigation.",
    "brown": "Split nitrogen doses; maintain organic matter.",
    "red": "Lime before sowing; place phosphorus near the root zone.",
    "yellow": "Improve field drainage before sowing.",
    "gray": "Create field drains; delay sowing if the field is waterlogged.",
    "sandy": "Split urea into 3 doses; prefer neem-coated urea.",
    "white": "Leach salts with good-quality water; apply gypsum.",
}


def stage_plan(crop, soil_color, soil_type):
    tenure = CROP_TENURE.get(crop, 130)
    c1 = max(1, int(tenure * 0.40))
    c2 = max(c1 + 1, int(tenure * 0.65))
    c3 = max(c2 + 1, int(tenure * 0.85))
    ranges = [
        ("vegetative", 1, c1),
        ("flowering", c1 + 1, c2),
        ("fruiting", c2 + 1, c3),
        ("maturity", c3 + 1, tenure),
    ]
    if soil_color and soil_color in SOIL_TIPS:
        soil_tip = SOIL_TIPS[soil_color]
    elif soil_type in SOIL_TYPE_ALERTS:
        soil_tip = SOIL_TIPS.get(
            {"sandy": "sandy", "black": "black", "red": "red", "alluvial": "brown", "clay": "gray", "loamy": "brown"}[soil_type],
            "",
        )
    else:
        soil_tip = ""
    return {
        "crop": crop,
        "tenure_days": tenure,
        "stages": [{"stage": s, "day_from": d1, "day_to": d2} for (s, d1, d2) in ranges],
        "crop_note": CROP_NOTES.get(crop, ""),
        "soil_tip": soil_tip,
    }


def bags_for(grade, crop, n, p, k, stage):
    eff_n, eff_p, eff_k = _effective_doses(crop, n, p, k, stage)
    fn, fp, fk = FERTILIZER_GRADES.get(grade, (0.0, 0.0, 0.0))
    if fn + fp + fk == 0:
        return 0, 0
    kg_needed = 0.0
    if fn > 0:
        kg_needed = max(kg_needed, eff_n / fn)
    if fp > 0:
        kg_needed = max(kg_needed, eff_p / fp)
    if fk > 0:
        kg_needed = max(kg_needed, eff_k / fk)
    import math

    bags_per_acre = max(1, int(math.ceil(kg_needed / BAG_WEIGHT_KG)))
    return bags_per_acre, kg_needed


def combination_for(pred, crop, n, p, k, stage):
    import math

    eff_n, eff_p, eff_k = _effective_doses(crop, n, p, k, stage)
    if eff_n + eff_p + eff_k <= 0:
        return []
    parts = []
    eff_n_rem, eff_k_rem = eff_n, eff_k
    if pred not in ("Urea", "No Fertilizer Needed") and pred in FERTILIZER_GRADES:
        fn, fp, fk = FERTILIZER_GRADES[pred]
        if eff_p > 0 and fp > 0:
            kg = eff_p / fp
        elif eff_k > 0 and fk > 0:
            kg = eff_k / fk
        elif eff_n > 0 and fn > 0:
            kg = eff_n / fn
        else:
            kg = 0
        bags = max(1, int(math.ceil(kg / BAG_WEIGHT_KG))) if kg > 0 else 0
        if bags > 0:
            parts.append((pred, bags))
            eff_n_rem = max(0.0, eff_n - bags * BAG_WEIGHT_KG * fn)
            eff_k_rem = max(0.0, eff_k - bags * BAG_WEIGHT_KG * fk)
    if eff_n_rem > 0:
        bags = int(math.ceil(eff_n_rem / 0.46 / BAG_WEIGHT_KG))
        if bags >= 1:
            parts.append(("Urea", bags))
    if eff_k_rem > 0:
        _, _, fk = FERTILIZER_GRADES["MOP"]
        bags = int(math.ceil(eff_k_rem / fk / BAG_WEIGHT_KG))
        if bags >= 1:
            parts.append(("MOP", bags))
    return [
        {
            "name": name,
            "bags": bags,
            "per_bag": FERTILIZER_PRICES.get(name, 0),
            "cost": FERTILIZER_PRICES.get(name, 0) * bags,
        }
        for name, bags in parts
    ]


def alternatives_from(top3):
    alts = []
    for item in top3:
        name = item["fertilizer"]
        if name in FERTILIZER_GRADES and name != "No Fertilizer Needed":
            fn, fp, fk = FERTILIZER_GRADES[name]
            alts.append(
                {
                    "name": name,
                    "grade": f"{int(fn * 100)}-{int(fp * 100)}-{int(fk * 100)}",
                    "per_bag": FERTILIZER_PRICES.get(name, 0),
                }
            )
    return alts
