// sessionCheck.js

// Check user session via AJAX
function checkUserSession(userTypeRequired, redirectIfNotMatch = 'unauthorized.html') {
    fetch('sessionCheck.php')
        .then(response => response.json())
        .then(data => {

            console.log(data);  // <-- This will log the entire JSON response to the console
            if (data.status === 'not_logged_in') {
                // Redirect to the sign-in page if not logged in
                window.location.href = redirectIfNotMatch;
            } else if (data.user_type !== userTypeRequired) {
                // If logged in but not the required user type, redirect to a different page
                window.location.href = redirectIfNotMatch;
            }
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Check user session via AJAX
    fetch('sessionCheck.php')
        .then(response => response.json())
        .then(data => {
            const authSection = document.getElementById('authSection');

            if (data.status === 'logged_in') {
                // User is logged in, replace sign-in button with user icon
                authSection.innerHTML = `
                    <div class="userOn">
                        <img src="./Images/usuario.png" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;">
                    </div>
                `;
            }
        })
        .catch(error => console.error('Error:', error));
});