document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        // Perform form validation and submission
        if (validateEmail(email) && validatePassword(password)) {
            // Redirect to a blank page
            window.location.href = 'AddNewCourse.html';
        }
    });
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    function validatePassword(password) {
        // Add your own password validation logic if needed
        return password.length >= 6;
    }
});






