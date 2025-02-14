// Array of products with name, image URL, and price
const products = [
    { name: "iPhone 11", imageURL: "images/iphone11.jpg", price: 17990.0 },
    { name: "iPhone 12", imageURL: "images/iphone12.jpg", price: 30990.0 },
    { name: "iPhone 14", imageURL: "images/iphone14.jpg", price: 38990.99 },
    { name: "iPhone XR", imageURL: "images/iphonexr.jpg", price: 38990.99 },
    {
        name: "iPhone 14 Pro",
        imageURL: "images/iphone14pro.avif",
        price: 54990.99,
    },
    { name: "iPhone 15", imageURL: "images/iphone15.jpg", price: 56990.99 },
    { name: "iPhone 13", imageURL: "images/iphone13.jpg", price: 50990.99 },
];

// Array to store items added to the shopping cart
const shoppingCart = [];

// Get references to the product container and cart
const productContainer = document.querySelector(".product-container");
const cart = document.querySelector(".cart");
const addToCartButton = document.getElementsByClassName("add-to-cart");

// Function to add a product to the product list
function addProduct(product) {
    let productItem = document.createElement("article");
    productItem.className = "product-item";

    // Set the inner HTML with product details (image, name, price, and button)
    productItem.innerHTML = `
        <img src="${product.imageURL}" />
        <h3>${product.name}</h3>
        <div>
            <button class="add-to-cart">Add to Cart</button>
            <p class="price">₱ ${product.price.toFixed(2)}</p>
        </div>
    `;

    // Append the product to the product container
    productContainer.append(productItem);
}

// Function to add an item to the cart display
function addToCart(item) {
    let cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    // Set the inner HTML with cart item details
    cartItem.innerHTML = `
        <img src="${item.imageURL}" />
        <div>
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
        </div>
    `;

    // Append the item to the cart container
    cart.append(cartItem);

    // Update the total price in the cart
    document.querySelector(
        ".total-price"
    ).textContent = `₱ ${calculateTotalPrice()}`;
}

// Function to calculate the total price of items in the cart
function calculateTotalPrice() {
    let price = shoppingCart.reduce(
        (total, item) => total + parseFloat(item.price.substring(1)),
        0
    );

    return price.toFixed(2);
}

// Add all products to the product container
products.forEach((product) => {
    addProduct(product);
});

// Event listener for adding items to the cart
productContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        let buttonParent = event.target.parentElement;
        let productItem = buttonParent.parentElement;

        let name = productItem.querySelector("h3");
        let image = productItem.querySelector("img");
        let price = productItem.querySelector(".price");

        shoppingCart.push({
            name: name.textContent,
            imageURL: image.getAttribute("src"),
            price: price.textContent,
        });

        // Clear the current cart display before updating it
        document.querySelectorAll(".cart > div").forEach((child) => {
            child.remove();
        });

        // Add each item in the shopping cart to the cart display
        shoppingCart.forEach((item) => {
            addToCart(item);
        });
    }
});