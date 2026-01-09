let db = {};

// Fetch the database
fetch("./db/coupons.json")
  .then(res => res.json())
  .then(data => {
    db = data; // db is an object keyed by domain
    buildBrands();
  })
  .catch(err => {
    console.error("Failed to load coupons:", err);
  });

// Build brand cards
function buildBrands() {
  const container = document.getElementById("brands");
  container.innerHTML = "";

  const domains = Object.keys(db).sort();

  domains.forEach(domain => {
    const brandName = domain.split(".")[0].toUpperCase();
    const card = document.createElement("div");
    card.className = "brand-card";
    card.innerHTML = `<h2>${brandName}</h2>`;
    card.onclick = () => showCodes(domain);
    container.appendChild(card);
  });
}

// Show codes for a specific domain
function showCodes(domain) {
  document.getElementById("brands").classList.add("hidden");
  document.getElementById("codes").classList.remove("hidden");

  document.getElementById("brand-title").textContent = domain.split(".")[0].toUpperCase();

  const list = document.getElementById("code-list");
  list.innerHTML = "";

  // db[domain].coupons is the array
  const coupons = db[domain].coupons;

  coupons.sort((a, b) => b.successes - a.successes);

  coupons.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${c.code}</strong> ${c.code === db[domain].bestCode ? "⭐" : ""}
      <br>${c.description}
      <br>Successes: ${c.successes} | Failures: ${c.failures} | Status: ${c.status}
      <br>Verified: ${c.verified}
    `;
    list.appendChild(li);
  });
}

// Back button
document.getElementById("back").onclick = () => {
  document.getElementById("codes").classList.add("hidden");
  document.getElementById("brands").classList.remove("hidden");
};
