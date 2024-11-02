document.getElementById('registerLink').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'flex';
  });
  
  document.getElementById('loginLink').addEventListener('click', function() {
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'flex';
  });