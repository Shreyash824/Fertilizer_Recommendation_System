const form = document.getElementById("recommend-form");
const result = document.getElementById("result");
const btn = document.getElementById("recommend-btn");
let lastCrop = "";

const inputs = {
  temperature: document.getElementById("temperature"),
  soil_type: document.getElementById("soil_type"),
  soil_color: document.getElementById("soil_color"),
  crop_type: document.getElementById("crop_type"),
  land_area: document.getElementById("land_area"),
  crop_stage: document.getElementById("crop_stage"),
};

const SOIL_COLORS = ["black", "brown", "red", "yellow", "gray", "sandy", "white"];

const TEST_NAMES = {
  n: "Nitrogen (N)",
  p: "Phosphorous (P)",
  k: "Potassium (K)",
  ph: "Soil pH",
  ec: "EC (salinity)",
  oc: "Organic Carbon",
  zn: "Zinc (Zn)",
  fe: "Iron (Fe)",
  mn: "Manganese (Mn)",
  na: "Sodium (Na)",
  b: "Boron (B)",
};

function translateTest(key) {
  if (i18n.current === "en") return TEST_NAMES[key];
  return i18n.test(key);
}

function fillOptions() {
  fetch("/api/options")
    .then((r) => r.json())
    .then((data) => {
      const lang = i18n.current;
      inputs.crop_type.innerHTML =
        `<option value="" disabled selected>${i18n.t("selectCrop")}</option>`;
      inputs.soil_type.innerHTML =
        `<option value="" disabled selected>${i18n.t("selectSoil")}</option>`;

      data.soil_types.forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = lang === "en" ? s.charAt(0).toUpperCase() + s.slice(1) : i18n.soil(s);
        inputs.soil_type.appendChild(opt);
      });
      data.crop_types.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = lang === "en" ? c.charAt(0).toUpperCase() + c.slice(1) : i18n.crop(c);
        inputs.crop_type.appendChild(opt);
      });

      const selectedColor = inputs.soil_color.value;
      inputs.soil_color.innerHTML =
        `<option value="" selected>${i18n.t("selectColor")}</option>`;
      SOIL_COLORS.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = i18n.color(c);
        inputs.soil_color.appendChild(opt);
      });
      if (selectedColor) inputs.soil_color.value = selectedColor;
    });
}

function setDefaults() {
  inputs.temperature.value = 27;
  inputs.land_area.value = 1;
  inputs.crop_stage.value = "flowering";
}

const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

function openModal(title, html) {
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modalOverlay.classList.remove("hidden");
}

function closeModal() {
  modalOverlay.classList.add("hidden");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function alertsHtml(alerts, balance) {
  if ((!alerts || !alerts.length) && (!balance || !balance.length)) return "";
  const alertHtml = (alerts || [])
    .map(
      (a) => `
      <li class="alert alert-${a.level}">
        <span class="alert-title">${a.title}</span>
        <span class="alert-advice">${a.advice}</span>
      </li>`
    )
    .join("");
  const balanceHtml = (balance || []).map((b) => `<li class="balance-item">${b}</li>`).join("");
  return `
    ${alertHtml ? `<ul class="alerts">${alertHtml}</ul>` : ""}
    ${balanceHtml ? `<ul class="balance-list">${balanceHtml}</ul>` : ""}`;
}

function soilTestsHtml(tests, crops) {
  if (!tests || !tests.length) return "";
  return `
    <ul class="advice-tests">
      ${tests
        .map(
          (t) => `
        <li>
          <span class="test-name">${translateTest(t.key)}</span>
          <span class="priority priority-${t.priority}">${i18n.t("priority" + t.priority.charAt(0).toUpperCase() + t.priority.slice(1))}</span>
        </li>`
        )
        .join("")}
    </ul>
    ${crops && crops.length ? `<p class="advice-crop-hint"><span>${i18n.t("adviceCrops")}</span> <strong>${crops.join(", ")}</strong></p>` : ""}
    <p class="advice-note">${i18n.t("adviceNote")}</p>`;
}

function animateNumber(el, target) {
  const dur = 700;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * t);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function renderCarePlan(plan) {
  const stageTasks = i18n.careTasks();
  const stageRows = plan.stages
    .map((s) => {
      const tasks = stageTasks[s.stage] || [];
      return `
      <div class="care-stage">
        <div class="care-stage-head">
          <span class="care-stage-name">${i18n.t("stage" + s.stage.charAt(0).toUpperCase() + s.stage.slice(1))}</span>
          <span class="care-stage-days">${i18n.t("careDays")}: ${s.day_from}-${s.day_to}</span>
        </div>
        <ul class="care-tasks">
          ${tasks.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </div>`;
    })
    .join("");
  return `
    <p class="care-tenant">${i18n.t("tenureLabel")}: ~${plan.tenure_days} ${i18n.t("tenureUnit")}</p>
    ${plan.soil_tip ? `<div class="care-soil-tip"><strong>${i18n.t("careSoilTip")}:</strong> ${plan.soil_tip}</div>` : ""}
    ${plan.crop_note ? `<div class="care-crop-note"><strong>${i18n.t("careCropNote")}:</strong> ${plan.crop_note}</div>` : ""}
    <div class="care-timeline">${stageRows}</div>`;
}

function render(payload) {
  const [top] = payload.top3;
  const others = payload.top3.slice(1);
  const combo = payload.combination || [];
  const alts = payload.alt || [];
  const ct = payload.combo_total || { bags: 0, cost: 0 };
  const noFert = payload.recommendation === "No Fertilizer Needed" || combo.length === 0;

  const comboHtml = combo
    .map(
      (c) => `
      <div class="combo-card">
        <div class="combo-info">
          <div class="combo-name">${c.name}</div>
          <div class="combo-meta">${c.bags} ${i18n.t("bagShort")} · ${i18n.t("currency")}${c.per_bag}/${i18n.t("bagShort")}</div>
        </div>
        <div class="combo-cost">${i18n.t("currency")}${c.cost}</div>
      </div>`
    )
    .join("");

  const altsHtml = alts.length
    ? `<div class="alt-section">
        <h3 class="alt-title">${i18n.t("altTitle")}</h3>
        <div class="alt-row">
          ${alts
            .map(
              (a) => `
            <button class="alt-chip" data-alt="${a.name}">
              <span class="alt-name">${a.name}</span>
              <span class="alt-price">${i18n.t("currency")}${a.per_bag}/bag</span>
            </button>`
            )
            .join("")}
        </div>
      </div>`
    : "";

  const popups = [];
  if (payload.alerts?.length || payload.balance?.length) {
    popups.push(
      `<button class="popup-btn popup-alerts" data-popup="alerts">&#9888; ${i18n.t("healthTitle")} <span class="count">${(payload.alerts || []).length}</span></button>`
    );
  }
  if (payload.soil_tests?.length) {
    popups.push(
      `<button class="popup-btn popup-tests" data-popup="tests">&#129514; ${i18n.t("adviceTitle")}</button>`
    );
  }
  popups.push(
    `<button class="popup-btn popup-care" data-popup="care">${i18n.t("careTitle")}</button>`
  );

  let mainHtml;
  if (noFert) {
    mainHtml = `<div class="no-fert-note">${i18n.t("noFertilizer")}</div>`;
  } else {
    mainHtml = `
      <h3 class="combo-title">${i18n.t("combinationTitle")}</h3>
      <div class="combo-list">${comboHtml}</div>
      <div class="combo-total">
        <span>${i18n.t("totalBags")}: <strong class="js-bags">0</strong></span>
        <span>${i18n.t("totalCost")}: <strong class="js-cost">${i18n.t("currency")}0</strong></span>
      </div>
      <p class="bag-detail">${ct.bags} ${i18n.t("totalBags")} · ${payload.bags.acres} ${i18n.t("acresLabel")}</p>`;
  }

  result.innerHTML = `
    <div class="result-box">
      <p class="rec-caption">${i18n.t("recommended")}</p>
      <div class="fert-name">${payload.recommendation}</div>
      ${payload.tenure_days ? `<p class="tenure-line">${i18n.t("tenureLabel")}: ~${payload.tenure_days} ${i18n.t("tenureUnit")}</p>` : ""}
      ${mainHtml}
      ${altsHtml}
      ${popups.length ? `<div class="popup-row">${popups.join("")}</div>` : ""}
      <div class="conf-label">${i18n.t("confidence")} <strong>${top.confidence}%</strong></div>
      <div class="conf-bar"><div class="conf-fill" style="width:${top.confidence}%"></div></div>
      <div class="top3">
        <h3>${i18n.t("otherOptions")}</h3>
        ${others
          .map(
            (o) =>
              `<div class="top3-row"><span>${o.fertilizer}</span><span class="pct">${o.confidence}%</span></div>`
          )
          .join("")}
      </div>
    </div>`;

  animateNumber(result.querySelector(".js-bags"), ct.bags);
  animateNumber(result.querySelector(".js-cost"), ct.cost);
  result.querySelector(".result-box").classList.add("fade-in");

  const alertsBtn = result.querySelector('[data-popup="alerts"]');
  const testsBtn = result.querySelector('[data-popup="tests"]');
  if (alertsBtn) {
    alertsBtn.addEventListener("click", () =>
      openModal(i18n.t("healthTitle"), alertsHtml(payload.alerts, payload.balance))
    );
  }
  if (testsBtn) {
    testsBtn.addEventListener("click", () =>
      openModal(i18n.t("adviceTitle"), soilTestsHtml(payload.soil_tests, payload.crops))
    );
  }
  const careBtn = result.querySelector('[data-popup="care"]');
  if (careBtn) {
    careBtn.addEventListener("click", () => {
      openModal(i18n.t("careTitle"), `<div class="loader">${i18n.t("loading")}</div>`);
      fetch("/api/care-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: lastCrop,
          soil_color: inputs.soil_color.value,
          soil_type: inputs.soil_type.value,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.error) {
            modalBody.innerHTML = `<div class="error-box">${data.error}</div>`;
            return;
          }
          modalBody.innerHTML = renderCarePlan(data);
        })
        .catch(() => (modalBody.innerHTML = `<div class="error-box">${i18n.t("serverError")}</div>`));
    });
  }
  result.querySelectorAll("[data-alt]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const a = alts.find((x) => x.name === chip.dataset.alt);
      if (!a) return;
      openModal(
        a.name,
        `<div class="alt-detail">
          <p><strong>${i18n.t("gradeLabel")}:</strong> ${a.grade}</p>
          <p><strong>${i18n.t("pricePerBag")}:</strong> ${i18n.t("currency")}${a.per_bag} / ${i18n.t("bagShort")}</p>
        </div>`
      );
    });
  });
}

function showError(msg) {
  result.innerHTML = `<div class="error-box">${msg}</div>`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btn.disabled = true;
  result.innerHTML = `<div class="loader">${i18n.t("loading")}</div>`;

  const payload = {
    temperature: inputs.temperature.value,
    soil_type: inputs.soil_type.value,
    soil_color: inputs.soil_color.value,
    crop_type: inputs.crop_type.value,
    land_area: inputs.land_area.value,
    crop_stage: inputs.crop_stage.value,
  };
  lastCrop = inputs.crop_type.value;

  fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.error) {
        showError(data.error);
      } else {
        render(data);
      }
    })
    .catch(() => showError(i18n.t("serverError")))
    .finally(() => (btn.disabled = false));
});

fillOptions();
setDefaults();
result.innerHTML = i18n.t("placeholder");
