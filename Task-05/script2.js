document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    let cart = [];
    let allProducts = [];

    terminalInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            const command = terminalInput.value.trim();
            terminalInput.value = '';
            terminalOutput.innerHTML += `<div>$ ${command}</div>`;

            if (command === 'list') {
                allProducts = await fetch('https://fakestoreapi.com/products')
                    .then(response => response.json());
                terminalOutput.innerHTML += `<div>Product list:</div>`;
                allProducts.forEach((product, index) => {
                    terminalOutput.innerHTML += `<div>${index + 1}. ${product.title} - $${product.price}</div>`;
                });

            } else if (command.startsWith('details ')) {
                const productId = command.split(' ')[1];
                const product = await fetch(`https://fakestoreapi.com/products/${productId}`)
                    .then(response => response.json());
                terminalOutput.innerHTML += `<div>${product.title} - $${product.price}</div>`;
                terminalOutput.innerHTML += `<div>${product.description}</div>`;

            } else if (command === 'categories') {
                const categories = await fetch('https://fakestoreapi.com/products/categories')
                    .then(response => response.json());
                terminalOutput.innerHTML += `<div>Categories: ${categories.join(', ')}</div>`;

            } else if (command.startsWith('add ')) {
                const productId = command.split(' ')[1];
                const product = await fetch(`https://fakestoreapi.com/products/${productId}`)
                    .then(response => response.json());
                cart.push(product);
                terminalOutput.innerHTML += `<div>Added ${product.title} to your cart.</div>`;

            } else if (command.startsWith('remove ')) {
                const productId = command.split(' ')[1];
                const index = cart.findIndex(item => item.id == productId);
                if (index !== -1) {
                    const removedItem = cart.splice(index, 1);
                    terminalOutput.innerHTML += `<div>Removed ${removedItem[0].title} from your cart.</div>`;
                } else {
                    terminalOutput.innerHTML += `<div>Product not found in your cart.</div>`;
                }

            } else if (command === 'cart') {
                if (cart.length > 0) {
                    terminalOutput.innerHTML += `<div>Your Cart:</div>`;
                    cart.forEach(item => {
                        terminalOutput.innerHTML += `<div>${item.title} - $${item.price}</div>`;
                    });
                } else {
                    terminalOutput.innerHTML += `<div>Your cart is empty.</div>`;
                }

            } else if (command === 'jewelery') {
                const products = await fetch('https://fakestoreapi.com/products/category/jewelery')
                    .then(response => response.json());
                terminalOutput.innerHTML += `<div>Jewelry Products:</div>`;
                products.forEach((product, index) => {
                    terminalOutput.innerHTML += `<div>${index + 1}. ${product.title} - $${product.price}</div>`;
                });

            } else if (command === 'limit') {
                const products = await fetch('https://fakestoreapi.com/products?limit=5')
                    .then(response => response.json());
                terminalOutput.innerHTML += `<div>Top 5 Products:</div>`;
                products.forEach((product, index) => {
                    terminalOutput.innerHTML += `<div>${index + 1}. ${product.title} - $${product.price}</div>`;
                });

            } else if (command === 'clear') {
                terminalOutput.innerHTML = '';

            } else if (command.startsWith('search ')) {
                const searchTerm = command.split(' ').slice(1).join(' ');
                const filteredProducts = allProducts.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                terminalOutput.innerHTML += `<div>Search Results:</div>`;
                filteredProducts.forEach((product, index) => {
                    terminalOutput.innerHTML += `<div>${index + 1}. ${product.title} - $${product.price}</div>`;
                });

            } else if (command.startsWith('sort ')) {
                const sortBy = command.split(' ')[1];
                let sortedProducts = [...allProducts];
                if (sortBy === 'price') {
                    sortedProducts.sort((a, b) => a.price - b.price);
                } else if (sortBy === 'name') {
                    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                }
                terminalOutput.innerHTML += `<div>Sorted Products:</div>`;
                sortedProducts.forEach((product, index) => {
                    terminalOutput.innerHTML += `<div>${index + 1}. ${product.title} - $${product.price}</div>`;
                });
                terminalOutput.innerHTML += `<div>Products sorted by ${sortBy}.</div>`;

            } else if (command === 'buy') {
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = 'checkout.html';

            } else {
                terminalOutput.innerHTML += `<div>Unknown command: ${command}</div>`;
            }

            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    const productsGrid = document.querySelector('.products-grid');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p class="price">$${product.price}</p>
                    <button>Add to Cart</button>
                `;

                productsGrid.appendChild(productCard);
            });
        });
});
