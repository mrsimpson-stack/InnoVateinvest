docReady(() => {
    checkAuth();
    setupLogout();
    initUserData();
    initDepositMethodTabs();
    
    const depositForm = document.getElementById('deposit-form');
    const depositSuccess = document.getElementById('deposit-success');
    
    if (depositForm) {
        depositSuccess.style.display = 'none';
        
        depositForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amount = parseInt(document.getElementById('deposit-amount').value);
            const method = document.querySelector('.method-tab.active').dataset.method;
            const screenshot = document.getElementById('payment-screenshot').files[0];
            
            if (amount < 10000) {
                alert('Minimum deposit amount is $10,000');
                return;
            }
            
            // Get current user
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const users = JSON.parse(localStorage.getItem('users'));
            
            // Create transaction
            const transaction = {
                id: Date.now().toString(),
                type: 'deposit',
                amount,
                method,
                date: new Date().toISOString(),
                status: 'completed',
                reference: `DEP-${Date.now()}`
            };
            
            // Update user data
            user.balance = (user.balance || 0) + amount;
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
            
            // Show success message
            depositForm.style.display = 'none';
            depositSuccess.style.display = 'block';
            
            // Update dashboard after 3 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 3000);
        });
    }
});
