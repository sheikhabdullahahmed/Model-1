document.addEventListener('DOMContentLoaded', (event) => {
  const user = localStorage.getItem('user');
  if (user) {
    document.getElementById('chk').checked = true;
  }
});



let sign = document.getElementById("sign");
sign.addEventListener("click", () => {
  location.href = "index.html";
});



function Signup() {
  let username = document.getElementById('suser').value;
  let email = document.getElementById('semail').value;
  let password = document.getElementById('spass').value;
  let confirmPassword = document.getElementById('pass2').value;

  if (username === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Please fill all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  let user = {
    username: username,
    email: email,
    password: password
  };

  localStorage.setItem('user', JSON.stringify(user));

  alert("Signup successful!");
  document.getElementById('chk').checked = true;
}

function login() {
  let email = document.getElementById('lemail').value;
  let password = document.getElementById('lpass').value;
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email === email && user.password === password) {
    alert("Login successful!");
    window.location.href = "card.html"; // Redirect to card.html after successful login
  } else {
    alert("Invalid email or password.");
  }
}

function showSignupForm() {
  document.getElementById('chk').checked = false;
}

