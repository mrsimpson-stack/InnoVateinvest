docReady(() => {
    checkAuth();
    setupLogout();
    initUserData();
    initTransactionsTable();
    setupTransactionFilters();
});
