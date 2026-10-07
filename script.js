const STORE = {
  // ====== SỬA THÔNG TIN THANH TOÁN Ở ĐÂY ======
  bankId: "MB",                 // Ví dụ: MB, VCB, ACB...
  accountNumber: "0123456789",  // Số tài khoản
  accountName: "LUMICAM",       // Tên chủ tài khoản
  // =============================================
};

const products = [
  {id:"cam01", type:"camera", name:"LumiCam C01", price:3490000, oldPrice:3790000, badge:"Dễ bắt đầu", desc:"Máy ảnh nhỏ gọn cho người mới làm quen với nhiếp ảnh.", specs:"24MP • Zoom 5x • Màn hình 3 inch • Pin 1200mAh"},
  {id:"cam02", type:"camera", name:"LumiCam C02", price:3890000, oldPrice:4290000, badge:"Bán chạy", desc:"Thiết kế gọn nhẹ, phù hợp đi chơi và du lịch.", specs:"24MP • Zoom 8x • Màn hình lật • Quay Full HD"},
  {id:"cam03", type:"camera", name:"LumiCam C03", price:4190000, oldPrice:4590000, badge:"Mới", desc:"Màu ảnh tự nhiên và thao tác đơn giản mỗi ngày.", specs:"26MP • Zoom 10x • Wi-Fi • Quay Full HD"},
  {id:"cam04", type:"camera", name:"LumiCam C04", price:4490000, oldPrice:4890000, badge:"Được yêu thích", desc:"Lựa chọn cân bằng cho chụp ảnh và quay video.", specs:"26MP • Zoom 12x • Chống rung • Wi-Fi"},
  {id:"cam05", type:"camera", name:"LumiCam C05", price:4690000, oldPrice:5190000, badge:"Nổi bật", desc:"Thân máy chắc chắn, phù hợp những chuyến đi dài.", specs:"28MP • Zoom 15x • 4K • Màn hình cảm ứng"},
  {id:"cam06", type:"camera", name:"LumiCam C06", price:4990000, oldPrice:5490000, badge:"Cao cấp nhất", desc:"Phiên bản cao nhất cho người muốn nhiều tính năng hơn.", specs:"28MP • Zoom 18x • 4K • Wi-Fi • Chống rung"},
  {id:"acc01", type:"accessory", name:"Thẻ nhớ 128GB", price:199000, badge:"Mua kèm", desc:"Thẻ nhớ dung lượng lớn cho ảnh và video.", icon:"💾"},
  {id:"acc02", type:"accessory", name:"Pin dự phòng", price:299000, badge:"Mua kèm", desc:"Pin dự phòng giúp bạn chụp lâu hơn.", icon:"🔋"},
  {id:"acc03", type:"accessory", name:"Túi máy ảnh", price:349000, badge:"Mua kèm", desc:"Túi nhỏ gọn, chống bụi và hạn chế va đập.", icon:"👜"},
  {id:"acc04", type:"accessory", name:"Dây đeo máy ảnh", price:149000, badge:"Mua kèm", desc:"Dây đeo nhẹ, chắc chắn và dễ điều chỉnh.", icon:"🎒"},
  {id:"acc05", type:"accessory", name:"Tripod mini", price:399000, badge:"Mua kèm", desc:"Chân máy nhỏ gọn cho ảnh nhóm và quay video.", icon:"📷"}
];

let cart = JSON.parse(localStorage.getItem("lumicamCart") || "[]");

const money = n => new Intl.NumberFormat("vi-VN").format(n) + "₫";
const getProduct = id => products.find(p => p.id === id);

function saveCart(){ localStorage.setItem("lumicamCart", JSON.stringify(cart)); updateCart(); }

function updateCart(){
  const count = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById("cartCount").textContent = count;
  const el = document.getElementById("cartItems");
  if(!cart.length){
    el.innerHTML = '<div class="empty">Giỏ hàng đang trống.<br>Chọn một chiếc máy ảnh để bắt đầu nhé 📷</div>';
  } else {
    el.innerHTML = cart.map(item=>{
      const p=getProduct(item.id);
      return `<div class="cart-row">
        <div class="cart-thumb">${p.type==="camera"?"📷":p.icon}</div>
        <div>
          <h4>${p.name}</h4><p>${money(p.price)}</p>
          <div class="qty">
            <button onclick="changeQty('${p.id}',-1)">−</button><span>${item.qty}</span><button onclick="changeQty('${p.id}',1)">+</button>
          </div>
          <button class="remove" onclick="removeItem('${p.id}')">Xóa</button>
        </div>
        <strong>${money(p.price*item.qty)}</strong>
      </div>`;
    }).join("");
  }
  const total=cart.reduce((s,i)=>s+getProduct(i.id).price*i.qty,0);
  document.getElementById("cartTotal").textContent=money(total);
}
function addToCart(id){
  const found=cart.find(i=>i.id===id);
  if(found) found.qty++;
  else cart.push({id,qty:1});
  saveCart(); openCart();
}
function changeQty(id,d){
  const item=cart.find(i=>i.id===id); if(!item)return;
  item.qty+=d; if(item.qty<=0) cart=cart.filter(i=>i.id!==id); saveCart();
}
function removeItem(id){cart=cart.filter(i=>i.id!==id);saveCart()}
function clearCart(){cart=[];saveCart()}

function productCard(p){
  if(p.type==="camera"){
    return `<article class="product-card">
      <div class="product-image"><span class="badge">${p.badge}</span><div class="mini-camera"></div></div>
      <div class="product-info"><h3>${p.name}</h3><p class="desc">${p.desc}</p>
      <div class="price">${money(p.price)}</div><div class="product-actions">
      <button class="small-btn" onclick="showProduct('${p.id}')">Xem chi tiết</button>
      <button class="small-btn dark" onclick="addToCart('${p.id}')">Thêm vào giỏ</button></div></div>
    </article>`;
  }
  return `<article class="product-card accessory-card">
    <div class="product-image"><span class="badge">${p.badge}</span></div>
    <div class="product-info"><h3>${p.name}</h3><p class="desc">${p.desc}</p>
    <div class="price">${money(p.price)}</div><div class="product-actions">
    <button class="small-btn dark" onclick="addToCart('${p.id}')">Thêm vào giỏ</button></div></div>
  </article>`;
}

function renderProducts(){
  document.getElementById("cameraGrid").innerHTML=products.filter(p=>p.type==="camera").map(productCard).join("");
  document.getElementById("accessoryGrid").innerHTML=products.filter(p=>p.type==="accessory").map(productCard).join("");
}
function showProduct(id){
  const p=getProduct(id);
  document.getElementById("productDetail").innerHTML=`<button class="modal-close" onclick="closeProduct()">×</button>
    <div class="detail-grid">
      <div class="detail-image"><div class="mini-camera"></div></div>
      <div class="detail-info"><p class="eyebrow">${p.badge}</p><h2>${p.name}</h2><div class="price">${money(p.price)}</div>
      <p>${p.desc}</p><div class="specs">${p.specs}</div><br>
      <button class="btn primary full" onclick="addToCart('${p.id}');closeProduct()">Thêm vào giỏ hàng</button></div>
    </div>`;
  document.getElementById("productModal").classList.add("show");
}
function closeProduct(){document.getElementById("productModal").classList.remove("show")}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("active")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("active")}

function openCheckout(){
  if(!cart.length){alert("Giỏ hàng đang trống.");return}
  closeCart();
  const total=cart.reduce((s,i)=>s+getProduct(i.id).price*i.qty,0);
  const items=cart.map(i=>`${getProduct(i.id).name} × ${i.qty}`).join("<br>");
  document.getElementById("checkoutContent").innerHTML=`<button class="modal-close" onclick="closeCheckout()">×</button>
    <h2>Đặt hàng</h2><p class="checkout-sub">Điền thông tin nhận hàng. Sau đó website sẽ tạo mã QR theo tổng tiền đơn.</p>
    <div class="form-grid">
      <div class="form-field"><label>Họ và tên</label><input id="customerName" placeholder="Nguyễn Văn A"></div>
      <div class="form-field"><label>Số điện thoại</label><input id="customerPhone" placeholder="090..."></div>
      <div class="form-field full-field"><label>Địa chỉ nhận hàng</label><input id="customerAddress" placeholder="Số nhà, đường, phường/xã..."></div>
    </div>
    <div class="order-summary"><strong>Đơn hàng</strong><br>${items}<hr><div class="total-line"><span>Tổng thanh toán</span><strong>${money(total)}</strong></div></div>
    <button class="btn primary full" onclick="createPayment()">Tiếp tục thanh toán QR</button>`;
  document.getElementById("checkoutModal").classList.add("show");
}
function closeCheckout(){document.getElementById("checkoutModal").classList.remove("show")}

function createPayment(){
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  const address=document.getElementById("customerAddress").value.trim();
  if(!name||!phone||!address){alert("Bà điền đủ họ tên, số điện thoại và địa chỉ nha 😭");return}
  const total=cart.reduce((s,i)=>s+getProduct(i.id).price*i.qty,0);
  const orderCode="LUMI"+Date.now().toString().slice(-6);
  const description=`Thanh toan ${orderCode}`;
  // VietQR URL. Có thể đổi ngân hàng/số tài khoản trong STORE ở đầu file script.js.
  const qrUrl=`https://img.vietqr.io/image/${encodeURIComponent(STORE.bankId)}-${encodeURIComponent(STORE.accountNumber)}-compact2.png?amount=${total}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(STORE.accountName)}`;
  document.getElementById("checkoutContent").innerHTML=`<div class="qr-step">
    <p class="eyebrow">BƯỚC CUỐI</p><h2>Quét QR để thanh toán</h2>
    <p class="checkout-sub">Mã đơn: <strong>${orderCode}</strong></p>
    <div class="qr-box"><img src="${qrUrl}" width="260" height="260" alt="QR thanh toán"></div>
    <div class="payment-note">
      <strong>Thông tin chuyển khoản</strong><br>
      Ngân hàng: ${STORE.bankId}<br>
      Số tài khoản: ${STORE.accountNumber}<br>
      Chủ tài khoản: ${STORE.accountName}<br>
      Số tiền: <strong>${money(total)}</strong><br>
      Nội dung: <strong>${description}</strong>
    </div><br>
    <button class="btn primary full" onclick="finishOrder('${orderCode}')">Tôi đã thanh toán</button>
    <p style="font-size:11px;color:#999">Lưu ý: website GitHub Pages không tự xác nhận giao dịch ngân hàng.</p>
  </div>`;
}
function finishOrder(code){
  cart=[];saveCart();
  document.getElementById("checkoutContent").innerHTML=`<div class="success">
    <div class="success-icon">✓</div><p class="eyebrow">ĐẶT HÀNG THÀNH CÔNG</p><h2>Cảm ơn bạn!</h2>
    <p>Mã đơn hàng của bạn là:</p><p class="order-code">${code}</p>
    <p style="color:#777">Đây là website mô phỏng. Trong hệ thống thật, cửa hàng sẽ xác nhận giao dịch và xử lý đơn hàng.</p>
    <button class="btn primary" onclick="closeCheckout()">Về trang chủ</button>
  </div>`;
}
renderProducts();updateCart();
