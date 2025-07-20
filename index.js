<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InvestPro - Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="css/auth.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-header">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                <span>InvestPro</span>
            </div>
            <p class="tagline">Grow your wealth with smart investments</p>
        </div>
        
        <div class="auth-card">
            <!-- Login Form (Default) -->
            <div class="auth-form active" id="login-form">
                <h2>Welcome Back</h2>
                <p class="form-subtitle">Sign in to your account</p>
                
                <form id="loginForm">
                    <div class="form-group">
                        <label for="loginEmail">Email Address</label>
                        <div class="input-with-icon">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="loginEmail" placeholder="Enter your email" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <div class="input-with-icon">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="loginPassword" placeholder="Enter your password" required>
                            <i class="fas fa-eye toggle-password" data-target="loginPassword"></i>
                        </div>
                    </div>
                    
                    <div class="form-options">
                        <label class="remember-me">
                            <input type="checkbox"> Remember me
                        </label>
                        <a href="#" class="forgot-password">Forgot password?</a>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                    </button>
                    
                    <div class="auth-footer">
                        Don't have an account? <a href="#" id="showRegister">Sign up</a>
                    </div>
                </form>
            </div>
            
            <!-- Register Form -->
            <div class="auth-form" id="register-form">
                <h2>Create Account</h2>
                <p class="form-subtitle">Start your investment journey</p>
                
                <form id="registerForm">
                    <div class="form-group">
                        <label for="registerName">Full Name</label>
                        <div class="input-with-icon">
                            <i class="fas fa-user"></i>
                            <input type="text" id="registerName" placeholder="Enter your full name" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="registerEmail">Email Address</label>
                        <div class="input-with-icon">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="registerEmail" placeholder="Enter your email" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="registerPhone">Phone Number</label>
                        <div class="input-with-icon">
                            <i class="fas fa-phone"></i>
                            <input type="tel" id="registerPhone" placeholder="Enter your phone number" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="registerPassword">Password</label>
                        <div class="input-with-icon">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="registerPassword" placeholder="Create a password" required>
                            <i class="fas fa-eye toggle-password" data-target="registerPassword"></i>
                        </div>
                        <div class="password-strength">
                            <div class="strength-meter"></div>
                            <span class="strength-text">Weak</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="registerConfirmPassword">Confirm Password</label>
                        <div class="input-with-icon">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="registerConfirmPassword" placeholder="Confirm your password" required>
                            <i class="fas fa-eye toggle-password" data-target="registerConfirmPassword"></i>
                        </div>
                    </div>
                    
                    <div class="form-group terms">
                        <input type="checkbox" id="agreeTerms" required>
                        <label for="agreeTerms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-user-plus"></i> Create Account
                    </button>
                    
                    <div class="auth-footer">
                        Already have an account? <a href="#" id="showLogin">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="auth-message" id="authMessage"></div>
    </div>

    <script src="js/auth.js"></script>
</body>
</html>
