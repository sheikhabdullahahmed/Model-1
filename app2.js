


document.addEventListener('DOMContentLoaded', (event) => {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = "/";
    }

    loadProducts();

    document.getElementById('productForm').addEventListener('submit', function (e) {
        e.preventDefault();
        addProduct();
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);
});

function addProduct() {
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').value;
    const productDescription = document.getElementById('productDescription').value;

    const product = {
        id: productId,
        name: productName,
        image: productImage,
        description: productDescription,
        quantity: 1 // Initialize quantity to 1
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    document.getElementById('productForm').reset();
    document.querySelector('.btn-close').click();
    loadProducts();
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; 

    products.forEach((product, index) => {
        const productCard = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${product.image}" class="rounded float-left" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${product.id}</h5>
                        <h5 class="card-title">Product: ${product.name}</h5>
                        <p class="card-text">Price: $${product.description}</p>
                        <p class="card-text">Quantity: ${product.quantity}</p>
                        <button class="btn btn-primary edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-success increase-btn" data-index="${index}">+</button>
                        <button class="btn btn-danger decrease-btn" data-index="${index}">-</button>
                    </div>
                </div>
            </div>
        `;
        productList.insertAdjacentHTML('beforeend', productCard);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', editProduct);
    });
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
}

function editProduct(event) {
    const index = event.target.getAttribute('data-index');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    const newName = prompt('Enter new name:', product.name);
    const newDescription = prompt('Enter new description:', product.description);
    const newImage = prompt('Enter new image URL:', product.image);

    if (newName && newDescription && newImage) {
        products[index] = {
            ...product,
            name: newName,
            description: newDescription,
            image: newImage
        };
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

function increaseQuantity(event) {
    const index = event.target.getAttribute('data-index');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products[index].quantity++;
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

function decreaseQuantity(event) {
    const index = event.target.getAttribute('data-index');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    if (products[index].quantity > 1) {
        products[index].quantity--;
    } else {
        products.splice(index, 1);
    }
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

function deleteAllProducts() {
    localStorage.removeItem('products');
    loadProducts();
}

document.getElementById('deleteAllBtn').addEventListener('click', deleteAllProducts);

function logout() {
    localStorage.removeItem('user');
    window.location.href = "/";
}

window.onload = loadProducts;



