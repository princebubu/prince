document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    const selectedItem = document.getElementById('selected-item');
    const totalPrice = document.getElementById('total-price');
    const quantitySpan = document.querySelector('.quantity-controls .quantity');
    const decreaseBtn = document.querySelector('.quantity-controls .decrease');
    const increaseBtn = document.querySelector('.quantity-controls .increase');
    const summaryContainer = document.querySelector('.summary-container'); // Summary container for scrolling

    let selectedProduct = null;
    let quantity = 1;
    let price = 0;

    const updateSummary = () => {
        if (selectedProduct) {
            selectedItem.textContent = `Selected: ${selectedProduct}`;
            totalPrice.textContent = `BTN ${price * quantity}`;
        }
    };

    const isMobile = () => {
        return window.innerWidth <= 768; // Adjust breakpoint for mobile devices
    };

    // Handle product card click
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedProduct = card.querySelector('h2').textContent;
            price = parseInt(card.getAttribute('data-price'));
            quantity = 1; // Reset quantity for each new selection
            quantitySpan.textContent = quantity;
            updateSummary();

            if (isMobile()) {
                // Scroll to the summary container
                summaryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Handle increase quantity
    increaseBtn.addEventListener('click', () => {
        if (selectedProduct) {
            quantity++;
            quantitySpan.textContent = quantity;
            updateSummary();
        }
    });

    // Handle decrease quantity
    decreaseBtn.addEventListener('click', () => {
        if (selectedProduct && quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
            updateSummary();
        }
    });
});
