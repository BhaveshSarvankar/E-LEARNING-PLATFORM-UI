// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate login (replace with actual API call)
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../dashboard.html';
    });
}

// Registration Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        if (document.getElementById('password').value !== 
            document.getElementById('confirmPassword').value) {
            alert('Passwords do not match!');
            return;
        }
        
        // Simulate registration
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../dashboard.html';
    });
}

// Check authentication status
function checkAuth() {
    if (localStorage.getItem('isLoggedIn') && 
        window.location.pathname.includes('auth/')) {
        window.location.href = '../dashboard.html';
    }
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '../index.html';
    });
}