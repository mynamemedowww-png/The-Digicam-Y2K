// Dữ liệu máy ảnh đậm chất Y2K & Retro
const products = [
    {
        id: 1,
        name: "Sony Cyber-shot DSC-W350",
        price: 3200000,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
        desc: "Huyền thoại compact CCD mang lại màu ảnh vintage cực chất, nhỏ gọn đút túi quần."
    },
    {
        id: 2,
        name: "Fujifilm FinePix F40fd",
        price: 3800000,
        image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=600&q=80",
        desc: "Cảm biến Super CCD cho khả năng tái tạo màu sắc ấm áp, đặc trưng phong cách hoài cổ."
    },
    {
        id: 3,
        name: "Canon PowerShot S95",
        price: 4500000,
        image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=600&q=80",
        desc: "Dòng máy ảnh cao cấp bỏ túi, khẩu độ lớn mở rộng khả năng chụp thiếu sáng."
    },
    {
        id: 4,
        name: "Nikon Coolpix L22",
        price: 2500000,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
        desc: "Dễ sử dụng, dùng pin tiểu AA tiện lợi, hạt ảnh thô mịn đậm chất thập niên 2000s."
    },
    {
        id: 5,
        name: "Olympus FE-340",
        price: 2900000,
        image: "https://images.unsplash.com/photo-1495714401831-7e81083f3e58?auto=format&fit=crop&w=600&q=80",
        desc: "Thiết kế vỏ nhôm sáng bóng sang trọng, dải màu hoài niệm chuẩn aesthetic Y2K."
    },
    {
        id: 6,
        name: "Panasonic Lumix DMC-FX7",
        price: 3500000,
        image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
        desc: "Ống kính Leica danh tiếng, chống rung O.I.S ổn định, sắc nét trong từng khung hình."
    }
];

let cart = JSON.parse(localStorage.getItem('digicam_cart')) || [];

function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(product => `
        <div class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-xl transition duration-300">
            <div>
                <div class="h-56 overflow-hidden bg-gray-100">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-bold mb-2 text-slate-900">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.desc}</p>
                </div>
            </div>
            <div class="p-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-2">
                <span class="text-amber-600 font-extrabold text-lg">${formatMoney(product.price)}</span>
                <button onclick="addToCart(${product.id})" class="bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2">
                    <i class="fa-solid fa-cart-plus"></i> Thêm
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveAndRenderCart();
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

function saveAndRenderCart() {
    localStorage.setItem('digicam_cart', JSON.stringify(cart));
    
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;

    const cartContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-gray-500 text-center py-8">Giỏ hàng đang trống trơn!</p>`;
    } else {
        cartContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between gap-3 border-b pb-3">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg border">
                <div class="flex-grow">
                    <h4 class="font-semibold text-sm text-slate-900">${item.name}</h4>
                    <span class="text-amber-600 text-sm font-bold">${formatMoney(item.price)}</span>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">-</button>
                    <span class="text-sm font-semibold w-5 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">+</button>
                </div>
            </div>
        `).join('');
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = formatMoney(totalPrice);
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    saveAndRenderCart();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

// Mở modal quét mã QR thanh toán sử dụng VietQR API tự động
function openCheckoutModal() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('qr-total-amount').innerText = formatMoney(totalPrice);

    // Tạo link VietQR tự động điền số tiền (Dùng tài khoản mẫu VietQR công khai hoặc thay thông tin của ông vào đây)
    // Cú pháp VietQR chuẩn: https://img.vietqr.io/image/[BANK_ID]-[ACCOUNT_NO]-[TEMPLATE].png?amount=[MONEY]&addInfo=[NOTE]
    // Ví dụ dùng Vietcombank / MB Bank:
    const bankId = "MB"; // Mã ngân hàng (ví dụ: MB, VCB, TCB...)
    const accountNo = "0123456789"; // Số tài khoản nhận tiền của ông
    const template = "compact";
    const note = "TheDigicamY2K Thanh Toan";
    
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${totalPrice}&addInfo=${encodeURIComponent(note)}`;
    
    document.getElementById('qr-code-img').src = qrUrl;

    // Ẩn giỏ hàng, bật modal QR
    toggleCart();
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function confirmOrder() {
    alert("Cảm ơn bạn! Hệ thống đã ghi nhận đơn hàng và đang chờ xác nhận chuyển khoản từ bạn.");
    cart = [];
    saveAndRenderCart();
    closeCheckoutModal();
}

renderProducts();
saveAndRenderCart();