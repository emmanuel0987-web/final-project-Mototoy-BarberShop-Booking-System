// Redirect if not logged in
if (localStorage.getItem("isAdminLoggedIn") !== "true") {
  window.location.href = "admin.html";
}

function logoutAdmin() {
  localStorage.removeItem("isAdminLoggedIn");
  window.location.href = "Homepage.html";
}

// Fetch data from /appointments endpoint
fetch('/appointments')
  .then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  })
  .then(data => {
    const tableBody = document.querySelector('#bookingsTable tbody');
    tableBody.innerHTML = '';

    data.forEach(booking => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${booking.name}</td>
        <td>${booking.date}</td>
        <td>${booking.service}</td>
        <td>${booking.timeSlot || ''}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(err => {
    console.error('Error fetching appointments:', err);
    alert('Failed to load bookings. Please try again later.');
  });
