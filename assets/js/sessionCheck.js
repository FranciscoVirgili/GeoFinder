// sessionCheck.js

// Check user session via AJAX
function checkUserSession(userTypeRequired, redirectIfNotMatch = 'unauthorized.html') {
    fetch('sessionCheck.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Log the JSON response to the console
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

// Check user session and handle logout
function checkSessionAndHandleLogout() {
    // Check user session via AJAX
    fetch('sessionCheck.php')
        .then(response => response.json())
        .then(data => {
            // Wait until the auth section and modal are available in the DOM
            const authSection = document.getElementById('authSection');

            if (authSection && data.status === 'logged_in') {
                // User is logged in, replace sign-in button with user icon
                authSection.innerHTML = `
                    <div class="userOn">
                        <img src="assets/Images/usuario.png" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;">
                    </div>
                `;

                // Set user information in the modal
                const userInfo = document.querySelector('.user-info');
                if (userInfo) {
                    userInfo.querySelector('h3').innerText = `${data.user_firstName} ${data.user_lastName}`;
                }

                // Welcome message for the user
                const userWelcome = document.getElementById('welcomeUser');
                if (userWelcome) {
                    userWelcome.innerText = `Bienvenido, ${data.user_firstName} ${data.user_lastName}`; 
                }
            }

            // Handle logout
            const logoutLink = document.querySelector('.sub-menu-link:last-child'); // Select the last link in the submenu
            if (logoutLink) {
                logoutLink.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior

                    fetch('logout.php')
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'success') {
                                // Redirect to the sign-in page
                                window.location.href = 'signin.html'; // Change this to your desired redirect page
                            }
                        })
                        .catch(error => console.error('Error during logout:', error));
                });
            }
        })
        .catch(error => console.error('Error during session check:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Load the modal first, then check the session
    function loadModalAndCheckSession() {
        fetch('userModal.html')
            .then(response => response.text())
            .then(html => {
                // Load the modal into the DOM
                document.getElementById('modalContainer').innerHTML = html;

                // Once the modal is loaded, check the session and handle logout
                checkSessionAndHandleLogout();
            })
            .catch(error => console.error('Error loading modal:', error));
    }

    // Call the function to load the modal and then check the session
    loadModalAndCheckSession();
});
