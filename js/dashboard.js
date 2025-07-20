docReady(() => {
    checkAuth();
    setupLogout();
    initUserData();
    showWelcomeBonus();
    initPackageModals();
    
    // Check and add daily earnings
    const earningsAdded = addDailyEarnings();
    if (earningsAdded) {
        initUserData(); // Refresh data if earnings were added
    }
});
