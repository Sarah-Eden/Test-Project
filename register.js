document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = registerForm.first_name.value;
        const lastName = registerForm.last_name.value;
        const email = registerForm.email.value;
        const confirmEmail = registerForm.confirm_email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirm_password.value;

        // Perform form validation
        if (validateEmail(email) && validatePassword(password) && email === confirmEmail && password === confirmPassword) {
            // Submit form data to the server
            const formData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            };

            console.log('Form submitted', formData);


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
