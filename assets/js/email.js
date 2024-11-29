
// Initialize Email.js with your public key
emailjs.init('aKznCAelwsZEc1Mfs')
// Define sendEmail function
function sendEmail(event) {
	event.preventDefault();  // Prevent the default form submissio
	// Collect form values
	const templateParams = {
		from_name: document.getElementById('name').value,
		from_email: document.getElementById('email').value,
		message: document.getElementById('message').value,
	}
	// Send email using Email.js
	emailjs.send('service_ls3hfck', 'template_4gpghbo', templateParams)
		.then((response) => {
			console.log('SUCCESS!', response.status, response.text);
			alert('Message sent successfully!');
		})
		.catch((error) => {
			console.log('FAILED...', error);
			alert('Oops! Something went wrong. Please try again.');
		});

        // Add event listener to the form for submission
        document.getElementById('contact-form').addEventListener('submit', sendEmail);
    }