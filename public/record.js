document.addEventListener("DOMContentLoaded", () => {
  // Check if admin is logged in
  if (localStorage.getItem("isAdminLoggedIn") !== "true") {
    window.location.href = "admin.html";
  }

  // Logout function
  window.logoutAdmin = function () {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "Homepage.html";
  };

  // Fetch and display appointments
  fetch('https://final-project-mototoy-barbershop-booking.onrender.com/appointments')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.querySelector('#bookingsTable tbody');
      tableBody.innerHTML = ''; // Clear existing rows

      if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" class="text-center">No bookings found.</td></tr>';
        return;
      }

      data.forEach(booking => {
        const row = document.createElement('tr');
        const formattedDate = new Date(booking.date).toLocaleDateString();
        row.innerHTML = `
          <td>${booking.name}</td>
          <td>${formattedDate}</td>
          <td>${booking.service}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching bookings:', error);
      const bookingsSection = document.getElementById('bookingsSection');
      bookingsSection.innerHTML += `
        <div class="alert alert-danger mt-3" role="alert">
          Failed to load booking data. Please try again later.
        </div>
      `;
    });
});
