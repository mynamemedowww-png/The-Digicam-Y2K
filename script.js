const CAMERAS=[
{id:'c1',name:'LumiCam C01 Street',price:3490000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Sony_NEX-5.jpg',desc:'Nhỏ gọn, phù hợp đi phố và du lịch.',tag:'ENTRY / TRAVEL'},
{id:'c2',name:'LumiCam C02 Classic',price:3690000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_NX100.jpg',desc:'Thiết kế tối giản, dễ làm quen.',tag:'EVERYDAY'},
{id:'c3',name:'LumiCam C03 Creator',price:3990000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Adapted_Lens_on_Mirrorless_Camera.jpg',desc:'Hợp chụp ảnh và quay nội dung cá nhân.',tag:'CREATOR'},
{id:'c4',name:'LumiCam C04 Pro',price:4290000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Sigma_fp_26_oct_2019a.jpg',desc:'Thân máy gọn, phong cách chuyên nghiệp.',tag:'PRO / COMPACT'},
{id:'c5',name:'LumiCam C05 Retro',price:4590000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Mirrorless_Kodak_Brownie_127_camera.jpg',desc:'Ngoại hình retro cho những bộ ảnh có cá tính.',tag:'RETRO STYLE'},
{id:'c6',name:'LumiCam C06 Dual',price:4990000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Sony_mirrorless_cameras.jpg',desc:'Lựa chọn cao cấp cho người muốn nâng cấp.',tag:'UPGRADE PICK'}];
const ACCESSORIES=[
{id:'a1',name:'Lens 35mm Prime',price:890000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Camera_Lens.JPG'},
{id:'a2',name:'Lens 50mm Classic',price:990000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Nikon_Camera_Lens.JPG'},
{id:'a3',name:'Memory Card 128GB',price:390000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Camera_Lens.JPG'},
{id:'a4',name:'Camera Bag',price:450000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Mirrorless_Kodak_Brownie_127_camera.jpg'},
{id:'a5',name:'Mini Tripod',price:290000,img:'https://commons.wikimedia.org/wiki/Special:FilePath/Camera_Lens.JPG'}];
const ALL=[...CAMERAS,...ACCESSORIES];let cart=JSON.parse(localStorage.getItem('lumicam-cart')||'[]');
const money=n=>new Intl.NumberFormat('vi-VN').format(n)+'₫';
function renderProducts(){cameraGrid.innerHTML=CAMERAS.map(p=>card(p)).join('');accessoryGrid.innerHTML=ACCESSORIES.map(p=>card(p,true)).join('')}
function card(p,acc=false){return `<article class="card"><div class="card-img"><img src="${p.img}" alt="${p.name}" loading="lazy"></div><div class="card-info"><span class="tag">${p.tag||'ACCESSORY'}</span><h3>${p.name}</h3>${!acc?`<p class="desc">${p.desc}</p>`:''}<div class="price">${money(p.price)}</div><div class="card-actions"><button class="add" onclick="add('${p.id}')">Thêm vào giỏ</button></div></div></article>`}
function add(id){cart.push(id);save();openCart()};function save(){localStorage.setItem('lumicam-cart',JSON.stringify(cart));renderCart()}
function renderCart(){cartCount.textContent=cart.length;const items=cart.map(id=>ALL.find(p=>p.id===id)).filter(Boolean);if(!items.length){cartItems.innerHTML='<p style="padding:30px;color:#777">Giỏ hàng đang trống.</p>'}else{cartItems.innerHTML=items.map((p,i)=>`<div class="cart-row"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><small>${money(p.price)}</small></div><button class="remove" onclick="removeItem(${i})">Xóa</button></div>`).join('')}cartTotal.textContent=money(items.reduce((s,p)=>s+p.price,0))}
function removeItem(i){cart.splice(i,1);save()};function openCart(){drawer.classList.add('open');overlay.classList.add('show')};function closeCart(){drawer.classList.remove('open');overlay.classList.remove('show')};
cartBtn.onclick=openCart;closeCart.onclick=closeCart;overlay.onclick=closeCart;renderProducts();renderCart();
checkoutBtn.onclick=()=>{if(!cart.length)return alert('Giỏ hàng đang trống nha!');checkoutModal.classList.add('show');closeCart()};closeModal.onclick=()=>checkoutModal.classList.remove('show');
checkoutForm.onsubmit=e=>{e.preventDefault();if(payment.value==='qr'){const total=cart.map(id=>ALL.find(p=>p.id===id)?.price||0).reduce((a,b)=>a+b,0);qrImage.src=`https://img.vietqr.io/image/MB-0123456789-compact2.png?amount=${total}&addInfo=LUMICAM%20${Date.now()}&accountName=LUMICAM`;qrBox.hidden=false}else{alert('Đã tạo đơn COD mô phỏng!');cart=[];save();checkoutModal.classList.remove('show')}};
paidBtn.onclick=()=>{alert('Đã ghi nhận thanh toán mô phỏng. Cảm ơn bạn!');cart=[];save();checkoutModal.classList.remove('show');qrBox.hidden=true;checkoutForm.reset()};
