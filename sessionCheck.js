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
