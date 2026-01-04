/* ===================== CONFIG ===================== */

const API_BASE =
  "https://pnc5hujab0.execute-api.ap-south-1.amazonaws.com/dev";

/* ===================== GLOBAL STATE ===================== */

let products = [];

/* ===================== LOAD INVENTORY ===================== */

async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error("Failed to load inventory");

    products = await res.json();
    renderProducts(products);
    updateStats(products);
  } catch (err) {
    console.error(err);
    alert("Failed to load inventory");
  }
}

/* ===================== RENDER UI ===================== */

function renderProducts(data) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  data.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${p.productname}</h3>
      <p>ID: ${p.productid}</p>
      <p>Quantity: ${p.quantity}</p>
      <p>Threshold: ${p.threshold}</p>
      <input type="number" min="1" placeholder="Order Qty" id="qty-${p.productid}">
      <button onclick="orderProduct('${p.productid}')">Order</button>
    `;

    container.appendChild(card);
  });
}

function updateStats(data) {
  document.getElementById("totalProducts").innerText = data.length;

  let totalStock = 0;
  let lowStock = 0;

  data.forEach((p) => {
    totalStock += Number(p.quantity);
    if (Number(p.quantity) <= Number(p.threshold)) lowStock++;
  });

  document.getElementById("totalStock").innerText = totalStock;
  document.getElementById("lowStock").innerText = lowStock;
}

/* ===================== ORDER PRODUCT ===================== */

async function orderProduct(productid) {
  const input = document.getElementById(`qty-${productid}`);
  const orderQty = Number(input.value);

  if (isNaN(orderQty) || orderQty <= 0) {
    alert("Invalid order quantity");
    return;
  }

  // 🔒 Find product safely
  const product = products.find((p) => p.productid === productid);
  if (!product) {
    alert("Product not found");
    return;
  }

  // 🔒 Client-side stock check
  if (orderQty > Number(product.quantity)) {
    alert("Order quantity exceeds available stock");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/inventory-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productid,
        orderQty
      })
    });

    if (!res.ok) throw new Error("Order failed");

    alert("Order placed successfully");
    loadProducts(); // refresh inventory
  } catch (err) {
    console.error(err);
    alert("Order API failed");
  }
}

/* ===================== ADD PRODUCT ===================== */

function openModal() {
  const productid = prompt("Enter Product ID:");
  if (!productid) return;

  const productname = prompt("Enter Product Name:");
  if (!productname) return;

  const quantity = Number(prompt("Enter Quantity:"));
  if (isNaN(quantity) || quantity < 0) {
    alert("Invalid quantity");
    return;
  }

  const threshold = Number(prompt("Enter Threshold:"));
  if (isNaN(threshold) || threshold < 0) {
    alert("Invalid threshold");
    return;
  }

  addProduct({ productid, productname, quantity, threshold });
}

async function addProduct(product) {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (!res.ok) throw new Error("Failed to add product");

    alert("Product added successfully");
    loadProducts();
  } catch (err) {
    console.error(err);
    alert("Add Product failed");
  }
}

/* ===================== INITIAL LOAD ===================== */

window.onload = loadProducts;
