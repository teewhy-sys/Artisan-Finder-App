const artisans = [
  {name:"Adekunle Adebayo", service:"Plumber", location:"Ile-Ife", rating:4.9, jobs:38, emoji:"🔧", bio:"Residential plumbing, leak repairs, installations and maintenance.", phone:"08000000001"},
  {name:"Chidinma Okafor", service:"Electrician", location:"Akure", rating:4.8, jobs:31, emoji:"⚡", bio:"Electrical installations, troubleshooting, wiring and maintenance.", phone:"08000000002"},
  {name:"Mariam Yusuf", service:"Tailor", location:"Ibadan", rating:4.9, jobs:44, emoji:"🧵", bio:"Custom dresses, alterations, native outfits and fashion styling.", phone:"08000000003"},
  {name:"Blessing Eze", service:"Hair Stylist", location:"Lagos", rating:4.7, jobs:52, emoji:"💇🏾‍♀️", bio:"Braids, natural hair styling, wig installation and hair care.", phone:"08000000004"},
  {name:"Samuel James", service:"Mechanic", location:"Abuja", rating:4.8, jobs:27, emoji:"🚗", bio:"Vehicle diagnostics, servicing, brake repairs and maintenance.", phone:"08000000005"},
  {name:"Oluwatobi Martins", service:"Painter", location:"Ile-Ife", rating:4.6, jobs:22, emoji:"🎨", bio:"Interior and exterior painting for homes, offices and shops.", phone:"08000000006"}
];

const grid = document.getElementById("artisanGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const emptyState = document.getElementById("emptyState");

function renderArtisans() {
  const query = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const results = artisans.filter(a =>
    (category === "All" || a.service === category) &&
    (a.name.toLowerCase().includes(query) ||
     a.service.toLowerCase().includes(query) ||
     a.location.toLowerCase().includes(query))
  );

  grid.innerHTML = results.map((a, i) => `
    <article class="artisan-card">
      <div class="card-top">
        <div>
          <div class="avatar">${a.emoji}</div>
          <h3>${a.name}</h3>
          <p class="role">${a.service}</p>
        </div>
        <span class="verified">✓ Verified</span>
      </div>
      <p class="meta">${a.location} · <span class="rating">★ ${a.rating}</span> · ${a.jobs} jobs</p>
      <button class="view-btn" onclick="viewArtisan(${artisans.indexOf(a)})">View profile</button>
    </article>
  `).join("");

  emptyState.classList.toggle("hidden", results.length !== 0);
}

function viewArtisan(index) {
  const a = artisans[index];
  document.getElementById("modalBody").innerHTML = `
    <div class="avatar">${a.emoji}</div>
    <p class="role">${a.service}</p>
    <h2>${a.name}</h2>
    <p class="meta">${a.location} · ★ ${a.rating} · ${a.jobs} completed jobs</p>
    <p>${a.bio}</p>
    <a class="primary-btn contact-btn" href="tel:${a.phone}">Contact artisan</a>
  `;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function scrollToArtisans() {
  document.getElementById("artisans").scrollIntoView({behavior:"smooth"});
}

function quickSearch(service) {
  searchInput.value = service;
  categoryFilter.value = service;
  scrollToArtisans();
  renderArtisans();
}

function searchFromHero() {
  searchInput.value = document.getElementById("heroSearch").value;
  categoryFilter.value = "All";
  scrollToArtisans();
  renderArtisans();
}

searchInput.addEventListener("input", renderArtisans);
categoryFilter.addEventListener("change", renderArtisans);
document.getElementById("modal").addEventListener("click", e => {
  if (e.target.id === "modal") closeModal();
});

renderArtisans();
