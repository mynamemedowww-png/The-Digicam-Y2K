const products = [
    {
        id: 1,
        name: "Sony Cyber-shot DSC-W350",
        price: 3200000,
        oldPrice: 3900000,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
        desc: "Huyền thoại compact CCD mang lại màu ảnh vintage cực chất, nhỏ gọn đút túi quần, ống kính Carl Zeiss sắc nét."
    },
    {
        id: 2,
        name: "Fujifilm FinePix F40fd",
        price: 3800000,
        oldPrice: 4500000,
        image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=600&q=80",
        desc: "Cảm biến Super CCD độc quyền cho khả năng tái tạo màu sắc ấm áp, khử nhiễu tốt trong tầm giá."
    },
    {
        id: 3,
        name: "Canon PowerShot S95",
        price: 4500000,
        oldPrice: 5200000,
        image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=600&q=80",
        desc: "Dòng máy ảnh cao cấp bỏ túi, khẩu độ lớn mở rộng khả năng chụp thiếu sáng và tùy chỉnh thông số như máy cơ."
    },
    {
        id: 4,
        name: "Nikon Coolpix L22",
        price: 2500000,
        oldPrice: 3000000,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
        desc: "Dễ sử dụng, dùng pin tiểu AA tiện lợi, hạt ảnh thô mịn đậm chất thập niên 2000s."
    },
    {
        id: 5,
        name: "Olympus FE-340",
        price: 2900000,
        oldPrice: 3500000,
        image: "https://images.unsplash.com/photo-1495714401831-7e81083f3e58?auto=format&fit=crop&w=600&q=80",
        desc: "Thiết kế vỏ nhôm sáng bóng sang trọng, dải màu hoài niệm chuẩn aesthetic Y2K."
    },
    {
        id: 6,
        name: "Panasonic Lumix DMC-FX7",
        price: 3500000,
        oldPrice: 4100000,
        image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
        desc: "Ống kính Leica danh tiếng, chống rung O.I.S ổn định, sắc nét trong từng khung hình."
    }
];

let cart = JSON.parse(localStorage.getItem('digicam_cart')) || [];
let currentQty = 1;

function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="bg-white rounded-2xl shadow-md overflow-hidden border flex flex-col justify-between hover:shadow-xl transition">
            <div onclick="goToDetail(${p.id})" class="cursor-pointer">
                <div class="h-56 overflow-hidden bg-gray-100">
                    <img src="${p.image}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-bold mb-1 text-slate-900">${p.name}</h3>
                    <p class="text-gray-500 text-xs mb-3 line-clamp-2">${p.desc}</p>
                    <div class="flex items-center gap-2">
                        <span class="text-amber-600 font-extrabold text-lg">${formatMoney(p.price)}</span>
                        <span class="text-gray-400 line-through text-xs">${formatMoney(p.oldPrice)}</span>
                    </div>
                </div>
            </div>
            <div class="p-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-2 pt-3">
                <button onclick="goToDetail(${p.id})" class="text-sm font-semibold text-gray-700 hover:text-amber-600">Xem chi tiết</button>
                <button onclick="addToCart(${p.id})" class="bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1">
                    <i class="fa-solid fa-cart-plus"></i> Thêm
                </button>
            </div>
        </div>
    `).join('');
}

function goToDetail(id) {
    window.location.href = `detail.html?id=${id}`;
}

function loadDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')) || 1;
    const product = products.find(p => p.id === id) || products[0];

    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-name').innerText = product.name;
    document.getElementById('detail-price').innerText = formatMoney(product.price);
    document.getElementById('detail-old-price').innerText = formatMoney(product.oldPrice);
    document.getElementById('detail-desc').innerText = product.desc;
    window.activeProduct = product;
}

function changeQty(delta) {
    currentQty += delta;
    if (currentQty < 1) currentQty = 1;
    document.getElementById('qty-input').innerText = currentQty;
}

function addCurrentToCart() {
    const p = window.activeProduct;
    const existing = cart.find(item => item.id === p.id);
    if (existing) {
        existing.quantity += currentQty;
    } else {
        cart.push({ ...p, quantity: currentQty });
    }
    saveAndRenderCart();
    alert(`Đã thêm ${currentQty} chiếc "${p.name}" vào giỏ hàng!`);
}

function addToCart(id) {
    const p = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === p.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...p, quantity: 1 });
    }
    saveAndRenderCart();
    alert(`Đã thêm "${p.name}" vào giỏ hàng!`);
}

function addAccessory(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: 'acc_' + Date.now(), name, price, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80', quantity: 1 });
    }
    saveAndRenderCart();
    alert(`Đã thêm phụ kiện "${name}" vào giỏ hàng!`);
}

function saveAndRenderCart() {
    localStorage.setItem('digicam_cart', JSON.stringify(cart));
    
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = totalCount;

    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = `<p class="text-gray-500 text-center py-8">Giỏ hàng đang trống trơn!</p>`;
        } else {
            cartContainer.innerHTML = cart.map(item => `
                <div class="flex items-center justify-between gap-3 border-b pb-3">
                    <img src="${item.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'}" class="w-14 h-14 object-cover rounded-lg border">
                    <div class="flex-grow">
                        <h4 class="font-semibold text-xs text-slate-900">${item.name}</h4>
                        <span class="text-amber-600 text-xs font-bold">${formatMoney(item.price)}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <button onclick="updateQty('${item.id}', -1)" class="w-5 h-5 bg-gray-100 rounded text-xs font-bold">-</button>
                        <span class="text-xs font-semibold w-5 text-center">${item.quantity}</span>
                        <button onclick="updateQty('${item.id}', 1)" class="w-5 h-5 bg-gray-100 rounded text-xs font-bold">+</button>
                    </div>
                </div>
            `).join('');
        }
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = document.getElementById('cart-total');
    if (totalElement) totalElement.innerText = formatMoney(totalPrice);
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id == id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id != id);
        }
    }
    saveAndRenderCart();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.classList.toggle('hidden');
}

function openCheckoutModal() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('qr-total-amount').innerText = formatMoney(totalPrice);

    const qrUrl = `https://img.vietqr.io/image/MB-0123456789-compact.png?amount=${totalPrice}&addInfo=TheDigicamY2K`;
    document.getElementById('qr-code-img').src = qrUrl;

    toggleCart();
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function confirmOrder() {
    alert("Cảm ơn bạn! Đơn hàng đã được ghi nhận.");
    cart = [];
    saveAndRenderCart();
    closeCheckoutModal();
}