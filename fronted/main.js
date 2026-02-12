// Store backend base URL in a variable
const API_URL = "http://localhost:5000/api";

// Get the register button element by its ID
const registerBtn = document.getElementById("registerBtn");

// Check if the register button exists on this page
if (registerBtn) {

  // Add click event listener to the register button
  registerBtn.addEventListener("click", async (e) => {

    // Prevent default form submission (page reload)
    e.preventDefault();

    // Get email input value and remove extra spaces
    const email = document.getElementById("email").value.trim();

    // Get password input value and remove extra spaces
    const password = document.getElementById("password").value.trim();

    // Check if email or password is empty
    if (!email || !password)

      // Show alert if fields are missing
      return alert("Email and password are required");

    try {

      // Send request to backend register endpoint
      const res = await fetch(`${API_URL}/auth/register`, {

        // Set HTTP method to POST
        method: "POST",

        // Set request headers
        headers: {

          // Tell server data is JSON
          "Content-Type": "application/json"
        },

        // Convert JavaScript object to JSON string
        body: JSON.stringify({

          // Send email to backend
          email,

          // Send password to backend
          password
        }),
      });

      // Convert server response to JavaScript object
      const data = await res.json();

      // Show server message in alert
      alert(data.message);

      // If response status is OK (200–299)
      if (res.ok)

        // Redirect user to login page
        window.location.href = "login.html";

    } catch (err) {

      // Print error in browser console
      console.error(err);

      // Show error message
      alert("Server error");
    }
  });
}
