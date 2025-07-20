// Check if user is authenticated
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && !window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'dashboard.html';
    }
    return user;
}

// Initialize authentication forms
function initAuthForms() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorElement = document.getElementById('login-error');
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Set current user and last login time
                user.lastLogin = new Date().toISOString();
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Update users array
                const userIndex = users.findIndex(u => u.id === user.id);
                if (userIndex !== -1) {
                    users[userIndex] = user;
                    localStorage.setItem('users', JSON.stringify(users));
                }
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                errorElement.textContent = 'Invalid email or password';
            }
        });
    }
    
    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            const errorElement = document.getElementById('register-error');
            const successElement = document.getElementById('register-success');
            
            // Validate inputs
            errorElement.textContent = '';
            
            if (password !== confirmPassword) {
                errorElement.textContent = 'Passwords do not match';
                return;
            }
            
            if (password.length < 8) {
                errorElement.textContent = 'Password must be at least 8 characters';
                return;
            }
            
            // Check if user exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(u => u.email === email);
            
            if (userExists) {
                errorElement.textContent = 'Email already registered';
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                phone,
                password,
                balance: 0,
                todayEarnings: 0,
                totalEarnings: 0,
                transactions: [],
                hasSeenWelcomeBonus: false,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            // Save user
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // Show success and redirect
            successElement.textContent = 'Registration successful! Redirecting...';
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initAuthForms();
});