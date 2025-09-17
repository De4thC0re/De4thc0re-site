// Pobranie liczby repozytoriów i wyświetlenie jako "Projekty"
fetch('https://api.github.com/users/De4thC0re/repos')
  .then(response => response.json())
  .then(data => {
    const count = data.length; // liczba repo publicznych
    document.getElementById('repo-count').textContent = count;
  })
  .catch(err => {
    console.error('Błąd pobierania repo:', err);
    document.getElementById('repo-count').textContent = 'Nie udało się pobrać';
  });