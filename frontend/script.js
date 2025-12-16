// STUDENT SUBMIT
function submitComplaint() {
  const message = document.getElementById("complaint").value;

  if (message.trim() === "") {
    alert("Please write a complaint.");
    return;
  }

  fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
  .then(() => {
    alert("Complaint submitted successfully!");
    document.getElementById("complaint").value = "";
  });
}

// FACULTY LOGIN
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // Save login session
      localStorage.setItem("facultyLoggedIn", "true");
      window.location.href = "admin.html";
    } else {
      alert("Invalid credentials");
    }
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("facultyLoggedIn");
  window.location.href = "login.html";
}
