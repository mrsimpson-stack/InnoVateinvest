// Updated auth.js
docReady(() => {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Tab switching - fixed implementation
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    function switchToLogin() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    }

    function switchToRegister() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    if (loginTab && registerTab) {
        loginTab.addEventListener('click', (e) => {
            e.preventDefault();
            switchToLogin();
        });

        registerTab.addEventListener('click', (e) => {
            e.preventDefault();
            switchToRegister();
        });
    }

    // Register form submission - fixed
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const phone = document.getElementById('register-phone').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Validate inputs
            const errorElement = document.getElementById('register-error');
            const successElement = document.getElementById('register-success');
            
            errorElement.textContent = '';
            successElement.textContent = '';
            
            if (!name || !email || !phone || !password || !confirmPassword) {
                errorElement.textContent = 'All fields are required';
                return;
            }
            
            if (password !== confirmPassword) {
                errorElement.textContent = 'Passwords do not match';
                return;
            }
            
            if (password.length < 6) {
                errorElement.textContent = 'Password must be at least 6 characters';
                return;
            }
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);
            
            if (userExists) {
                errorElement.textContent = 'User with this email already exists';
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
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // Show success message
            successElement.textContent = 'Registration successful! Redirecting...';
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    }

    // Login form submission - fixed
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            // Validate inputs
            const errorElement = document.getElementById('login-error');
            
            errorElement.textContent = '';
            
            if (!email || !password) {
                errorElement.textContent = 'Email and password are required';
                return;
            }
            
            // Check user credentials
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);
            
            if (!user) {
                errorElement.textContent = 'Invalid email or password';
                return;
            }
            
            // Update last login
            user.lastLogin = new Date().toISOString();
            
            // Set current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Update users array with last login
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                users[userIndex] = user;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
});
