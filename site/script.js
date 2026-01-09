const DB_URL =
  "https://raw.githubusercontent.com/666TranZit666/honey-but-better/main/coupons.json";

async function loadStores() {
  const data = await fetch(DB_URL).then(r => r.json());
  const ul = document.getElementById("stores");

  Object.keys(data).forEach(domain => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="site.html?site=${domain}">${domain}</a>`;
    ul.appendChild(li);
  });
}

async function loadStore() {
  const site = new URLSearchParams(location.search).get("site");
  document.getElementById("store").innerText = site;

  const data = await fetch(DB_URL).then(r => r.json());
  const coupons = data[site]?.coupons || [];

  const ul = document.getElementById("coupons");
  coupons.forEach(c => {
    ul.innerHTML += `<li>
      ${c.code} — ${c.type} — ${
        c.type === "percentage" ? c.value + "%" : "$" + c.value
      }
    </li>`;
  });
}
