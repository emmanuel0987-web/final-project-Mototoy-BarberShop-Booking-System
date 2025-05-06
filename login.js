// login.js

document.addEventListener("DOMContentLoaded", function () {
    const adminLoginForm = document.getElementById("adminLoginForm");
  
    adminLoginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("adminUsername").value;
      const password = document.getElementById("adminPassword").value;
  
      // Dummy credentials (replace with secure backend in production)
      const validUsername = "admin";
      const validPassword = "password123";
  
      if (username === validUsername && password === validPassword) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "AdminDashboard.html";
      } else {
        alert("Invalid username or password.");
      }
    });
  });
  