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
  const brandsContainer = document.getElementById("brands");
  brandsContainer.innerHTML = "";

  // db keys are domains like "nike.com"
  const domains = Object.keys(db).sort();

  domains.forEach(domain => {
    const brandName = domain.split(".")[0].toUpperCase(); // e.g., "nike.com" -> "NIKE"
    const card = document.createElement("div");
    card.className = "brand-card";
    card.innerHTML = `<h2>${brandName}</h2>`;
    card.onclick = () => showCodes(domain);
    brandsContainer.appendChild(card);
  });
}

// Show codes for a specific domain
function showCodes(domain) {
  document.getElementById("brands").classList.add("hidden");
  document.getElementById("codes").classList.remove("hidden");

  const brandName = domain.split(".")[0].toUpperCase();
  document.getElementById("brand-title").textContent = brandName;

  const list = document.getElementById("code-list");
  list.innerHTML = "";

  // Get the array of coupons for this domain
  const coupons = db[domain].coupons;

  // Sort by successes descending
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
