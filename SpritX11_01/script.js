const supabaseUrl = "https://tdcssefktlozikfezgml.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY3NzZWZrdGxvemlrZmV6Z21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MTI3NTEsImV4cCI6MjA1Njk4ODc1MX0.G0p0NJSPK42519Z4CdEy6b6AQ70L6U8f-YrGAr53Blc";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("Supabase Client:", supabase);

const url = "https://tdcssefktlozikfezgml.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY3NzZWZrdGxvemlrZmV6Z21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MTI3NTEsImV4cCI6MjA1Njk4ODc1MX0.G0p0NJSPK42519Z4CdEy6b6AQ70L6U8f-YrGAr53Blc";

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const signUpBtn = document.getElementById("signUp");
const loginBtn = document.getElementById("login");
const success = document.getElementById("success");
const signIn = document.getElementById("signIn");
let username_found = false;
let valid = false;

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("password").addEventListener("copy", function (e) {
  e.preventDefault(); // Disable copy action
});

document.getElementById("password").addEventListener("cut", function (e) {
  e.preventDefault(); // Disable cut action
});

document.getElementById("password").addEventListener("paste", function (e) {
  e.preventDefault(); // Disable paste action
});
document
  .getElementById("confirmPassword")
  .addEventListener("copy", function (e) {
    e.preventDefault(); // Disable copy action
  });

document
  .getElementById("confirmPassword")
  .addEventListener("cut", function (e) {
    e.preventDefault(); // Disable cut action
  });

document
  .getElementById("confirmPassword")
  .addEventListener("paste", function (e) {
    e.preventDefault(); // Disable paste action
  });
document.getElementById("_password").addEventListener("copy", function (e) {
  e.preventDefault(); // Disable copy action
});

document.getElementById("_password").addEventListener("cut", function (e) {
  e.preventDefault(); // Disable cut action
});

document.getElementById("_password").addEventListener("paste", function (e) {
  e.preventDefault(); // Disable paste action
});

//.................................................................................................................
document.querySelector("#name").addEventListener("input", async (e) => {
  let name = e.target.value.trim();
  let usernameCheck = document.getElementById("usernameCheck");

  // Don't check if the input is empty
  if (name === "") {
    usernameCheck.innerHTML = "Username cannot be empty!";
    usernameCheck.style.color = "red";
    return;
  }

  // Check the availability of the username in the database
  const { data, error } = await supabase
    .from("AuthPage") // Table name
    .select("name") // Column name
    .eq("name", name); // Check if username exists

  // Handle errors from the Supabase query
  if (error) {
    console.error("Error fetching username:", error);
    usernameCheck.innerHTML = "Error checking username. Try again.";
    usernameCheck.style.color = "red";
    return;
  }

  // If username already exists
  if (data.length > 0) {
    usernameCheck.innerHTML = "Username is already taken!";
    usernameCheck.style.color = "red";
    username_found = true;
  } else {
    usernameCheck.innerHTML = "Username is available!";
    usernameCheck.style.color = "green";
  }
});

signUpBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  let name = document.querySelector("#name").value.trim();
  let password = document.querySelector("#password").value.trim();
  let confirmPassword = document.querySelector("#confirmPassword").value.trim();
  let passwordCheck = document.getElementById("passwordCheck");
  let usernameCheck = document.getElementById("usernameCheck");

  if (name === "" || password === "" || confirmPassword === "") {
    passwordCheck.innerHTML = "Invalid SignUp";
    passwordCheck.style.color = "red";
    return;
  }

  if (password !== confirmPassword) {
    passwordCheck.innerHTML = "*Passwords do not match!";
    passwordCheck.style.color = "red";
    return;
  }

  // Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  if (!passwordRegex.test(password)) {
    passwordCheck.innerHTML = "Enter valid password.";
    passwordCheck.style.color = "red";
    return;
  }

  // Check the availability of the username in the database
  const { data, error } = await supabase
    .from("AuthPage") // Table name
    .select("name") // Column name
    .eq("name", name); // Check if username exists

  if (error) {
    console.error("Error fetching username:", error);
    usernameCheck.innerHTML = "Error checking username. Try again.";
    usernameCheck.style.color = "red";
    return;
  }

  if (data.length > 0) {
    usernameCheck.innerHTML = "Username is already taken!";
    usernameCheck.style.color = "red";
    username_found = true;
    return;
  } else {
    usernameCheck.innerHTML = "Username is available!";
    usernameCheck.style.color = "green";
    username_found = false;
  }

  // Proceed with sign-up if username is not found
  if (!username_found) {
    const { data, error } = await supabase
      .from("AuthPage")
      .insert([{ name: name, password: password }]);

    if (error) {
      console.error("Error signing up:", error);
      passwordCheck.innerHTML = "Error signing up. Try again.";
      passwordCheck.style.color = "red";
      return;
    }

    // Reset username_found to false after successful sign-up
    username_found = false;
    passwordCheck.innerHTML = "Sign-up successful!";
    passwordCheck.style.color = "green";
    location.reload();
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

signIn.addEventListener("click", async (e) => {
  e.preventDefault();
  async function login() {
    let username = document.getElementById("_name").value.trim();
    let password = document.getElementById("_password").value.trim();
    let loginMessage = document.getElementById("loginMessage");

    // Check if fields are empty
    if (username === "" || password === "") {
      loginMessage.innerHTML = "Username and password cannot be empty!";
      loginMessage.style.color = "red";
      return;
    }

    // Query the database for the username and password
    const { data, error } = await supabase
      .from("AuthPage") // Your table name
      .select("name, password") // Columns to check
      .eq("name", username)
      .eq("password", password);
    //     console.log(data); // Matching username & password
    // console.log("tt")
    if (error) {
      console.error("Error fetching user data:", error);
      loginMessage.innerHTML = "Error checking login. Try again.";
      loginMessage.style.color = "red";
      return;
    }

    if (data.length > 0 && data[0].password === password) {
      // Login successful
      loginMessage.innerHTML = "Login successful! Redirecting...";
      loginMessage.style.color = "green";

      // Redirect to dashboard or another page after login
      setTimeout(() => {
        window.location.href = "LandingPage.html"; // Change URL as needed
      }, 2000);
    } else {
      // Incorrect username or password
      loginMessage.innerHTML = "Incorrect username or password!";
      loginMessage.style.color = "red";
    }
    document.getElementById("loginUser").innerHTML = username;
  }
  await login();
});
