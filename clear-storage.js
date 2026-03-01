// Clear Browser Storage Utility
// Run this script in your browser's developer console to clear localStorage and force the app to reload updated data

console.log('🔄 Clearing portfolio localStorage data...');

// Clear all portfolio-related localStorage
const keysToRemove = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key && key.includes('portfolio') || key === 'portfolio-store') {
    keysToRemove.push(key);
  }
}

keysToRemove.forEach(key => {
  localStorage.removeItem(key);
  console.log(`✅ Removed: ${key}`);
});

// Also clear any Zustand store data
localStorage.removeItem('portfolio-store');
localStorage.removeItem('store');

console.log('✨ Storage cleared! Refreshing page...');
console.log('📝 The app will now load fresh data from initial-data.json');

// Refresh the page to reload with fresh data
setTimeout(() => {
  window.location.reload();
}, 1000);
