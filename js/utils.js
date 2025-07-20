// Utility functions used across the application

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
    return user ? JSON.parse(user) : null;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Logout function
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

// Initialize user data in dashboard
function initUserData() {
    const user = checkAuth();
    if (user) {
        // Update user name
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = user.name;
        }

        // Update last login
        const lastLoginElement = document.getElementById('last-login');
        if (lastLoginElement) {
            lastLoginElement.textContent = `Last login: ${formatDate(user.lastLogin || new Date())}`;
            // Update last login time
            user.lastLogin = new Date().toISOString();
            localStorage.setItem('currentUser', JSON.stringify(user));
        }

        // Update account balances
        updateAccountBalances(user);
    }
}

// Update account balances on dashboard
function updateAccountBalances(user) {
    const accountBalanceElement = document.getElementById('account-balance');
    const todayEarningsElement = document.getElementById('today-earnings');
    const totalEarningsElement = document.getElementById('total-earnings');

    if (accountBalanceElement) {
        accountBalanceElement.textContent = formatCurrency(user.balance || 0);
    }

    if (todayEarningsElement) {
        todayEarningsElement.textContent = formatCurrency(user.todayEarnings || 0);
    }

    if (totalEarningsElement) {
        totalEarningsElement.textContent = formatCurrency(user.totalEarnings || 0);
    }
}

// Show welcome bonus modal for new users
function showWelcomeBonus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && !user.hasSeenWelcomeBonus) {
        const bonusModal = document.getElementById('bonus-modal');
        if (bonusModal) {
            bonusModal.style.display = 'flex';
            
            // Close modal
            const closeModal = bonusModal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                bonusModal.style.display = 'none';
                user.hasSeenWelcomeBonus = true;
                localStorage.setItem('currentUser', JSON.stringify(user));
            });
            
            // Go to deposit button
            const gotoDeposit = document.getElementById('goto-deposit');
            if (gotoDeposit) {
                gotoDeposit.addEventListener('click', () => {
                    bonusModal.style.display = 'none';
                    user.hasSeenWelcomeBonus = true;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = 'deposit.html';
                });
            }
        }
    }
}

// Initialize package modals
function initPackageModals() {
    const packageButtons = document.querySelectorAll('.btn-package');
    const packageModal = document.getElementById('package-modal');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageCard = button.closest('.package-card');
            const packageName = packageCard.querySelector('h3').textContent;
            const packageAmount = packageCard.querySelector('.package-amount').textContent;
            const packageEarnings = packageCard.querySelector('.package-earnings').textContent;
            
            document.getElementById('package-modal-title').textContent = `${packageName} Package (${packageAmount}) - ${packageEarnings}`;
            
            if (packageModal) {
                packageModal.style.display = 'flex';
                
                // Close modal
                const closeModal = packageModal.querySelector('.close-modal');
                closeModal.addEventListener('click', () => {
                    packageModal.style.display = 'none';
                });
            }
        });
    });
}

// Calculate daily earnings based on deposit amount
function calculateDailyEarnings(depositAmount) {
    if (depositAmount >= 200000) return 25000;
    if (depositAmount >= 120000) return 17000;
    if (depositAmount >= 75000) return 12000;
    if (depositAmount >= 50000) return 7000;
    if (depositAmount >= 30000) return 4000;
    if (depositAmount >= 10000) return 2000;
    return 0;
}

// Add daily earnings to user's account
function addDailyEarnings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.balance > 0) {
        const lastEarningDate = user.lastEarningDate ? new Date(user.lastEarningDate) : new Date();
        const now = new Date();
        const hoursSinceLastEarning = (now - lastEarningDate) / (1000 * 60 * 60);
        
        if (hoursSinceLastEarning >= 24) {
            const dailyEarnings = calculateDailyEarnings(user.balance);
            user.balance += dailyEarnings;
            user.todayEarnings = dailyEarnings;
            user.totalEarnings = (user.totalEarnings || 0) + dailyEarnings;
            user.lastEarningDate = now.toISOString();
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
    }
    return false;
}

// Initialize transactions table
function initTransactionsTable() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const transactionsTable = document.getElementById('transactions-table');
    const noTransactions = document.getElementById('no-transactions');
    
    if (user && user.transactions && user.transactions.length > 0) {
        if (noTransactions) noTransactions.style.display = 'none';
        
        const tbody = transactionsTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        user.transactions.forEach(transaction => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${formatDate(transaction.date)}</td>
                <td><span class="transaction-type ${transaction.type}">${transaction.type}</span></td>
                <td>${formatCurrency(transaction.amount)}</td>
                <td><span class="status ${transaction.status}">${transaction.status}</span></td>
                <td>${transaction.reference || 'N/A'}</td>
            `;
            
            tbody.appendChild(row);
        });
    } else {
        if (transactionsTable) transactionsTable.style.display = 'none';
        if (noTransactions) noTransactions.style.display = 'block';
    }
}

// Filter transactions
function setupTransactionFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const type = button.dataset.type;
            filterTransactions(type);
        });
    });
}

function filterTransactions(type) {
    const rows = document.querySelectorAll('#transactions-table tbody tr');
    
    rows.forEach(row => {
        const rowType = row.querySelector('.transaction-type').textContent.toLowerCase();
        if (type === 'all' || rowType === type) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize withdrawal method toggle
function initWithdrawalMethodToggle() {
    const methodSelect = document.getElementById('withdraw-method');
    const phoneGroup = document.getElementById('phone-number-group');
    const bankGroup = document.getElementById('bank-details-group');
    
    if (methodSelect) {
        methodSelect.addEventListener('change', () => {
            const method = methodSelect.value;
            
            if (method === 'mtn' || method === 'airtel') {
                phoneGroup.style.display = 'block';
                bankGroup.style.display = 'none';
            } else if (method === 'bank') {
                phoneGroup.style.display = 'none';
                bankGroup.style.display = 'block';
            } else {
                phoneGroup.style.display = 'none';
                bankGroup.style.display = 'none';
            }
        });
    }
}

// Initialize deposit method tabs
function initDepositMethodTabs() {
    const tabButtons = document.querySelectorAll('.method-tab');
    const methodContents = document.querySelectorAll('.method-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const method = button.dataset.method;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding content
            methodContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${method}-method`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Document ready function
function docReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(fn, 1);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
    }
