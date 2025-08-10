// GGB Broadband Services - Complete Application Logic
let currentUser = null;
let customers = [];
let packages = [
    { id: 1, name: "Basic", price: 200, description: "50+ Local Channels", features: ["News", "Free To Air"], status: "active" },
    { id: 2, name: "Standard", price: 400, description: "100+ Channels", features: ["Entertainment", "Movies"], status: "active" },
    { id: 3, name: "Premium", price: 600, description: "200+ Channels", features: ["International", "4K"], status: "active" },
    { id: 4, name: "Sports", price: 800, description: "All Sports Channels", features: ["Live", "HD"], status: "active" }
];
let lcos = [
    { id: "LCO001", name: "Central Bangalore", region: "Central", status: "active" },
    { id: "LCO002", name: "South Bangalore", region: "South", status: "active" },
    { id: "LCO003", name: "North Bangalore", region: "North", status: "active" }
];
let users = [
    { id: 1, username: "admin", password: "admin123", role: "admin", lcoIds: ["ALL"], status: "active" },
    { id: 2, username: "user1", password: "pass1", role: "user", lcoIds: ["LCO001", "LCO002"], status: "active" },
    { id: 3, username: "user2", password: "pass2", role: "user", lcoIds: ["LCO003"], status: "active" }
];

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 GGB Broadband Services - Initializing...');
    initializeApp();
});

function initializeApp() {
    // Show loading screen briefly
    setTimeout(() => {
        hideLoadingScreen();
        setupEventListeners();
    }, 2000);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.getElementById('login-page').classList.remove('hidden');
    }, 500);
}

function setupEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Theme toggle
    loadTheme();
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        showMainApp();
        updateUIForUser();
        showToast('Welcome to GGB Broadband Services!', 'success');
    } else {
        showError('Invalid credentials. Please try again.');
    }
}

function showMainApp() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    
    // Set user info
    document.getElementById('current-user-name').textContent = currentUser.username;
    document.getElementById('current-user-role').textContent = 
        currentUser.role === 'admin' ? 'Administrator' : 'User';
    
    // Show dashboard
    showPage('dashboard');
    updateDashboard();
}

function updateUIForUser() {
    if (currentUser.role === 'admin') {
        document.body.classList.add('admin');
    } else {
        document.body.classList.remove('admin');
    }
}

function handleNavigation(e) {
    e.preventDefault();
    const page = e.currentTarget.dataset.page;
    showPage(page);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');
}

function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update header
        updatePageHeader(page);
        
        // Load page-specific content
        switch(page) {
            case 'dashboard':
                updateDashboard();
                break;
            case 'customers':
                loadCustomers();
                break;
            case 'payments':
                loadPayments();
                break;
            case 'packages':
                loadPackages();
                break;
            case 'lcos':
                loadLCOs();
                break;
            case 'users':
                loadUsers();
                break;
            case 'reports':
                loadReports();
                break;
        }
    }
}

function updatePageHeader(page) {
    const titles = {
        dashboard: 'Dashboard',
        customers: 'Customer Management',
        payments: 'Payment Management', 
        packages: 'Package Management',
        lcos: 'LCO Management',
        users: 'User Management',
        reports: 'Reports & Analytics',
        import: 'Customer Import'
    };
    
    document.getElementById('page-title').textContent = titles[page] || 'Dashboard';
    document.getElementById('breadcrumb-text').textContent = `Home / ${titles[page] || 'Dashboard'}`;
}

function updateDashboard() {
    // Filter customers based on user access
    const accessibleCustomers = getAccessibleCustomers();
    
    // Update stats
    document.getElementById('total-customers').textContent = accessibleCustomers.length;
    
    const totalRevenue = accessibleCustomers.reduce((sum, customer) => {
        return sum + (customer.payments?.reduce((paySum, payment) => 
            paySum + (payment.paymentStatus === 'Paid' ? payment.amount : 0), 0) || 0);
    }, 0);
    
    document.getElementById('total-revenue').textContent = `₹${totalRevenue.toLocaleString()}`;
    
    const pendingPayments = accessibleCustomers.filter(customer => 
        customer.payments?.some(payment => payment.paymentStatus !== 'Paid')
    ).length;
    
    document.getElementById('pending-payments').textContent = pendingPayments;
    document.getElementById('active-packages').textContent = packages.filter(p => p.status === 'active').length;
}

function getAccessibleCustomers() {
    if (currentUser.role === 'admin') {
        return customers;
    } else {
        return customers.filter(customer => currentUser.lcoIds.includes(customer.lcoId));
    }
}

function loadCustomers() {
    const accessibleCustomers = getAccessibleCustomers();
    const tbody = document.getElementById('customers-table-body');
    
    if (accessibleCustomers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No customers found</td></tr>';
        return;
    }
    
    tbody.innerHTML = accessibleCustomers.map(customer => `
        <tr>
            <td>${customer.customerName}</td>
            <td>${customer.phoneNumber}</td>
            <td>${customer.stbId}</td>
            <td>${customer.pack}</td>
            <td>${customer.lcoId}</td>
            <td><span class="status-badge status-${customer.status}">${customer.status}</span></td>
            <td>
                <button class="btn-sm btn-secondary" onclick="editCustomer(${customer.id})">Edit</button>
                <button class="btn-sm btn-outline" onclick="viewCustomer(${customer.id})">View</button>
            </td>
        </tr>
    `).join('');
}

function loadPackages() {
    const packagesGrid = document.getElementById('packages-grid');
    
    packagesGrid.innerHTML = packages.map(pkg => `
        <div class="package-card">
            <div class="package-header">
                <div>
                    <div class="package-name">${pkg.name}</div>
                    <div class="package-price">₹${pkg.price}</div>
                </div>
                <span class="status-badge status-${pkg.status}">${pkg.status}</span>
            </div>
            <div class="package-description">${pkg.description}</div>
            <ul class="package-features">
                ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="package-actions">
                <button class="btn-sm btn-secondary" onclick="editPackage(${pkg.id})">Edit</button>
                <button class="btn-sm btn-outline" onclick="deletePackage(${pkg.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadLCOs() {
    const tbody = document.getElementById('lcos-table-body');
    
    tbody.innerHTML = lcos.map(lco => `
        <tr>
            <td>${lco.id}</td>
            <td>${lco.name}</td>
            <td>${lco.region}</td>
            <td><span class="status-badge status-${lco.status}">${lco.status}</span></td>
            <td>${customers.filter(c => c.lcoId === lco.id).length}</td>
            <td>
                <button class="btn-sm btn-secondary" onclick="editLCO('${lco.id}')">Edit</button>
                <button class="btn-sm btn-outline" onclick="deleteLCO('${lco.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Theme management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ggb-theme', newTheme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('ggb-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }
}

// Toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showError(message) {
    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
}

function logout() {
    currentUser = null;
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
    
    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    showToast('Logged out successfully', 'success');
}

// Placeholder functions for features to be implemented
function showAddCustomerModal() {
    showToast('Add Customer feature - UI ready for backend integration', 'info');
}

function showAddPaymentModal() {
    showToast('Add Payment feature - UI ready for backend integration', 'info');
}

function showAddPackageModal() {
    showToast('Add Package feature - UI ready for backend integration', 'info');
}

function showAddLCOModal() {
    showToast('Add LCO feature - UI ready for backend integration', 'info');
}

function showAddUserModal() {
    showToast('Add User feature - UI ready for backend integration', 'info');
}

function editCustomer(id) {
    showToast(`Edit Customer ${id} - UI ready for backend integration`, 'info');
}

function editPackage(id) {
    showToast(`Edit Package ${id} - UI ready for backend integration`, 'info');
}

function editLCO(id) {
    showToast(`Edit LCO ${id} - UI ready for backend integration`, 'info');
}

function deletePackage(id) {
    showToast(`Delete Package ${id} - UI ready for backend integration`, 'warning');
}

function deleteLCO(id) {
    showToast(`Delete LCO ${id} - UI ready for backend integration`, 'warning');
}

function loadPayments() {
    showToast('Payment Management - UI ready for backend integration', 'info');
}

function loadUsers() {
    showToast('User Management - UI ready for backend integration', 'info');
}

function loadReports() {
    showToast('Reports & Analytics - UI ready for backend integration', 'info');
}

function generateReport() {
    showToast('Report Generation - UI ready for backend integration', 'info');
}

console.log('✅ GGB Broadband Services - Application loaded successfully');
