window.onload = function() {
    // Check if the popup has been shown before
    if (!localStorage.getItem('popupShown')) {
        // If not, show the popup after 2 seconds
        setTimeout(function() {
            document.getElementById("popup").style.display = "block";
        }, 2000);  // Delay in ms (e.g., 2000ms = 2 seconds)

        // Mark that the popup has been shown
        localStorage.setItem('popupShown', 'true');
    }
};

// Close the popup when the button is clicked
function closePopup() {
    document.getElementById("popup").style.display = "none";
}