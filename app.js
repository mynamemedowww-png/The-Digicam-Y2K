// Dữ liệu mẫu các máy ảnh
const products = [
    {
        id: 1,
        name: "Sony Alpha A7 IV",
        price: 48500000,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
        desc: "Cảm biến Full-frame 33MP, quay phim 4K 60p, lấy nét tự động thời gian thực siêu đỉnh."
    },
    {
        id: 2,
        name: "Fujifilm X-T5",
        price: 39900000,
        image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=600&q=80",
        desc: "Thiết kế hoài cổ cá tính, cảm biến X-Trans 5 HR 40MP, chống rung IBIS cực mạnh."
    },
    {
        id: 3,
        name: "Canon EOS R6 Mark II",
        price: 52000000,
        image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=600&q=80",
        desc: "Chụp liên tục 40fps, tối ưu hóa tuyệt vời cho cả nhiếp ảnh gia chân dung và nhà làm phim."
    },
    {
        id: 4,
        name: "Nikon Zf",
        price: 45000000,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
        desc: "Ngoại hình cổ điển đậm chất máy film lịch sử kết hợp công nghệ xử lý ảnh Expeed 7 hiện đại."
    },
    {
        id: 5,
        name: "Sony ZV-E10 II",
        price: 23500000,
        image: "https://images.unsplash.com/photo-1495714401831-7e81083f3e58?auto=format&fit=crop&w=600&q=80",
        desc: "Chân ái cho các creator quay vlog, làm TikTok, màn hình xoay lật linh hoạt, lấy nét cực nhạy."
    },
    {
        id: 6,
        name: "Fujifilm X100VI",
        price: 42000000,
        image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
        desc: "Dòng máy ảnh compact ống kính liền cao cấp, luôn trong tình trạng cháy hàng toàn cầu."
    }
];

// Lấy giỏ hàng từ localStorage (nếu có)
let cart = JSON.parse(localStorage.getItem('ns_cart')) || [];

// Format tiền tệ VNĐ
function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// Render danh sách sản phẩm ra HTML
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

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveAndRenderCart();
    
    // Hiệu ứng nhẹ báo đã thêm
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

// Lưu giỏ hàng vào trình duyệt và cập nhật giao diện
function saveAndRenderCart() {
    localStorage.setItem('ns_cart', JSON.stringify(cart));
    
    // Cập nhật số lượng trên icon giỏ hàng
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;

    // Render danh sách trong giỏ
    const cartContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-gray-500 text-center py-8">Giỏ hàng đang trống trơn!</p>`;
    } else {
        cartContainer.innerHTML = cart.map(item => `
            flex flex-col gap-2 ...
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

    // Tính tổng tiền
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = formatMoney(totalPrice);
}

// Tăng giảm số lượng sản phẩm trong giỏ
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

// Bật/tắt mở modal giỏ hàng
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

// Xử lý nút thanh toán
function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }
    alert("Cảm ơn bạn đã đặt hàng! (Đây là web demo tĩnh, đơn hàng đã được ghi nhận vào hệ thống giả lập).");
    cart = [];
    saveAndRenderCart();
    toggleCart();
}

// Khởi chạy khi load trang
renderProducts();
saveAndRenderCart();