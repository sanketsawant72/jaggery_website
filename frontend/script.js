/* ═══════════════════════════════════════════════════════════════
   NALINI JAGGERY — script.js
   Sections:
     1.  Products Data
     2.  Render Products
     3.  Category Tab Filter
     4.  Order / Quote Modal
     5.  Contact Form Submit
     6.  Mobile Navigation (Hamburger)
     7.  Scroll Reveal (IntersectionObserver)
     8.  Init (runs on DOMContentLoaded)
═══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────
   0. BACKEND API — saveLead()
   Sends form data to the Express backend.
   Called by submitOrder() and handleSubmit()
───────────────────────────────────────── */
const API_URL = 'https://jaggery-website.onrender.com/api';

async function saveLead(collection, data) {
  try {
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
  /* Organic Jaggery */
  { name:"Organic Jaggery 10 Kg",           cat:"organic",       price:"₹44/kg",   form:"Solid",  packing:"10 kg",       type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348309402/GR/DB/VM/196886344/fresh-organic-jaggery-500x500.jpeg",          badge:"Best Seller"   },
  { name:"Solid Jaggery 30 Kg",             cat:"organic",       price:"₹40/kg",   form:"Cubes",  packing:"30 kg",       type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348309614/XW/XR/VR/196886344/fresh-modak-500x500.jpeg",                    badge:"Bulk"          },
  { name:"Organic Jaggery 2 kg",            cat:"organic",       price:"₹35/kg",   form:"Solid",  packing:"2 kg",        type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348824931/GR/EX/FJ/196886344/solid-jaggery-2-kg-500x500.jpeg",             badge:""              },
  { name:"Solid Jaggery 5 kg",              cat:"organic",       price:"₹44/kg",   form:"Solid",  packing:"5 kg",        type:"Refined",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348825028/NC/GN/HF/196886344/solid-jaggery-5-kg-500x500.jpeg",             badge:""              },
  { name:"Solid Jaggery 10 Kg",             cat:"organic",       price:"₹40/kg",   form:"Solid",  packing:"10 kg",       type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348824526/VS/EH/DV/196886344/solid-jaggery-10-kg-500x500.jpeg",            badge:""              },
  { name:"16 Gm Jaggery Cubes 1 Kg",        cat:"organic",       price:"₹55/kg",   form:"Cubes",  packing:"1 kg",        type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348817396/AJ/MV/QO/196886344/16-gm-jaggery-cubes-1-kg-500x500.jpeg",       badge:""              },

  /* Jaggery Powder */
  { name:"Natural Organic Jaggery Powder",  cat:"powder",        price:"₹90/kg",   form:"Powder", packing:"500 g Jar",   type:"Sugarcane",             img:"https://5.imimg.com/data5/ANDROID/Default/2023/10/349854615/ZW/SU/GU/196886344/whatsapp-image-2023-09-30-at-10-16-31-pm-1-500x500.jpeg", badge:"Premium"  },
  { name:"Pure Sugarcane Jaggery Powder",   cat:"powder",        price:"₹55/kg",   form:"Powder", packing:"500 g",       type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348781735/SE/TJ/JE/196886344/jaggery-powder-500-gm-500x500.jpeg",          badge:""              },
  { name:"Nalini Jaggery Powder",           cat:"powder",        price:"₹55/pack", form:"Powder", packing:"50 kg Bag",   type:"No Artificial Flavour", img:"https://5.imimg.com/data5/SELLER/Default/2023/10/352015607/IO/LH/MX/196886344/jaggery-powder-500x500.jpeg",               badge:""              },
  { name:"Jaggery Powder 2 Kg",             cat:"powder",        price:"₹55/pack", form:"Powder", packing:"2 kg",        type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/352016361/KA/YD/NT/196886344/pure-sugarcane-jaggery-powder-500x500.jpeg",  badge:"Bulk"          },

  /* Sugarcane Jaggery */
  { name:"Natural Brown Fresh Jaggery Cube",cat:"sugarcane",     price:"₹55/kg",   form:"Cubes",  packing:"500 g",       type:"FSSAI Certified",       img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350529197/OQ/EZ/XE/196886344/export-quality-sugarcane-jaggery-cube-500x500.jpeg", badge:"FSSAI" },
  { name:"Export Quality Sugarcane Jaggery",cat:"sugarcane",     price:"₹45/kg",   form:"Cubes",  packing:"1 kg",        type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350487961/CX/NZ/JC/196886344/export-quality-sugarcane-jaggery-500x500.jpeg", badge:"Export" },
  { name:"Sugarcane Jaggery Cubes",         cat:"sugarcane",     price:"₹80/kg",   form:"Cubes",  packing:"500 g Jar",   type:"Sugarcane",             img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349195913/PT/IN/TT/196886344/whatsapp-image-2023-09-30-at-10-16-40-pm-500x500.jpeg", badge:"" },
  { name:"Kolhapuri Sugarcane White Jaggery",cat:"sugarcane",    price:"₹40/kg",   form:"Cubes",  packing:"500 g",       type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349834005/OA/ZO/UP/196886344/kolhapuri-sugarcane-white-jaggery-10-30kg-500x500.jpeg", badge:"Special" },
  { name:"8 Gm Jaggery Cube",               cat:"sugarcane",     price:"₹55/kg",   form:"Cubes",  packing:"1 kg Jar",    type:"Sugarcane",             img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348817022/IT/JY/MO/196886344/16-gm-jaggery-cubes-500-g-500x500.jpeg",       badge:""              },

  /* Chemical Free */
  { name:"Ball Natural Pure Organic Jaggery",cat:"chemical-free",price:"₹40/kg",   form:"Ball",   packing:"250 g",       type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193117/SB/RP/TF/196886344/20191227-220317-500x500.jpg",                  badge:"Chemical Free" },
  { name:"Natural Karad Jaggery",           cat:"chemical-free", price:"₹44/kg",   form:"Solid",  packing:"1 kg",        type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193121/FN/OI/JY/196886344/20201123-153437-500x500.jpg",                  badge:""              },
  { name:"Pure Sugarcane Jaggery",          cat:"chemical-free", price:"₹45/kg",   form:"Ball",   packing:"1 kg",        type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193136/HH/CV/OM/196886344/20201123-153500-500x500.jpg",                  badge:""              },
  { name:"Dark Brown Jaggery Cube",         cat:"chemical-free", price:"₹50/kg",   form:"Solid",  packing:"1 kg",        type:"FSSAI Certified",       img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193972/CM/LK/CM/196886344/20201126-190307-500x500.jpeg",                 badge:"FSSAI"         },

  /* Natural Jaggery */
  { name:"Organic Sugarcane Jaggery Cubes", cat:"natural",       price:"₹50/kg",   form:"Cubes",  packing:"500 g",       type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350549098/UT/JC/TQ/196886344/natural-solid-jaggery-10-kg-500x500.jpeg",    badge:""              },
  { name:"Karad Natural Chemical Free Jaggery",cat:"natural",    price:"₹50/kg",   form:"Solid",  packing:"5–30 kg",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348310013/NS/MK/LC/196886344/fresh-jaggery-cube-500x500.jpeg",              badge:""              }
];


/* ─────────────────────────────────────────
   2. RENDER PRODUCTS
   Builds product card HTML and injects
   it into #productsContainer.
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

/* Helper: escape product name for HTML attribute values */
function escapeAttr(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/'/g,  '&#39;')
    .replace(/"/g,  '&quot;');
}


/* ─────────────────────────────────────────
   3. CATEGORY TAB FILTER
───────────────────────────────────────── */
function initCategoryTabs() {
  var tabContainer = document.getElementById('catTabs');
  if (!tabContainer) return;

  tabContainer.addEventListener('click', function(e) {
    var tab = e.target.closest('.cat-tab');
    if (!tab) return;

    document.querySelectorAll('.cat-tab').forEach(function(t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');

    renderProducts(tab.dataset.cat);
  });
}


/* ─────────────────────────────────────────
   4. ORDER / QUOTE MODAL
───────────────────────────────────────── */

/* Open modal and populate the product name + details */
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

  modal.style.display         = 'flex';
  document.body.style.overflow = 'hidden';
}

/* Close modal and reset form */
function closeOrderModal() {
  var modal = document.getElementById('orderModal');
  var form  = document.getElementById('orderForm');
  if (!modal) return;

  modal.style.display          = 'none';
  document.body.style.overflow = '';
  if (form) form.reset();
}

/* Handle quick-enquiry submit inside modal */
async function submitOrder(e) {
  e.preventDefault();
  var form = e.target;
  var btn  = form.querySelector('button[type="submit"]');
  if (!btn) return;

  var productName = document.getElementById('modalProductName');
  var data = {
    type:    'product_enquiry',
    product: productName ? productName.textContent : '',
    name:    form.name.value,
    phone:   form.phone.value,
    city:    form.city ? form.city.value : '',
    qty:     form.qty  ? form.qty.value  : ''
  };

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  var result = (typeof saveLead === 'function')
    ? await saveLead('leads', data)
    : { success: true };

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
    btn.textContent  = 'Error — Try Again';
    btn.style.background = '#e53935';
    btn.style.color      = '#fff';
    btn.disabled = false;
  }
}

/* Close modal when clicking outside the box */
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

  var result = (typeof saveLead === 'function')
    ? await saveLead('contacts', data)
    : { success: true };

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
   NAV SEARCH — Suggestions + Handler
───────────────────────────────────────── */
function showSearchSuggestions(query) {
  var list = document.getElementById('searchSuggestions');
  if (!list) return;

  var q = query.trim().toLowerCase();
  var matches = q
    ? products.filter(function(p) { return p.name.toLowerCase().includes(q); })
    : products.slice(0, 8);

  if (!matches.length) {
    list.innerHTML = '';
    list.classList.remove('open');
    return;
  }

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

  // if no products grid on this page — redirect to products.html
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

/* Close suggestions when clicking outside */
document.addEventListener('click', function(e) {
  var wrap = document.querySelector('.nav-search-wrap');
  var list = document.getElementById('searchSuggestions');
  if (list && wrap && !wrap.contains(e.target)) {
    list.innerHTML = '';
    list.classList.remove('open');
  }
});

/* ─────────────────────────────────────────
   6. MOBILE NAVIGATION (Hamburger)
───────────────────────────────────────── */

/* Toggle open / closed */
function toggleMenu() {
  var navMenu = document.getElementById('navMenu');
  if (navMenu) navMenu.classList.toggle('open');
}

/* Auto-close when a nav link is tapped */
function initNavLinkClose() {
  var navMenu = document.getElementById('navMenu');
  if (!navMenu) return;

  navMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navMenu.classList.remove('open');
    });
  });
}


/* ─────────────────────────────────────────
   7. SCROLL REVEAL (IntersectionObserver)
   .reveal elements animate in when they
   enter the viewport.
───────────────────────────────────────── */
function initScrollReveal() {
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* unobserve after first trigger */
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
}


/* ─────────────────────────────────────────
   8. INIT — run everything on DOM ready
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  renderProducts('all');      /* render all product cards */
  initCategoryTabs();         /* wire up category filter tabs */
  initModalBackdropClose();   /* close modal on backdrop click */
  initNavLinkClose();         /* close mobile nav on link click */
  initScrollReveal();         /* animate .reveal elements on scroll */

  // handle ?search= query from other pages
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
   CHATBOT
───────────────────────────────────────── */
const chatbotReplies = [
  {
    keys: ['product','offer','sell','range','jaggery','type'],
    reply: `We offer a wide range of jaggery products:\n• Organic Jaggery (10kg, 30kg)\n• Jaggery Powder\n• Jaggery Cubes\n• Sugarcane Jaggery\n• Ball Jaggery\n• Jaggery Syrup\n\nAll chemical-free and FSSAI certified. 🌾`
  },
  {
    keys: ['price','cost','rate','kg','how much'],
    reply: `Our prices start from ₹44/kg for bulk orders. Pricing varies by product and quantity.\n\nFor an exact quote, please call us at 📞 09112658473 or use the Get Free Quote form.`
  },
  {
    keys: ['order','buy','purchase','how to'],
    reply: `Placing an order is easy:\n1. Browse our Products section\n2. Click "Get Quote" on any product\n3. Fill in your details\n4. We'll call you within 24 hours!\n\nOr call us directly: 📞 09112658473`
  },
  {
    keys: ['export','international','abroad','uae','uk','usa','foreign'],
    reply: `Yes, we export! 🌍\n\nWe are APEDA registered and IEC certified for international trade. We currently supply to UAE, UK, USA and more.\n\nContact us for export pricing and documentation support.`
  },
  {
    keys: ['certif','fssai','iso','apeda','organic','quality'],
    reply: `Our certifications:\n✓ FSSAI Certified\n✓ ISO 22000:2005\n✓ APEDA Registered\n✓ GST Verified (27AAICK8476F1Z2)\n✓ IEC Registered\n\nEvery batch is tested before dispatch.`
  },
  {
    keys: ['contact','phone','call','whatsapp','email','reach'],
    reply: `You can reach us at:\n📞 Call: 09112658473\n💬 WhatsApp: wa.me/919112658473\n📍 CBD Belapur, Navi Mumbai\n\nOr visit our Contact page for the enquiry form.`
  },
  {
    keys: ['address','location','office','where','mumbai','navi'],
    reply: `Our registered office:\n📍 2nd Floor, Office No 242, Sai Chamber, Sector 11, Plot No 44, CBD Belapur, Navi Mumbai – 400614, Maharashtra, India.`
  },
  {
    keys: ['bulk','wholesale','distributor','large','quantity'],
    reply: `We supply in bulk! Available pack sizes:\n• 250g, 500g, 1kg, 2kg (retail)\n• 10kg, 25kg, 30kg (wholesale/bulk)\n\nCustom packaging and private labeling also available. Call us for bulk pricing.`
  },
  {
    keys: ['minimum','moq','minimum order'],
    reply: `Minimum order quantity depends on the product. Generally:\n• Retail packs: No minimum\n• Bulk/wholesale: 50kg minimum\n\nCall 09112658473 for exact MOQ details.`
  },
  {
    keys: ['hello','hi','hey','namaste','good morning','good afternoon'],
    reply: `Namaste! 🙏 Welcome to Nalini Jaggery.\n\nI'm here to help you with product info, pricing, orders and more. What can I help you with today?`
  },
  {
    keys: ['thank','thanks','ok','okay','great','perfect'],
    reply: `You're welcome! 😊 Feel free to ask anything else. We're happy to help!`
  }
];

function toggleChatbot() {
  const win = document.getElementById('chatbotWindow');
  if (!win) return;
  win.classList.toggle('open');
  if (win.classList.contains('open') && document.getElementById('chatbotMessages').children.length === 0) {
    chatBotMessage('Namaste! 🙏 I\'m the Nalini Jaggery assistant. Ask me about our products, pricing, orders or export. How can I help?', 'bot');
  }
}

function chatBotMessage(text, type) {
  const msgs = document.getElementById('chatbotMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.style.whiteSpace = 'pre-line';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function chatSend(preset) {
  const input = document.getElementById('chatbotInput');
  const text = (preset || (input ? input.value.trim() : '')).toLowerCase();
  if (!text) return;
  chatBotMessage(preset || input.value.trim(), 'user');
  if (input && !preset) input.value = '';

  // hide quick buttons after first interaction
  const quick = document.getElementById('chatbotQuick');
  if (quick) quick.style.display = 'none';

  setTimeout(() => {
    const match = chatbotReplies.find(r => r.keys.some(k => text.includes(k)));
    chatBotMessage(
      match ? match.reply : `Thanks for your message! For detailed assistance, please call us at 📞 09112658473 or WhatsApp us at wa.me/919112658473.`,
      'bot'
    );
  }, 500);
}
