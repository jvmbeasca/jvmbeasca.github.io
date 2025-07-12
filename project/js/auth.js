// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize users array in localStorage if it doesn't exist
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Validate inputs
            if (!email || !password) {
                showAlert('Please fill in all fields.', 'danger');
                return;
            }

            // Check credentials
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users.find(u => u.email === email);
            
            if (!user) {
                showAlert('No account found with this email.', 'danger');
                return;
            }

            // In a real app, you would hash and compare passwords properly
            if (user.password !== password) {
                showAlert('Incorrect password.', 'danger');
                return;
            }

            // Login successful
            localStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }));

            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const pokemonGoCode = document.getElementById('pokemonGoCode').value.trim();
            const terms = document.getElementById('terms').checked;

            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPassword || !pokemonGoCode) {
                showAlert('Please fill in all required fields.', 'danger');
                return;
            }

            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address.', 'danger');
                return;
            }

            if (password.length < 8) {
                showAlert('Password must be at least 8 characters long.', 'danger');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('Passwords do not match.', 'danger');
                return;
            }

            if (!/^\d{12}$/.test(pokemonGoCode)) {
                showAlert('Please enter a valid 12-digit Pokémon GO account code.', 'danger');
                return;
            }

            if (!terms) {
                showAlert('You must agree to the Terms of Service.', 'danger');
                return;
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users'));
            if (users.some(user => user.email === email)) {
                showAlert('An account with this email already exists.', 'danger');
                return;
            }

            // Create new user (in production, password should be hashed)
            const newUser = {
                firstName,
                middleName: document.getElementById('middleName').value.trim(),
                lastName,
                gender: document.getElementById('gender').value,
                birthday: document.getElementById('birthday').value,
                email,
                password, // Note: In production, never store plain text passwords!
                pokemonGoCode,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Log the user in
            localStorage.setItem('currentUser', JSON.stringify({
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }));

            showAlert('Registration successful! Welcome to Pokémon GO Webstore.', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Check authentication status and update UI
    checkAuthStatus();
});

function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    const registerLinks = document.querySelectorAll('a[href="register.html"]');
    const accountDropdowns = document.querySelectorAll('.account-dropdown');

    if (currentUser) {
        // User is logged in
        loginLinks.forEach(link => {
            link.textContent = `${currentUser.firstName || 'My Account'}`;
            link.href = '#';
            link.setAttribute('data-bs-toggle', 'dropdown');
            link.classList.add('dropdown-toggle');
        });

        registerLinks.forEach(link => {
            link.style.display = 'none';
        });

        // Create dropdown menu
        accountDropdowns.forEach(dropdown => {
            dropdown.innerHTML = `
                <ul class="dropdown-menu">
                    <li><span class="dropdown-item-text">Logged in as ${currentUser.email}</span></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
                </ul>
            `;
        });

        // Add logout functionality
        document.querySelectorAll('#logoutBtn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                showAlert('You have been logged out.', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            });
        });
    } else {
        // User is not logged in
        loginLinks.forEach(link => {
            link.textContent = 'Login';
            link.href = 'login.html';
            link.removeAttribute('data-bs-toggle');
            link.classList.remove('dropdown-toggle');
        });

        registerLinks.forEach(link => {
            link.style.display = 'inline-block';
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.auth-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} auth-alert`;
    alertDiv.textContent = message;

    // Insert alert
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(alertDiv, form.firstChild);
    } else {
        document.body.insertBefore(alertDiv, document.body.firstChild);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}