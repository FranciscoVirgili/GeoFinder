// sessionCheck.js

// Check user session via AJAX
function checkUserSession(userTypeRequired, redirectIfNotMatch = 'not_authorized.html') {
    fetch('sessionCheck.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'not_logged_in') {
                // Redirect to the sign-in page if not logged in
                window.location.href = 'signin.html';
            } else if (data.user_type !== userTypeRequired) {
                // If logged in but not the required user type, redirect to a different page
                window.location.href = redirectIfNotMatch;
            }
        })
        .catch(error => console.error('Error:', error));
}
