let coupons = [];

fetch("./db/coupons.json")
  .then(res => res.json())
  .then(data => {
    coupons = data;
    buildBrands();
  })
  .catch(err => {
    console.error("Failed to load coupons:", err);
  });

function buildBrands() {
  const brands = [...new Set(coupons.map(c => c.brand))].sort();
  const container = document.getElementById("brands");

  brands.forEach(brand => {
    const card = document.createElement("div");
    card.className = "brand-card";
    card.innerHTML = `<h2>${brand}</h2>`;
    card.onclick = () => showCodes(brand);
    container.appendChild(card);
  });
}

function showCodes(brand) {
  document.getElementById("brands").classList.add("hidden");
  document.getElementById("codes").classList.remove("hidden");

  document.getElementById("brand-title").textContent = brand;
  const list = document.getElementById("code-list");
  list.innerHTML = "";

  coupons
    .filter(c => c.brand === brand)
    .forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${c.code}</strong><br>${c.discount}`;
      list.appendChild(li);
    });
}

document.getElementById("back").onclick = () => {
  document.getElementById("codes").classList.add("hidden");
  document.getElementById("brands").classList.remove("hidden");
};
