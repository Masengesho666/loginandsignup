// Base URL of the backend API
const API_URL = "http://localhost:5000/api";

// ------------------ REGISTER ------------------

// Get the register button from the DOM
const registerBtn = document.getElementById("registerBtn");

// Check if the register button exists to avoid errors
if (registerBtn) {
  // Add a click event listener to the register button
  registerBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get the email and password values from input fields and trim whitespace
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Simple validation: if email or password is empty, show an alert
    if (!email || !password) return alert("Email and password are required");

    try {
      // Send a POST request to the backend to register the user
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST", // HTTP method
        headers: { "Content-Type": "application/json" }, // JSON content type
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      // Parse the JSON response
      const data = await res.json();

      // Show a message from the server (success or error)
      alert(data.message);

      // If registration is successful, redirect to login page
      if (res.ok) window.location.href = "login.html";
    } catch (err) {
      console.error(err); // Log error in console
      alert("Server error"); // Show generic error to user
    }
  });
}

// ------------------ LOGIN ------------------

// Get the login button from the DOM
const loginBtn = document.getElementById("loginBtn");

// Check if login button exists
if (loginBtn) {
  // Add a click event listener to the login button
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent form submission

    // Get email and password values from input fields
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate input
    if (!email || !password) return alert("Email and password are required");

    try {
      // Send POST request to login endpoint
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Parse JSON response
      const data = await res.json();

      // If login failed, show server message
      if (!res.ok) return alert(data.message);

      // Store JWT token in local storage for authenticated requests
      localStorage.setItem("token", data.token);

      // Redirect to dashboard page
      window.location.href = "dashboard.html";
    } catch (err) {
      console.error(err); // Log error
      alert("Server error"); // Show generic error
    }
  });
}

// ------------------ DASHBOARD ------------------

// Get the add name button
const addNameBtn = document.getElementById("addNameBtn");

// If the button exists, attach event listeners
if (addNameBtn) {
  addNameBtn.addEventListener("click", addName); // Add new name
  document.getElementById("logoutBtn")?.addEventListener("click", logout); // Logout button
  window.addEventListener("DOMContentLoaded", loadNames); // Load names when page is loaded
}

// ------------------ HELPER ------------------

// Helper function to get token from localStorage
function getToken() {
  return localStorage.getItem("token"); // Returns JWT token
}

// ------------------ LOAD NAMES ------------------

// Load names from backend and display them
async function loadNames() {
  const token = getToken(); // Get JWT token
  if (!token) return (window.location.href = "login.html"); // Redirect if not logged in

  try {
    // Fetch names from API with authorization header
    const res = await fetch(`${API_URL}/names`, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to load names"); // Throw error if fetch fails

    const names = await res.json(); // Parse response JSON
    const ul = document.getElementById("namesList"); // Get the list element
    ul.innerHTML = ""; // Clear current list

    // Loop through names and create list items
    names.forEach((n) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center p-2 border rounded"; // Tailwind CSS styles

      // Create span for name text
      const text = document.createElement("span");
      text.textContent = `${n.firstName} ${n.lastName || ""}`; // Display full name
      li.appendChild(text);

      // Create div for edit/delete buttons
      const actions = document.createElement("div");
      actions.className = "flex gap-2";

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "bg-yellow-400 text-white px-2 py-1 rounded";
      editBtn.addEventListener("click", () => editName(n._id, n.firstName, n.lastName));
      actions.appendChild(editBtn);

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "bg-red-500 text-white px-2 py-1 rounded";
      delBtn.addEventListener("click", () => deleteName(n._id));
      actions.appendChild(delBtn);

      li.appendChild(actions); // Append actions to li
      ul.appendChild(li); // Append li to ul
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load names"); // Show error if request fails
  }
}

// ------------------ ADD NAME ------------------

// Function to add a new name
async function addName(e) {
  e.preventDefault(); // Prevent default form submission

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const token = getToken(); // Get token

  if (!token) return (window.location.href = "login.html"); // Redirect if not logged in
  if (!firstName) return alert("First name is required"); // Validate input

  try {
    // Send POST request to add new name
    const res = await fetch(`${API_URL}/names`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    if (!res.ok) throw new Error("Failed to add name"); // Throw error if failed

    // Clear input fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";

    // Reload names list
    loadNames();
  } catch (err) {
    console.error(err);
    alert("Server error"); // Show error
  }
}

// ------------------ EDIT & DELETE ------------------

// Edit name: prompts user to edit first and last name
function editName(id, firstName, lastName) {
  const newFirst = prompt("Edit First Name", firstName); // Prompt for first name
  if (newFirst === null) return; // Cancel if user presses cancel
  const newLast = prompt("Edit Last Name", lastName || ""); // Prompt for last name
  updateName(id, newFirst, newLast); // Call update function
}

// Update name on backend
async function updateName(id, firstName, lastName) {
  const token = getToken(); // Get JWT token
  try {
    // Send PUT request to update name
    const res = await fetch(`${API_URL}/names/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    if (!res.ok) throw new Error("Failed to update"); // Throw error if failed
    loadNames(); // Reload list
  } catch (err) {
    console.error(err);
    alert("Server error"); // Show error
  }
}

// Delete name from backend
async function deleteName(id) {
  if (!confirm("Are you sure?")) return; // Ask for confirmation
  const token = getToken(); // Get JWT token
  try {
    // Send DELETE request
    const res = await fetch(`${API_URL}/names/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to delete"); // Throw error if failed
    loadNames(); // Reload list
  } catch (err) {
    console.error(err);
    alert("Server error"); // Show error
  }
}

// ------------------ LOGOUT ------------------

// Logout user: remove token and redirect to login
function logout(e) {
  e?.preventDefault(); // Prevent default action if event exists
  localStorage.removeItem("token"); // Remove token from storage
  window.location.href = "login.html"; // Redirect to login
}
