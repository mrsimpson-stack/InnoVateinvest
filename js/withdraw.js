docReady(() => {
    checkAuth();
    setupLogout();
    initUserData();
    initWithdrawalMethodToggle();
    
    const withdrawForm = document.getElementById('withdraw-form');
    const withdrawNotice = document.getElementById('withdraw-notice');
    
    if (withdrawForm) {
        withdrawNotice.style.display = 'none';
        
        withdrawForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amount = parseInt(document.getElementById('withdraw-amount').value);
            const method = document.getElementById('withdraw-method').value;
            const phone = document.getElementById('withdraw-phone').value;
            const bankName = document.getElementById('bank-name').value;
            const accountNumber = document.getElementById('account-number').value;
            const accountName = document.getElementById('account-name').value;
            
            if (amount < 10000) {
                alert('Minimum withdrawal amount is $10,000');
                return;
            }
            
            // Get current user
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const users = JSON.parse(localStorage.getItem('users'));
            
            if (amount > user.balance) {
                alert('Insufficient balance');
                return;
            }
            
            // Create transaction
            const transaction = {
                id: Date.now().toString(),
                type: 'withdrawal',
                amount,
                method,
                date: new Date().toISOString(),
                status: 'pending',
                reference: `WDL-${Date.now()}`,
                details: method === 'bank' ? 
                    { bankName, accountNumber, accountName } : 
                    { phone }
            };
            
            // Update user data (balance will be updated when admin approves)
            user.transactions = user.transactions || [];
            user.transactions.unshift(transaction);
            
            // Update users array
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                users[userIndex] = user;
            }
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(users));
            
            // Show notice
            withdrawForm.style.display = 'none';
            withdrawNotice.style.display = 'block';
            
            // Redirect after 5 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 5000);
        });
    }
});
