async function fetchOriginalPrice(selectedItemText) {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // Find the object with a matching substring in ucValue
        const item = data.find(entry => selectedItemText.includes(entry.ucValue));
        if (item) {
            return parseFloat(item.originalPrice); // Return the matched original price
        } else {
            console.error('No matching UC value found in selected item text.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching original price:', error);
        return null;
    }
}

async function showModal() {
    // Retrieve the selected item text
    const selectedItemText = document.getElementById('selected-item').textContent.trim();

    if (!selectedItemText) {
        console.error('No text found in selected item.');
        return;
    }

    const originalPrice = await fetchOriginalPrice(selectedItemText);

    if (originalPrice !== null) {
        // Retrieve the quantity
        const quantityText = document.querySelector('.quantity').textContent.trim();
        const quantity = parseInt(quantityText, 10);

        if (isNaN(quantity) || quantity <= 0) {
            console.error('Invalid quantity value:', quantityText);
            alert('Quantity is not valid.');
            return;
        }

        // Retrieve the current price from the document
        const currentPriceText = document.getElementById('total-price').textContent.trim();
        const match = currentPriceText.match(/[\d.]+/); // Matches numbers with optional decimals
        const currentPrice = match ? parseFloat(match[0]) : NaN;

        if (isNaN(currentPrice)) {
            console.error('Invalid current price value:', currentPriceText);
            alert('Current price could not be extracted.');
            return;
        }

        // Calculate total original price and discount
        const totalOriginalPrice = originalPrice * quantity;
        const discount = (totalOriginalPrice - currentPrice).toFixed(2);

        // Update the modal content
        document.getElementById('originalPrice').textContent = `BTN ${totalOriginalPrice.toFixed(2)}`;
        document.getElementById('discount').textContent = `BTN ${discount}`;
        document.getElementById('currentPrice').textContent = `BTN ${currentPrice.toFixed(2)}`; // Ensure current price is updated

        // Show the modal and overlay
        document.getElementById('discountModal').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.body.classList.add('no-scroll'); // Prevent scrolling
    } else {
        alert('Original price not available for the selected item');
    }
}


function closeModal() {
    document.getElementById('discountModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.body.classList.remove('no-scroll');
}


function checkSelectedItem() {
    const selectedItemElement = document.getElementById('selected-item');
    const savingsPriceElement = document.querySelector('.savings-price');

    // Ensure the required elements exist
    if (!selectedItemElement || !savingsPriceElement) {
        console.error('Required elements (#selected-item or .savings-price) are missing in the DOM.');
        return;
    }

    const selectedItemText = selectedItemElement.textContent.trim();

    // Toggle visibility using a class
    if (selectedItemText === "No item selected") {
        savingsPriceElement.classList.add('hidden');
    } else {
        savingsPriceElement.classList.remove('hidden');
    }
}

// Monitor clicks on product cards to trigger the check
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        setTimeout(checkSelectedItem, 50); // Small delay to ensure selected item updates
    });
});

// Call the function once on page load to check the initial state
document.addEventListener('DOMContentLoaded', checkSelectedItem);