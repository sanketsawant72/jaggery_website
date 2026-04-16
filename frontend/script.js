/* ═══════════════════════════════════════════════════════════════
   NALINI JAGGERY — script.js
═══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────
   0. BACKEND API — saveLead()
───────────────────────────────────────── */
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://jaggery-website.onrender.com/api';


async function saveLead(collection, data) {
  try {
    // quote_enquiry → /api/quotes, everything else → /api/leads
    const endpoint = data.type === 'quote_enquiry' ? 'quotes' : 'leads';
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('saveLead error:', err);
    return { success: false };
  }
}


/* ─────────────────────────────────────────
   1. PRODUCTS DATA
───────────────────────────────────────── */
const products = [
  { name:"Organic Jaggery 10 Kg",              cat:"organic",       price:"₹44/kg",   form:"Solid",  packing:"10 kg",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348309402/GR/DB/VM/196886344/fresh-organic-jaggery-500x500.jpeg",          badge:"Best Seller"   },
  { name:"Solid Jaggery 30 Kg",                cat:"organic",       price:"₹40/kg",   form:"Cubes",  packing:"30 kg",     type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348309614/XW/XR/VR/196886344/fresh-modak-500x500.jpeg",                    badge:"Bulk"          },
  { name:"Organic Jaggery 2 kg",               cat:"organic",       price:"₹35/kg",   form:"Solid",  packing:"2 kg",      type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348824931/GR/EX/FJ/196886344/solid-jaggery-2-kg-500x500.jpeg",             badge:""              },
  { name:"Solid Jaggery 5 kg",                 cat:"organic",       price:"₹44/kg",   form:"Solid",  packing:"5 kg",      type:"Refined",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348825028/NC/GN/HF/196886344/solid-jaggery-5-kg-500x500.jpeg",             badge:""              },
  { name:"Solid Jaggery 10 Kg",                cat:"organic",       price:"₹40/kg",   form:"Solid",  packing:"10 kg",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348824526/VS/EH/DV/196886344/solid-jaggery-10-kg-500x500.jpeg",            badge:""              },
  { name:"16 Gm Jaggery Cubes 1 Kg",           cat:"organic",       price:"₹55/kg",   form:"Cubes",  packing:"1 kg",      type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348817396/AJ/MV/QO/196886344/16-gm-jaggery-cubes-1-kg-500x500.jpeg",       badge:""              },
  { name:"Natural Organic Jaggery Powder",     cat:"powder",        price:"₹90/kg",   form:"Powder", packing:"500 g Jar", type:"Sugarcane",             img:"https://5.imimg.com/data5/ANDROID/Default/2023/10/349854615/ZW/SU/GU/196886344/whatsapp-image-2023-09-30-at-10-16-31-pm-1-500x500.jpeg", badge:"Premium" },
  { name:"Pure Sugarcane Jaggery Powder",      cat:"powder",        price:"₹55/kg",   form:"Powder", packing:"500 g",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348781735/SE/TJ/JE/196886344/jaggery-powder-500-gm-500x500.jpeg",          badge:""              },
  { name:"Nalini Jaggery Powder",              cat:"powder",        price:"₹55/pack", form:"Powder", packing:"50 kg Bag", type:"No Artificial Flavour", img:"https://5.imimg.com/data5/SELLER/Default/2023/10/352015607/IO/LH/MX/196886344/jaggery-powder-500x500.jpeg",               badge:""              },
  { name:"Jaggery Powder 2 Kg",                cat:"powder",        price:"₹55/pack", form:"Powder", packing:"2 kg",      type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/352016361/KA/YD/NT/196886344/pure-sugarcane-jaggery-powder-500x500.jpeg",  badge:"Bulk"          },
  { name:"Natural Brown Fresh Jaggery Cube",   cat:"sugarcane",     price:"₹55/kg",   form:"Cubes",  packing:"500 g",     type:"FSSAI Certified",       img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350529197/OQ/EZ/XE/196886344/export-quality-sugarcane-jaggery-cube-500x500.jpeg", badge:"FSSAI" },
  { name:"Export Quality Sugarcane Jaggery",   cat:"sugarcane",     price:"₹45/kg",   form:"Cubes",  packing:"1 kg",      type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350487961/CX/NZ/JC/196886344/export-quality-sugarcane-jaggery-500x500.jpeg", badge:"Export" },
  { name:"Sugarcane Jaggery Cubes",            cat:"sugarcane",     price:"₹80/kg",   form:"Cubes",  packing:"500 g Jar", type:"Sugarcane",             img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349195913/PT/IN/TT/196886344/whatsapp-image-2023-09-30-at-10-16-40-pm-500x500.jpeg", badge:"" },
  { name:"Kolhapuri Sugarcane White Jaggery",  cat:"sugarcane",     price:"₹40/kg",   form:"Cubes",  packing:"500 g",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349834005/OA/ZO/UP/196886344/kolhapuri-sugarcane-white-jaggery-10-30kg-500x500.jpeg", badge:"Special" },
  { name:"8 Gm Jaggery Cube",                  cat:"sugarcane",     price:"₹55/kg",   form:"Cubes",  packing:"1 kg Jar",  type:"Sugarcane",             img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348817022/IT/JY/MO/196886344/16-gm-jaggery-cubes-500-g-500x500.jpeg",       badge:""              },
  { name:"Ball Natural Pure Organic Jaggery",  cat:"chemical-free", price:"₹40/kg",   form:"Ball",   packing:"250 g",     type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193117/SB/RP/TF/196886344/20191227-220317-500x500.jpg",                  badge:"Chemical Free" },
  { name:"Natural Karad Jaggery",              cat:"chemical-free", price:"₹44/kg",   form:"Solid",  packing:"1 kg",      type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193121/FN/OI/JY/196886344/20201123-153437-500x500.jpg",                  badge:""              },
  { name:"Pure Sugarcane Jaggery",             cat:"chemical-free", price:"₹45/kg",   form:"Ball",   packing:"1 kg",      type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193136/HH/CV/OM/196886344/20201123-153500-500x500.jpg",                  badge:""              },
  { name:"Dark Brown Jaggery Cube",            cat:"chemical-free", price:"₹50/kg",   form:"Solid",  packing:"1 kg",      type:"FSSAI Certified",       img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193972/CM/LK/CM/196886344/20201126-190307-500x500.jpeg",                 badge:"FSSAI"         },
  { name:"Organic Sugarcane Jaggery Cubes",    cat:"natural",       price:"₹50/kg",   form:"Cubes",  packing:"500 g",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350549098/UT/JC/TQ/196886344/natural-solid-jaggery-10-kg-500x500.jpeg",    badge:""              },
  { name:"Karad Natural Chemical Free Jaggery",cat:"natural",       price:"₹50/kg",   form:"Solid",  packing:"5–30 kg",   type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348310013/NS/MK/LC/196886344/fresh-jaggery-cube-500x500.jpeg",              badge:""              }
];


/* ─────────────────────────────────────────
   2. RENDER PRODUCTS
───────────────────────────────────────── */
function renderProducts(filter, customList) {
  const grid = document.getElementById('productsContainer');
  if (!grid) return;

  const filtered = customList
    ? customList
    : (filter === 'all' ? products : products.filter(function(p) { return p.cat === filter; }));

  grid.innerHTML = filtered.map(function(p) {
    var detailUrl = 'product-detail.html?product=' + encodeURIComponent(p.name);
    return '<div class="product-card" onclick="window.location.href=\'' + detailUrl + '\'">' +
      '<div class="product-img">' +
        '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />' +
        (p.badge ? '<div class="product-badge">' + p.badge + '</div>' : '') +
      '</div>' +
      '<div class="product-body">' +
        '<div class="product-name">' + p.name + '</div>' +
        '<div class="product-meta">' +
          '<div class="product-meta-row"><span>Form</span><span>'      + p.form    + '</span></div>' +
          '<div class="product-meta-row"><span>Pack Size</span><span>' + p.packing + '</span></div>' +
          '<div class="product-meta-row"><span>Type</span><span>'      + p.type    + '</span></div>' +
        '</div>' +
        '<div class="product-footer">' +
          '<div class="product-price">' + p.price.replace(/(\/\w+)$/, '<span>$1</span>') + '</div>' +
          '<a class="btn-quote" href="' + detailUrl + '" onclick="event.stopPropagation()">View Details</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function escapeAttr(str) {
  return str.replace(/&/g,'&amp;').replace(/'/g,'&#39;').replace(/"/g,'&quot;');
}

/* ─────────────────────────────────────────
   3. CATEGORY TAB FILTER
───────────────────────────────────────── */
function filterCat(cat, el) {
  document.querySelectorAll('.cat-tab').forEach(function(t) { t.classList.remove('active'); });
  if (el) el.classList.add('active');
  renderProducts(cat);
}

function initCategoryTabs() {
  var tabContainer = document.getElementById('catTabs');
  if (!tabContainer) return;
  tabContainer.addEventListener('click', function(e) {
    var tab = e.target.closest('.cat-tab');
    if (!tab) return;
    document.querySelectorAll('.cat-tab').forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');
    renderProducts(tab.dataset.cat);
  });
}


/* ─────────────────────────────────────────
   4. ORDER / QUOTE MODAL
───────────────────────────────────────── */
function openOrderModal(productName) {
  var modal     = document.getElementById('orderModal');
  var nameLabel = document.getElementById('modalProductName');
  var priceEl   = document.getElementById('modalProductPrice');
  var formEl    = document.getElementById('modalProductForm');
  var packEl    = document.getElementById('modalProductPack');
  var typeEl    = document.getElementById('modalProductType');
  if (!modal || !nameLabel) return;

  nameLabel.textContent = productName;
  var product = products.find(function(p) { return p.name === productName; });
  if (product) {
    if (priceEl) priceEl.textContent = product.price;
    if (formEl)  formEl.textContent  = product.form;
    if (packEl)  packEl.textContent  = product.packing;
    if (typeEl)  typeEl.textContent  = product.type;
  }
  modal.style.display          = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  var modal = document.getElementById('orderModal');
  var form  = document.getElementById('orderForm');
  if (!modal) return;
  modal.style.display          = 'none';
  document.body.style.overflow = '';
  if (form) form.reset();
}

async function submitOrder(e) {
  e.preventDefault();
  var form = e.target;
  var btn  = form.querySelector('button[type="submit"]');
  if (!btn) return;

  var data = {
    type:    'product_enquiry',
    product: document.getElementById('modalProductName') ? document.getElementById('modalProductName').textContent : '',
    name:    form.name.value,
    phone:   form.phone.value,
    city:    form.city  ? form.city.value  : '',
    qty:     form.qty   ? form.qty.value   : ''
  };

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  var result = await saveLead('leads', data);

  if (result.success) {
    btn.textContent      = '✓ Enquiry Sent!';
    btn.style.background = '#4caf50';
    btn.style.color      = '#fff';
    setTimeout(function() {
      closeOrderModal();
      btn.textContent      = 'Confirm Enquiry →';
      btn.style.background = '';
      btn.style.color      = '';
      btn.disabled         = false;
    }, 2000);
  } else {
    btn.textContent      = 'Error — Try Again';
    btn.style.background = '#e53935';
    btn.style.color      = '#fff';
    btn.disabled         = false;
  }
}

function initModalBackdropClose() {
  var modal = document.getElementById('orderModal');
  if (!modal) return;
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeOrderModal();
  });
}


/* ─────────────────────────────────────────
   5. CONTACT FORM SUBMIT
───────────────────────────────────────── */
async function handleSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var btn  = form.querySelector('.form-submit');
  if (!btn) return;

  var data = {
    type:    'contact_enquiry',
    title:   form.title   ? form.title.value   : '',
    name:    form.name    ? form.name.value    : '',
    phone:   form.phone   ? form.phone.value   : '',
    email:   form.email   ? form.email.value   : '',
    city:    form.city    ? form.city.value    : '',
    product: form.product ? form.product.value : '',
    qty:     form.qty     ? form.qty.value     : '',
    message: form.message ? form.message.value : ''
  };

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  var result = await saveLead('leads', data);

  if (result.success) {
    btn.textContent      = '✓ Enquiry Sent! We will contact you within 24 hours.';
    btn.style.background = '#4caf50';
    btn.style.color      = '#fff';
    setTimeout(function() {
      btn.textContent      = 'Send Enquiry →';
      btn.style.background = '';
      btn.style.color      = '';
      btn.disabled         = false;
      form.reset();
    }, 4000);
  } else {
    btn.textContent      = 'Error — Please try again';
    btn.style.background = '#e53935';
    btn.style.color      = '#fff';
    btn.disabled         = false;
  }
}


/* ─────────────────────────────────────────
   NAV SEARCH
───────────────────────────────────────── */
function showSearchSuggestions(query) {
  var list = document.getElementById('searchSuggestions');
  if (!list) return;
  var q = query.trim().toLowerCase();
  var matches = q
    ? products.filter(function(p) { return p.name.toLowerCase().includes(q); })
    : products.slice(0, 8);

  if (!matches.length) { list.innerHTML = ''; list.classList.remove('open'); return; }

  list.innerHTML = matches.map(function(p) {
    return '<li onclick="selectSuggestion(\'' + escapeAttr(p.name) + '\')">' + p.name + '</li>';
  }).join('');
  list.classList.add('open');
}

function selectSuggestion(name) {
  var input = document.getElementById('navSearchInput');
  var list  = document.getElementById('searchSuggestions');
  if (input) input.value = name;
  if (list)  { list.innerHTML = ''; list.classList.remove('open'); }
  handleNavSearch();
}

function handleNavSearch() {
  var input = document.getElementById('navSearchInput');
  var list  = document.getElementById('searchSuggestions');
  if (!input) return;

  var q = input.value.trim();
  if (list) { list.innerHTML = ''; list.classList.remove('open'); }

  var grid = document.getElementById('productsContainer');
  if (!grid) {
    window.location.href = 'products.html?search=' + encodeURIComponent(q);
    return;
  }

  var section = document.getElementById('products');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
  if (!q) { renderProducts('all'); return; }

  var results = products.filter(function(p) { return p.name.toLowerCase().includes(q.toLowerCase()); });
  if (!results.length) {
    grid.innerHTML = '<p style="color:var(--muted);padding:2rem;text-align:center;">No products found for "' + q + '"</p>';
    return;
  }
  renderProducts('all', results);
}

document.addEventListener('click', function(e) {
  var wrap = document.querySelector('.nav-search-wrap');
  var list = document.getElementById('searchSuggestions');
  if (list && wrap && !wrap.contains(e.target)) { list.innerHTML = ''; list.classList.remove('open'); }
});


/* ─────────────────────────────────────────
   6. MOBILE NAVIGATION
───────────────────────────────────────── */
function toggleMenu() {
  var navMenu = document.getElementById('navMenu');
  if (navMenu) navMenu.classList.toggle('open');
}

function initNavLinkClose() {
  var navMenu = document.getElementById('navMenu');
  if (!navMenu) return;
  navMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() { navMenu.classList.remove('open'); });
  });
}


/* ─────────────────────────────────────────
   7. SCROLL REVEAL
───────────────────────────────────────── */
function initScrollReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
}


/* ─────────────────────────────────────────
   8. INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  renderProducts('all');
  initCategoryTabs();
  initModalBackdropClose();
  initNavLinkClose();
  initScrollReveal();

  // handle ?search= from other pages
  var params = new URLSearchParams(window.location.search);
  var q = params.get('search');
  if (q) {
    var input = document.getElementById('navSearchInput');
    if (input) input.value = q;
    var results = products.filter(function(p) { return p.name.toLowerCase().includes(q.toLowerCase()); });
    renderProducts('all', results);
  }
});


/* ─────────────────────────────────────────
   9. CHATBOT WIDGET
───────────────────────────────────────── */
(function() {
  var chatMessages = [];
  var isOpen = false;

  var botReplies = {
    products: '🌿 We offer:\n• Organic Jaggery (solid blocks)\n• Jaggery Powder\n• Sugarcane Jaggery\n• Chemical-Free Jaggery\n• Ball Jaggery\n• Jaggery Cubes\n\nAvailable in 250g to 30kg packs. <a href="products.html">Browse all products →</a>',
    pricing:  '💰 Our price range is ₹35–₹90/kg depending on product and quantity.\n\nFor bulk orders (50kg+) we offer special rates. <a href="quote.html">Get a free quote →</a>',
    order:    '📦 To place an order:\n1. <a href="quote.html">Fill the quote form</a>\n2. Or WhatsApp us: <a href="https://wa.me/919112658473" target="_blank">+91 91126 58473</a>\n3. Or call: <a href="tel:+919112658473">09112658473</a>\n\nWe respond within 24 hours.',
    export:   '✈️ Yes, we export! We are APEDA registered and supply to UAE, UK, USA and more.\n\nExport-grade packaging available. <a href="contact.html">Contact us for export enquiries →</a>'
  };

  function getWidget() { return document.getElementById('chatWidget'); }
  function getBody()   { return document.getElementById('chatBody'); }

  function toggleChat() {
    isOpen = !isOpen;
    var w = getWidget();
    if (!w) return;
    w.style.display = isOpen ? 'flex' : 'none';
    if (isOpen && chatMessages.length === 0) {
      appendBotMessage('👋 Hi! I\'m here to help. Ask about our products, pricing, orders or export. Or use the quick buttons below.');
    }
  }

  function appendBotMessage(html) {
    chatMessages.push({ from: 'bot', html: html });
    renderMessages();
  }

  function appendUserMessage(text) {
    chatMessages.push({ from: 'user', text: text });
    renderMessages();
  }

  function renderMessages() {
    var body = getBody();
    if (!body) return;
    body.innerHTML = chatMessages.map(function(m) {
      if (m.from === 'bot') {
        return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:12px;">' +
          '<div style="width:28px;height:28px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;">NJ</div>' +
          '<div style="background:#f5f0e8;border-radius:0 12px 12px 12px;padding:10px 14px;font-size:13.5px;line-height:1.6;color:var(--text);max-width:85%;white-space:pre-line;">' + m.html + '</div>' +
          '</div>';
      } else {
        return '<div style="display:flex;justify-content:flex-end;margin-bottom:12px;">' +
          '<div style="background:var(--brown);color:#fff;border-radius:12px 0 12px 12px;padding:10px 14px;font-size:13.5px;line-height:1.6;max-width:85%;">' + m.text + '</div>' +
          '</div>';
      }
    }).join('');
    body.scrollTop = body.scrollHeight;
  }

  function sendQuickReply(type) {
    var labels = { products: 'Products', pricing: 'Pricing', order: 'How to Order', export: 'Export' };
    appendUserMessage(labels[type] || type);
    setTimeout(function() { appendBotMessage(botReplies[type] || 'Please contact us for more info.'); }, 400);
  }

  function sendChatMessage() {
    var input = document.getElementById('chatInput');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    appendUserMessage(text);

    var lower = text.toLowerCase();
    var reply;
    if (lower.match(/product|jaggery|powder|cube|ball|organic/)) {
      reply = botReplies.products;
    } else if (lower.match(/price|cost|rate|₹|kg|cheap|bulk/)) {
      reply = botReplies.pricing;
    } else if (lower.match(/order|buy|purchase|how|place/)) {
      reply = botReplies.order;
    } else if (lower.match(/export|international|uae|uk|usa|abroad/)) {
      reply = botReplies.export;
    } else if (lower.match(/contact|phone|call|email|whatsapp/)) {
      reply = '📞 Call: <a href="tel:+919112658473">09112658473</a>\n✉️ Email: <a href="mailto:info@nalinijaggery.com">info@nalinijaggery.com</a>\n💬 WhatsApp: <a href="https://wa.me/919112658473" target="_blank">+91 91126 58473</a>';
    } else {
      reply = 'Thanks for your message! For a quick response, please <a href="contact.html">fill our contact form</a> or <a href="https://wa.me/919112658473" target="_blank">WhatsApp us</a>.';
    }

    setTimeout(function() { appendBotMessage(reply); }, 500);
  }

  // Expose to global scope for inline onclick handlers
  window.toggleChat      = toggleChat;
  window.sendQuickReply  = sendQuickReply;
  window.sendChatMessage = sendChatMessage;

  // Allow Enter key in chat input
  document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('chatInput');
    if (input) {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendChatMessage();
      });
    }
  });
})();
