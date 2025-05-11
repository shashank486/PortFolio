// Get references to the form and the status message div
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Add event listener for form submission
contactForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    // Get the form data
    const formData = new FormData(contactForm);

    // Display a "Sending..." message
    formStatus.innerHTML = '<p style="color: #ccc;">Sending...</p>';
    formStatus.style.display = 'block'; // Make sure it's visible

    // Use the Fetch API to send the data to Formspree
    fetch(contactForm.action, {
        method: contactForm.method, // Use the method specified in HTML (POST)
        body: formData,            // Send the form data
        headers: {
            'Accept': 'application/json' // Tell Formspree you accept JSON response
        }
    })
    .then(response => {
        // Check if the submission was successful (status code 2xx)
        if (response.ok) {
            // Display success message
            formStatus.innerHTML = '<p style="color: #4CAF50;">Thanks for your message! I\'ll get back to you soon.</p>';
            // Optionally, clear the form fields
            contactForm.reset();
        } else {
            // If not successful, try to parse the error response from Formspree
            response.json().then(data => {
                let errorMessage = "Oops! There was a problem submitting your form.";
                if (data && data.errors) {
                     // Construct a more specific error message if possible
                    errorMessage = data.errors.map(error => error.message).join(', ');
                }
                formStatus.innerHTML = `<p style="color: #f44336;">${errorMessage}</p>`;
            }).catch(error => {
                // Fallback error message if parsing fails
                 formStatus.innerHTML = '<p style="color: #f44336;">Oops! There was a problem submitting your form. Please try again.</p>';
            });
        }
    })
    .catch(error => {
        // Handle network errors (e.g., user is offline)
        console.error('Network error:', error);
        formStatus.innerHTML = '<p style="color: #f44336;">Network error. Please check your connection and try again.</p>';
    });
});

// Hamburger
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
  
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  
    document.querySelectorAll('#nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  });
  