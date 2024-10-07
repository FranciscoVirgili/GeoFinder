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
    // Check user session and handle logout
    function checkSessionAndHandleLogout() {
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

                    // Set user information in the modal
                    const userInfo = document.querySelector('.user-info');
                    userInfo.querySelector('h3').innerText = `${data.user_firstName} ${data.user_lastName}`;
                }

                // Handle logout
                const logoutLink = document.querySelector('.sub-menu-link:last-child'); // Select the last link in the submenu
                logoutLink.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior

                    fetch('logout.php')
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'success') {
                                // Redirect to the sign-in page or home page
                                window.location.href = 'signin.html'; // Change this to your desired redirect page
                            }
                        })
                        .catch(error => console.error('Error during logout:', error));
                });
            })
            .catch(error => console.error('Error during session check:', error));
    }

    // Call the function to check the session and handle logout
    checkSessionAndHandleLogout();
});
