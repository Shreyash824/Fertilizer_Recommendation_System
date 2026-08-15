const LANGUAGES = ["en", "hi", "mr"];

const TRANSLATIONS = {
  en: {
    appTitle: "Fertilizer Recommendation System",
    appSubtitle: "AI-powered fertilizer selection based on soil & crop analysis",
    formTitle: "Soil & Crop Inputs",
    cropType: "Crop Type",
    soilType: "Soil Type",
    soilColor: "Soil Colour",
    selectColor: "Select soil colour",
    temperature: "Temperature (°C)",
    nitrogen: "Nitrogen (N) — mg/kg",
    phosphorous: "Phosphorous (P) — mg/kg",
    potassium: "Potassium (K) — mg/kg",
    landArea: "Farm land (acres)",
    cropStage: "Crop stage",
    selectStage: "Select crop stage",
    stageVegetative: "Vegetative",
    stageFlowering: "Flowering",
    stageFruiting: "Fruiting",
    stageMaturity: "Maturity",
    submitBtn: "Get Fertilizer Recommendation",
    resultTitle: "Recommendation",
    placeholder: "Fill the form and click the button to get your recommendation.",
    loading: "Analyzing soil & crop data...",
    recommended: "Recommended fertilizer",
    confidence: "Model confidence:",
    otherOptions: "Other suitable options",
    serverError: "Could not reach the server. Is it running?",
    footer: "ML model: Random Forest · Dataset: rule-generated agronomy data (N-P-K deficit matching)",
    selectCrop: "Select crop",
    selectSoil: "Select soil type",
    unitN: "mg/kg",
    bagsPerAcre: "bags per acre",
    totalBags: "total bags needed",
    acresLabel: "acres",
    bagWeight: "Bag size",
    kgPerAcre: "dose",
    tenureLabel: "Crop tenure",
    tenureUnit: "days",
    healthTitle: "Soil Health Alerts",
    pricePerBag: "Price per bag",
    totalCost: "Total cost",
    currency: "₹",
    combinationTitle: "Recommended combination",
    altTitle: "You can also use",
    gradeLabel: "Grade",
    bagShort: "bag",
    careTitle: "Crop Care Assistant",
    careDays: "Days",
    careSoilTip: "Soil tip",
    careCropNote: "Crop note",
    noFertilizer: "Your soil already meets the crop's needs. No fertilizer needed for now — confirm with a soil test.",
    adviceTitle: "Suggested soil tests based on your soil colour",
    adviceNote: "Missing nutrient values are estimated from your soil colour. A lab test gives the most accurate dose.",
    adviceCrops: "Often suited crops:",
    priorityHigh: "High priority",
    priorityMedium: "Medium priority",
    estimated: "estimated",
    estimatedVal: "est.",
    ratingLow: "Low",
    ratingMedium: "Medium",
    ratingHigh: "High",
  },
  hi: {
    appTitle: "उर्वरक अनुशंसा प्रणाली",
    appSubtitle: "मिट्टी एवं फसल विश्लेषण पर आधारित AI उर्वरक चयन",
    formTitle: "मिट्टी एवं फसल विवरण",
    cropType: "फसल का प्रकार",
    soilType: "मिट्टी का प्रकार",
    soilColor: "मिट्टी का रंग",
    selectColor: "मिट्टी का रंग चुनें",
    temperature: "तापमान (°C)",
    nitrogen: "नाइट्रोजन (N) — mg/kg",
    phosphorous: "फास्फोरस (P) — mg/kg",
    potassium: "पोटेशियम (K) — mg/kg",
    landArea: "खेत का क्षेत्रफल (एकड़)",
    cropStage: "फसल की अवस्था",
    selectStage: "फसल की अवस्था चुनें",
    stageVegetative: "वानस्पतिक",
    stageFlowering: "फूल आने की",
    stageFruiting: "फल लगने की",
    stageMaturity: "परिपक्वता",
    submitBtn: "उर्वरक अनुशंसा प्राप्त करें",
    resultTitle: "अनुशंसा",
    placeholder: "फॉर्म भरें और अनुशंसा पाने के लिए बटन दबाएं।",
    loading: "मिट्टी एवं फसल डेटा का विश्लेषण हो रहा है...",
    recommended: "अनुशंसित उर्वरक",
    confidence: "मॉडल की विश्वसनीयता:",
    otherOptions: "अन्य उपयुक्त विकल्प",
    serverError: "सर्वर तक नहीं पहुंच सके। क्या सर्वर चल रहा है?",
    footer: "ML मॉडल: रैंडम फॉरेस्ट · डेटासेट: नियम-आधारित कृषि डेटा (N-P-K घाटा मिलान)",
    selectCrop: "फसल चुनें",
    selectSoil: "मिट्टी का प्रकार चुनें",
    unitN: "mg/kg",
    bagsPerAcre: "बैग प्रति एकड़",
    totalBags: "कुल बैग चाहिए",
    acresLabel: "एकड़",
    bagWeight: "बैग का आकार",
    kgPerAcre: "मात्रा",
    tenureLabel: "फसल की अवधि",
    tenureUnit: "दिन",
    healthTitle: "मिट्टी स्वास्थ्य चेतावनी",
    pricePerBag: "प्रति बैग मूल्य",
    totalCost: "कुल लागत",
    currency: "₹",
    combinationTitle: "अनुशंसित संयोजन",
    altTitle: "आप इनका भी उपयोग कर सकते हैं",
    gradeLabel: "ग्रेड",
    bagShort: "बैग",
    careTitle: "फसल देखभाल सहायक",
    careDays: "दिन",
    careSoilTip: "मिट्टी सुझाव",
    careCropNote: "फसल टिप्पणी",
    noFertilizer: "आपकी मिट्टी फसल की आवश्यकता पहले ही पूरी करती है। अभी उर्वरक की आवश्यकता नहीं — मिट्टी परीक्षण से पुष्टि करें।",
    adviceTitle: "आपकी मिट्टी के रंग के आधार पर सुझाए गए मिट्टी परीक्षण",
    adviceNote: "छूटे हुए पोषक तत्व मान आपकी मिट्टी के रंग से अनुमानित हैं। सटीक मात्रा के लिए प्रयोगशाला परीक्षण कराएं।",
    adviceCrops: "उपयुक्त फसलें:",
    priorityHigh: "उच्च प्राथमिकता",
    priorityMedium: "मध्यम प्राथमिकता",
    estimated: "अनुमानित",
    estimatedVal: "अनु.",
    ratingLow: "कम",
    ratingMedium: "मध्यम",
    ratingHigh: "उच्च",
  },
  mr: {
    appTitle: "खतरे शिफारस प्रणाली",
    appSubtitle: "माती आणि पीक विश्लेषणावर आधारित AI खत निवड",
    formTitle: "माती व पीक माहिती",
    cropType: "पिकाचा प्रकार",
    soilType: "मातीचा प्रकार",
    soilColor: "मातीचा रंग",
    selectColor: "मातीचा रंग निवडा",
    temperature: "तापमान (°C)",
    nitrogen: "नत्र (N) — mg/kg",
    phosphorous: "स्फुरद (P) — mg/kg",
    potassium: "पालाश (K) — mg/kg",
    landArea: "शेत क्षेत्रफळ (एकर)",
    cropStage: "पिकाची अवस्था",
    selectStage: "पिकाची अवस्था निवडा",
    stageVegetative: "वनस्पतिजन्य",
    stageFlowering: "फुलांची",
    stageFruiting: "फळांची",
    stageMaturity: "परिपक्वता",
    submitBtn: "खत शिफारस मिळवा",
    resultTitle: "शिफारस",
    placeholder: "फॉर्म भरा आणि शिफारस मिळवण्यासाठी बटण दाबा.",
    loading: "माती व पीक डेटाचे विश्लेषण होत आहे...",
    recommended: "शिफारस केलेले खत",
    confidence: "मॉडेलचा आत्मविश्वास:",
    otherOptions: "इतर योग्य पर्याय",
    serverError: "सर्व्हरपर्यंत पोहोचता आले नाही. सर्व्हर सुरू आहे का?",
    footer: "ML मॉडेल: रँडम फॉरेस्ट · डेटासेट: नियम-आधारित कृषी डेटा (N-P-K तूट जुळणी)",
    selectCrop: "पीक निवडा",
    selectSoil: "मातीचा प्रकार निवडा",
    unitN: "mg/kg",
    bagsPerAcre: "पिशव्या प्रति एकर",
    totalBags: "एकूण पिशव्या लागतील",
    acresLabel: "एकर",
    bagWeight: "पिशवी आकार",
    kgPerAcre: "मात्रा",
    tenureLabel: "पिकाचा कालावधी",
    tenureUnit: "दिवस",
    healthTitle: "माती आरोग्य इशारे",
    pricePerBag: "प्रति पिशवी किंमत",
    totalCost: "एकूण खर्च",
    currency: "₹",
    combinationTitle: "शिफारस केलेले संयोजन",
    altTitle: "तुम्ही यांचाही वापर करू शकता",
    gradeLabel: "ग्रेड",
    bagShort: "पिशवी",
    careTitle: "पीक काळजी सहाय्यक",
    careDays: "दिवस",
    careSoilTip: "माती सूचना",
    careCropNote: "पीक टीप",
    noFertilizer: "तुमची माती पिकाची गरज आधीच पूर्ण करते. आत्ता खताची गरज नाही — माती चाचणीने पुष्टी करा.",
    adviceTitle: "तुमच्या मातीच्या रंगावर आधारित सुचवलेल्या माती चाचण्या",
    adviceNote: "हरवलेली पोषक मूल्ये मातीच्या रंगावरून अंदाजित केली जातात. अचूक डोससाठी प्रयोगशाळा चाचणी करा.",
    adviceCrops: "योग्य पिके:",
    priorityHigh: "उच्च प्राधान्य",
    priorityMedium: "मध्यम प्राधान्य",
    estimated: "अंदाजित",
    estimatedVal: "अंदा.",
    ratingLow: "कमी",
    ratingMedium: "मध्यम",
    ratingHigh: "उच्च",
  },
};

const DICTIONARIES = {
  crops: {
    en: {},
    hi: {
      rice: "चावल", wheat: "गेहूं", maize: "मक्का", cotton: "कपास",
      sugarcane: "गन्ना", potato: "आलू", tomato: "टमाटर", soybean: "सोयाबीन",
      groundnut: "मूंगफली", banana: "केला", mango: "आम", grapes: "अंगूर",
      watermelon: "तरबूज", onion: "प्याज", chickpea: "चना",
      "pearl millet": "बाजरा", sorghum: "ज्वार", "sweet potato": "शकरकंद",
      coffee: "कॉफी", tea: "चाय", beans: "फलियां", "pigeon peas": "अरहर",
    },
    mr: {
      rice: "तांदूळ", wheat: "गहू", maize: "मका", cotton: "कापूस",
      sugarcane: "ऊस", potato: "बटाटा", tomato: "टोमॅटो", soybean: "सोयाबीन",
      groundnut: "भुईमूग", banana: "केळ", mango: "आंबा", grapes: "द्राक्ष",
      watermelon: "कलिंगड", onion: "कांदा", chickpea: "हरभरा",
      "pearl millet": "बाजरी", sorghum: "ज्वारी", "sweet potato": "रताळे",
      coffee: "कॉफी", tea: "चहा", beans: "शेंगा", "pigeon peas": "तूर",
    },
  },
  soils: {
    en: {},
    hi: {
      clay: "चिकनी मिट्टी", sandy: "रेतीली मिट्टी", loamy: "दोमट मिट्टी",
      black: "काली मिट्टी", red: "लाल मिट्टी", alluvial: "जलोढ़ मिट्टी",
    },
    mr: {
      clay: "चिकणमाती", sandy: "वाळू माती", loamy: "काळी-जिरे माती",
      black: "काळी माती", red: "लाल माती", alluvial: "गाळाची माती",
    },
  },
  colors: {
    en: {
      black: "Dark black", brown: "Brown", red: "Red", yellow: "Yellow",
      gray: "Gray", sandy: "Sandy / pale", white: "White",
    },
    hi: {
      black: "काली", brown: "भूरी", red: "लाल", yellow: "पीली",
      gray: "स्लेटी", sandy: "रेतीली / हल्की", white: "सफेद",
    },
    mr: {
      black: "काळा", brown: "तपकिरी", red: "लाल", yellow: "पिवळा",
      gray: "राखाडी", sandy: "वाळू / फिकट", white: "पांढरा",
    },
  },
  tests: {
    en: {},
    hi: {
      n: "नाइट्रोजन (N)", p: "फास्फोरस (P)", k: "पोटेशियम (K)",
      ph: "मिट्टी का pH", ec: "EC (लवणता)", oc: "कार्बनिक कार्बन",
      zn: "जस्त (Zn)", fe: "लोहा (Fe)", mn: "मैंगनीज (Mn)",
      na: "सोडियम (Na)", b: "बोरॉन (B)",
    },
    mr: {
      n: "नत्र (N)", p: "स्फुरद (P)", k: "पालाश (K)",
      ph: "माती pH", ec: "EC (क्षारता)", oc: "सेंद्रिय कार्बन",
      zn: "जस्त (Zn)", fe: "लोह (Fe)", mn: "मँगनीज (Mn)",
      na: "सोडियम (Na)", b: "बोरॉन (B)",
    },
  },
};

const i18n = {
  current: "en",
  set(lang) {
    if (!TRANSLATIONS[lang]) lang = "en";
    this.current = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    this.applyStatic();
    this.applyDynamic();
  },
  t(key) {
    return (TRANSLATIONS[this.current] || TRANSLATIONS.en)[key];
  },
  crop(name) {
    return (DICTIONARIES.crops[this.current] && DICTIONARIES.crops[this.current][name]) || name;
  },
  soil(name) {
    return (DICTIONARIES.soils[this.current] && DICTIONARIES.soils[this.current][name]) || name;
  },
  color(name) {
    return (DICTIONARIES.colors[this.current] && DICTIONARIES.colors[this.current][name]) || name;
  },
  test(name) {
    return (DICTIONARIES.tests[this.current] && DICTIONARIES.tests[this.current][name]) || name;
  },
  careTasks() {
    const map = {
      vegetative: [
        "Irrigation: light, frequent watering; avoid waterlogging.",
        "Nutrients: top-dress urea at 25-30 days after sowing.",
        "Weeding: control weeds within the first 30-45 days.",
        "Pest watch: check for cutworm and stem borer.",
      ],
      flowering: [
        "Irrigation: keep soil moist — flowering is the critical stage.",
        "Nutrients: apply potassium (MOP) and a zinc/boron spray.",
        "Pest watch: monitor borers and aphids; spray only above threshold.",
      ],
      fruiting: [
        "Irrigation: moderate, regular water; avoid moisture stress.",
        "Nutrients: light potassium top-dressing for fruit/seed fill.",
        "Pest watch: watch for fruit borers and fungal spots.",
      ],
      maturity: [
        "Irrigation: stop watering 10-15 days before harvest.",
        "Nutrients: stop nitrogen — no more vegetative growth.",
        "Harvest: collect at full maturity and dry properly.",
      ],
    };
    const tr = {
      vegetative: [
        "सिंचाई: हल्की, बार-बार; जलभराव से बचें।",
        "पोषक तत्व: बुवाई के 25-30 दिन बाद यूरिया की टॉप-ड्रेसिंग।",
        "निराई: पहले 30-45 दिनों में खरपतवार नियंत्रण।",
        "कीट निगरानी: कटवर्म और तना छेदक की जाँच करें।",
      ],
      flowering: [
        "सिंचाई: मिट्टी नम रखें — फूल आना महत्वपूर्ण अवस्था है।",
        "पोषक तत्व: पोटेशियम (MOP) और जस्ता/बोरॉन स्प्रे करें।",
        "कीट निगरानी: छेदक और एफिड पर नजर; सीमा से अधिक होने पर ही स्प्रे।",
      ],
      fruiting: [
        "सिंचाई: मध्यम नियमित पानी; नमी तनाव से बचें।",
        "पोषक तत्व: फल भराव के लिए हल्की पोटेशियम टॉप-ड्रेसिंग।",
        "कीट निगरानी: फल छेदक और फंगल धब्बों पर नजर रखें।",
      ],
      maturity: [
        "सिंचाई: कटाई से 10-15 दिन पहले पानी बंद करें।",
        "पोषक तत्व: नाइट्रोजन बंद करें — वानस्पतिक वृद्धि नहीं चाहिए।",
        "कटाई: पूर्ण परिपक्वता पर कटाई और अच्छी तरह सुखाएं।",
      ],
    };
    const mr = {
      vegetative: [
        "सिंचाई: हलके, वारंवार पाणी; पाणी साचू देऊ नका.",
        "पोषक: पेरणीनंतर 25-30 दिवसांनी युरियाची टॉप-ड्रेसिंग.",
        "तण नियंत्रण: पहिल्या 30-45 दिवसांत तण नियंत्रण करा.",
        "कीड नजर: कटवर्म आणि खोड पोखरणाऱ्या अळीची तपासणी.",
      ],
      flowering: [
        "सिंचाई: माती ओलसर ठेवा — फुलोरा ही महत्त्वाची अवस्था आहे.",
        "पोषक: पालाश (MOP) आणि जस्त/बोरॉन फवारणी करा.",
        "कीड नजर: पोखरणाऱ्या अळ्या आणि मावा पहा; फक्त गरजेपेक्षा जास्त असेल तरच फवारा.",
      ],
      fruiting: [
        "सिंचाई: मध्यम, नियमित पाणी; पाण्याचा ताण टाळा.",
        "पोषक: फळभरण्यासाठी हलकी पालाश टॉप-ड्रेसिंग.",
        "कीड नजर: फळ पोखरणाऱ्या अळ्या आणि बुरशीचे डाग पहा.",
      ],
      maturity: [
        "सिंचाई: काढणीच्या 10-15 दिवस आधी पाणी बंद करा.",
        "पोषक: नत्र थांबवा — वनस्पतिजन्य वाढ नको.",
        "काढणी: पूर्ण परिपक्वतेवर काढणी करा आणि व्यवस्थित सुकवा.",
      ],
    };
    const sel = { en: map, hi: tr, mr: mr }[this.current] || map;
    return sel;
  },
  applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = this.t(key);
    });
    document.title = this.t("appTitle");
    const btn = document.getElementById("recommend-btn");
    if (btn) btn.textContent = this.t("submitBtn");
  },
  applyDynamic() {
    fillOptions();
  },
};

function initLangSwitcher() {
  const sel = document.getElementById("lang-select");
  if (!sel) return;
  sel.addEventListener("change", () => i18n.set(sel.value));
  i18n.current = localStorage.getItem("lang") || "en";
  sel.value = i18n.current;
  i18n.applyStatic();
}
