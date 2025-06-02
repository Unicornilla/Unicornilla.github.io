const form = document.getElementById('signupForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Reset styles
  form.classList.remove('shake');
  message.textContent = '';
  message.style.color = '#e74c3c';

  // Validate fields
  if (!name || !email || !password || !confirmPassword) {
    form.classList.add('shake');
    message.textContent = "Please fill in all fields.";
    return;
  }

  if (password !== confirmPassword) {
    form.classList.add('shake');
    message.textContent = "Passwords do not match.";
    return;
  }

  // Success!
  message.style.color = 'green';
  message.textContent = "Account created successfully!";
  form.reset();

  // Optional: fade out the message after a few seconds
  setTimeout(() => {
    message.classList.add('fade-out');
  }, 2000);
});
