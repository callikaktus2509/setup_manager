const rigList = document.getElementById("rig-list");
const addRigBtn = document.getElementById("add-rig-btn");
const rigTemplate = document.getElementById("rig-template");
const componentTemplate = document.getElementById("component-template");

function formatEuro(v) {
  const n = Number.isFinite(v) ? v : 0;
  return n.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  });
}

function addRig() {
  const clone = rigTemplate.content.cloneNode(true);
  const compContainer = clone.querySelector(".components");
  const addCompBtn = clone.querySelector(".add-component-btn");
  const totalEl = clone.querySelector(".rig-total-value");
  clone.querySelector(".rig-index").textContent = rigList.querySelectorAll(".rig-card").length + 1;

  addCompBtn.addEventListener("click", () => addComponent(compContainer, totalEl));
  rigList.appendChild(clone);
}

function addComponent(compContainer, totalEl) {
  const clone = componentTemplate.content.cloneNode(true);
  const compEl = clone.querySelector(".component");
  const priceInput = clone.querySelector(".component-price");
  const removeBtn = clone.querySelector(".remove-component");

  priceInput.addEventListener("input", () => updateRigTotal(compContainer, totalEl));
  removeBtn.addEventListener("click", () => { compEl.remove(); updateRigTotal(compContainer, totalEl); });

  compContainer.appendChild(clone);
}

function updateRigTotal(compContainer, totalEl) {
  let sum = 0;
  compContainer.querySelectorAll(".component-price").forEach(i => {
    const v = parseFloat(i.value.replace(",", "."));
    if (!isNaN(v)) sum += v;
  });
  totalEl.textContent = formatEuro(sum);
}

addRig();
addRigBtn.addEventListener("click", addRig);
