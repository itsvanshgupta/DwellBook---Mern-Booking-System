// Simple authentication test
console.log('=== Authentication Test ===');

// Test localStorage
localStorage.setItem('token', 'mock-token');
localStorage.setItem('mockUser', JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    role: 'guest'
}));

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('mockUser') || '{}');

console.log('Token:', token);
console.log('User:', user);

// Test if authentication data persists
console.log('Authentication should work:', token && user.email ? 'YES' : 'NO');

// Clear test
localStorage.removeItem('token');
localStorage.removeItem('mockUser');
console.log('Test data cleared');
