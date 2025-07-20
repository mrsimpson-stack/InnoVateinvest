docReady(() => {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && window.location.pathname.includes('index.html')) {
        window.location.href = 'dashboard.html';
    }

    // Tab switching
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginTab && registerTab) {
        loginTab.addEventListener('click', (e) => {
            e.preventDefault();
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        registerTab.addEventListener('click', (e) => {
            e.preventDefault();
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }

    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Validate inputs
            const errorElement = document.getElementById('register-error');
            const successElement = document.getElementById('register-success');
            
            errorElement.textContent = '';
            successElement.textContent = '';
            
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
                password, // Note: In a real app, never store plain text passwords
                balance: 0,
                todayEarnings: 0,
                totalEarnings: 0,
                transactions: [],
                hasSeenWelcomeBonus: false,
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Show success message
            successElement.textContent = 'Registration successful! Please login.';
            
            // Clear form
            registerForm.reset();
            
            // Switch to login tab after 2 seconds
            setTimeout(() => {
                if (loginTab) loginTab.click();
            }, 2000);
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validate inputs
            const errorElement = document.getElementById('login-error');
            
            errorElement.textContent = '';
            
            // Check user credentials
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);
            
            if (!user) {
                errorElement.textContent = 'Invalid email or password';
                return;
            }
            
            // Set current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
});
