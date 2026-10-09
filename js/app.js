/**
 * DESI MITHAAS - BRIGHT LUXURY INTERACTIVE ENGINE
 * Theme: Warm Royal Cream + Deep Chocolate Typography + Burnt Orange Accents
 */

let cart = [];
let isHindi = true;
let maharajIndex = 0;

const maharajQuotes = [
  "🙏 'Pranaam! Hamara Black Diamond Mukhwas chandi vark aur cooling cardamom se bana hai. Aaj hi mangwayein!'",
  "✨ 'Khushkhabri! 2 dabba lene par 1 dabba bilkul FREE hai. Pura Bharat me har gaon tak delivery!'",
  "🌿 'Hamara Roasted Mukhwas brass ke bartan me toaste hota hai — pet ke hazme ke liye amrit hai!'",
  "🔥 'Code BUY2GET1 lagana mat bhooliyega — 2 dabba par 1 dabba bilkul muft hai!'"
];

// Maharaj Mascot Interaction
function tapMaharaj() {
  maharajIndex = (maharajIndex + 1) % maharajQuotes.length;
  const bubble = document.getElementById('maharajText');
  if (bubble) {
    bubble.innerHTML = maharajQuotes[maharajIndex];
  }
  
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#D95B16', '#EA6825', '#3A1A0E', '#FAF6F0']
    });
  }
}

function triggerMaharajDialog() {
  tapMaharaj();
  const hero = document.getElementById('hero');
  if (hero) hero.scrollIntoView({ behavior: 'smooth' });
}

// 3D Hero Angle Switcher
function changeHeroAngle(idx, btn) {
  if (!storeCatalog || !storeCatalog[0]) return;
  const angles = storeCatalog[0].images;
  const img = document.getElementById('heroJarImg');
  if (!img) return;

  img.style.opacity = '0';
  img.style.transform = 'scale(0.92)';
  setTimeout(() => {
    img.src = angles[idx];
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  }, 150);

  document.querySelectorAll('.hero-angle-btn').forEach(b => {
    b.className = 'w-12 h-12 rounded-xl border border-[#3A1A0E]/20 p-1 bg-white shadow-sm overflow-hidden transition transform hover:scale-105 hero-angle-btn';
  });
  if (btn) {
    btn.className = 'w-12 h-12 rounded-xl border-2 border-[#D95B16] p-1 bg-white shadow-md overflow-hidden transition transform hover:scale-105 hero-angle-btn';
  }
}

// Render Products Grid in Bright Luxury Theme
function renderCatalogGrid(category = 'all') {
  const grid = document.getElementById('catalogGrid');
  if (!grid || !storeCatalog) return;
  grid.innerHTML = '';

  storeCatalog.forEach(item => {
    if (category !== 'all' && item.category !== category) return;

    const displayName = isHindi ? item.hindiName : item.name;

    const card = document.createElement('div');
    card.className = 'cream-card p-5 rounded-2xl flex flex-col justify-between relative group';
    card.innerHTML = `
      <!-- Top Tag Badge -->
      <div class="absolute top-3 left-3 z-10">
        <span class="px-2.5 py-1 rounded-md burnt-orange-bg text-white font-royal font-bold text-[10px] uppercase tracking-wider shadow">
          ${item.tag}
        </span>
      </div>

      <!-- Wishlist Heart -->
      <button onclick="toggleFav(this)" class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-[#3A1A0E]/15 text-[#3A1A0E]/60 hover:text-red-500 shadow-sm flex items-center justify-center transition">
        <i data-lucide="heart" class="w-4 h-4"></i>
      </button>

      <!-- Image Area with Quick View Zoom -->
      <div class="relative h-56 w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#FAF6F0] to-white flex items-center justify-center cursor-pointer p-3 border border-[#3A1A0E]/08" onclick="openProductQuickModal(${item.id})">
        <img src="${item.images[0]}" alt="${displayName}" class="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-[#251108]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="px-3.5 py-1.5 rounded-full bg-white border border-[#D95B16] text-xs font-royal text-[#D95B16] font-bold flex items-center space-x-1 shadow-lg">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            <span>Quick View (देखें)</span>
          </span>
        </div>
      </div>

      <!-- Aroma / Notes Tag -->
      <div class="mt-3 flex items-center space-x-1 text-[11px] text-[#D95B16] font-semibold">
        <span class="px-2 py-0.5 rounded-md bg-[#D95B16]/10 border border-[#D95B16]/25">${item.aroma}</span>
      </div>

      <!-- Title & Details -->
      <div class="mt-2 flex-grow">
        <h4 class="font-serif text-base font-bold text-[#251108] leading-snug hover:text-[#D95B16] transition cursor-pointer" onclick="openProductQuickModal(${item.id})">
          ${displayName}
        </h4>
        <p class="text-[11px] text-[#734531] line-clamp-2 mt-1 leading-relaxed">${item.desc}</p>
      </div>

      <!-- Pricing & Actions -->
      <div class="mt-4 pt-3 border-t border-[#3A1A0E]/10">
        <div class="flex items-baseline justify-between mb-3">
          <div class="flex items-baseline space-x-2">
            <span class="font-royal text-xl font-black text-[#251108]">₹${item.price}</span>
            <span class="text-xs text-[#734531]/60 line-through">₹${item.mrp}</span>
          </div>
          <span class="text-[10px] font-mono text-[#D95B16] border border-[#D95B16]/40 px-1.5 py-0.5 rounded bg-[#D95B16]/10 font-bold">
            Buy 2 Get 1 FREE
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button onclick="handleAddToCart(${item.id})" class="w-full py-2.5 rounded-xl burnt-orange-bg text-white font-royal font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow flex items-center justify-center space-x-1">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>+ Bag</span>
          </button>
          <a href="https://wa.me/919209309947?text=Namaste!%20Mujhe%20ye%20order%20karna%20hai%3A%20${encodeURIComponent(item.name)}" target="_blank" class="w-full py-2.5 rounded-xl border border-[#25D366] text-[#1b8e44] hover:bg-[#25D366] hover:text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1 bg-[#25D366]/10 shadow-sm">
            <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Category Tabs Filter
function filterCatalog(cat, btn) {
  document.querySelectorAll('#filterTabs button').forEach(b => {
    b.className = 'px-5 py-2.5 rounded-full border border-[#3A1A0E]/20 text-[#3A1A0E] hover:text-[#D95B16] hover:border-[#D95B16] font-royal font-semibold text-xs uppercase tracking-wider transition bg-white shadow-sm';
  });
  if (btn) {
    btn.className = 'px-5 py-2.5 rounded-full burnt-orange-bg text-white font-royal font-bold text-xs uppercase tracking-wider shadow cat-tab-active';
  }
  renderCatalogGrid(cat);
}

// Language Switcher
function toggleLang() {
  isHindi = !isHindi;
  const btnText = document.getElementById('langBtnText');
  if (btnText) {
    btnText.textContent = isHindi ? "हिंदी (Hindi)" : "English";
  }
  renderCatalogGrid();
}

// Quick View Modal
function openProductQuickModal(id) {
  const item = storeCatalog[id];
  if (!item) return;

  document.getElementById('modalImg').src = item.images[0];
  document.getElementById('modalTag').textContent = item.tag;
  document.getElementById('modalName').textContent = isHindi ? item.hindiName : item.name;
  document.getElementById('modalDescription').textContent = item.desc;
  document.getElementById('modalPriceVal').textContent = `₹${item.price}`;

  document.getElementById('modalAddCartBtn').onclick = () => {
    handleAddToCart(id);
    closeProductQuickModal();
  };
  document.getElementById('modalDirectWABtn').onclick = () => {
    window.open(`https://wa.me/919209309947?text=Namaste!%20Mujhe%20order%20karna%20hai%3A%20${encodeURIComponent(item.name)}%20(₹${item.price})`, '_blank');
  };

  const modal = document.getElementById('quickModal');
  modal.classList.remove('opacity-0', 'pointer-events-none');
}

function closeProductQuickModal() {
  const modal = document.getElementById('quickModal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
  }
}

// Cart Mechanics
function handleAddToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...storeCatalog[id], qty: 1 });
  }
  refreshCartUI();
  
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#D95B16', '#EA6825', '#3A1A0E']
    });
  }
}

function modifyCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  refreshCartUI();
}

function refreshCartUI() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const countEl = document.getElementById('headerCartCount');
  if (countEl) countEl.textContent = totalCount;

  let subtotal = 0;
  cart.forEach(i => subtotal += i.price * i.qty);

  // Buy 2 Get 1 FREE calculation
  let freeItems = Math.floor(totalCount / 3);
  let discount = freeItems * 299;

  let shipping = (subtotal >= 499 || totalCount === 0) ? 0 : 50;
  let finalTotal = Math.max(0, subtotal - discount + shipping);

  // Shipping progress
  const shipPercent = Math.min(100, Math.round((subtotal / 499) * 100));
  const percentEl = document.getElementById('shippingPercentNum');
  const barEl = document.getElementById('shippingFillBar');
  const noticeEl = document.getElementById('shippingNotice');

  if (percentEl) percentEl.textContent = `${shipPercent}%`;
  if (barEl) barEl.style.width = `${shipPercent}%`;
  if (noticeEl) {
    if (subtotal >= 499) {
      noticeEl.textContent = "🎉 Mubarak Ho! Speed Delivery bilkul FREE hai!";
    } else {
      noticeEl.textContent = `₹${499 - subtotal} aur jodein for Free Express Delivery`;
    }
  }

  // Top Bundle Meter
  const mod = totalCount % 3;
  const bundlePercent = mod === 0 && totalCount > 0 ? 100 : Math.round((mod / 3) * 100);
  const bundleMeterEl = document.getElementById('bundleMeter');
  const bundleTextEl = document.getElementById('bundleMeterText');

  if (bundleMeterEl) bundleMeterEl.style.width = `${bundlePercent}%`;
  if (bundleTextEl) {
    if (mod === 2) {
      bundleTextEl.textContent = "Add 1 more for FREE JAR!";
    } else if (mod === 1) {
      bundleTextEl.textContent = "Add 2 more for FREE JAR!";
    } else if (totalCount > 0 && mod === 0) {
      bundleTextEl.textContent = `🎉 ${freeItems} FREE Jar(s) Unlocked!`;
    }
  }

  // Drawer items
  const container = document.getElementById('cartDrawerItems');
  if (container) {
    if (cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 text-[#734531]/60">
          <i data-lucide="package-open" class="w-12 h-12 mx-auto text-[#D95B16]/50 mb-3"></i>
          <p class="font-medium">Aapka Shahi Bag khali hai.</p>
          <p class="text-xs text-[#D95B16] mt-1 font-bold">Kuch mukhwas add karein!</p>
        </div>
      `;
    } else {
      container.innerHTML = cart.map(item => `
        <div class="p-3.5 rounded-xl border border-[#3A1A0E]/12 bg-white shadow-sm flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img src="${item.images[0]}" class="w-12 h-12 object-contain rounded-lg border border-[#3A1A0E]/10 p-1 bg-[#FAF6F0]">
            <div>
              <h5 class="text-xs font-bold text-[#251108] max-w-[150px] truncate">${isHindi ? item.hindiName : item.name}</h5>
              <p class="text-xs font-bold text-[#D95B16]">₹${item.price}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="modifyCartQty(${item.id}, -1)" class="w-6 h-6 rounded border border-[#3A1A0E]/20 text-[#251108] text-xs flex items-center justify-center hover:bg-[#D95B16]/10">-</button>
            <span class="text-xs font-mono font-bold text-[#251108]">${item.qty}</span>
            <button onclick="modifyCartQty(${item.id}, 1)" class="w-6 h-6 rounded border border-[#3A1A0E]/20 text-[#251108] text-xs flex items-center justify-center hover:bg-[#D95B16]/10">+</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Update totals
  const subEl = document.getElementById('drawerSubtotal');
  const discEl = document.getElementById('drawerDiscount');
  const shipEl = document.getElementById('drawerShipping');
  const totEl = document.getElementById('drawerTotal');

  if (subEl) subEl.textContent = `₹${subtotal}`;
  if (discEl) discEl.textContent = `-₹${discount}`;
  if (shipEl) shipEl.textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
  if (totEl) totEl.textContent = `₹${finalTotal}`;

  if (window.lucide) {
    lucide.createIcons();
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.toggle('translate-x-full');
}

// 1-Click WhatsApp Order
function checkoutViaWhatsApp() {
  if (cart.length === 0) return alert("Kripya pehle bag me koi item add karein!");
  let lines = cart.map(i => `${i.qty}x ${i.name} (₹${i.price * i.qty})`).join('%0A');
  const total = document.getElementById('drawerTotal').textContent;
  const text = `Namaste Desi Mithaas Ji,%0A%0AMera Order Details:%0A${lines}%0A%0ATotal Bill: ${total}%0AOffer: BUY2GET1 (Buy 2 Get 1 Free)%0APayment: Cash on Delivery (COD)%0A%0APlease mera order confirm karein!`;
  window.open(`https://wa.me/919209309947?text=${text}`, '_blank');
}

function checkoutCOD() {
  if (cart.length === 0) return alert("Kripya pehle bag me koi item add karein!");
  checkoutViaWhatsApp();
}

function toggleFav(btn) {
  btn.classList.toggle('text-red-500');
}

function toggleMobileNav() {
  const catalog = document.getElementById('catalog');
  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
}

// Initial Run
window.addEventListener('DOMContentLoaded', () => {
  renderCatalogGrid();
  refreshCartUI();
  if (window.lucide) {
    lucide.createIcons();
  }
});
