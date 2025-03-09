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

  let name = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;
  let confirmPassword = document.querySelector("#confirmPassword").value;
  let passwordCheck = document.getElementById("passwordCheck");

  if (name === "" || password === "" || confirmPassword === "") {
    passwordCheck.innerHTML = "Invalid SignUp";
    return;
  }
  async function checkUsername() {
    let username = name.trim();
    let usernameCheck = document.getElementById("usernameCheck");

    if (username === "") {
      usernameCheck.innerHTML = "Username cannot be empty!";
      usernameCheck.style.color = "red";
      return;
    }

    const { data, error } = await supabase
      .from("AuthPage") // Table name
      .select("name") // Column name
      .eq("name", username); // Check if username exists

    // console.log(data);

    if (error) {
      console.error("Error fetching username:", error);
      usernameCheck.innerHTML = "Error checking username. Try again.";
      usernameCheck.style.color = "red";
      return;
    }

    if (data.length > 0) {
      // Username already exists, prevent adding
      username_found = true;
      usernameCheck.innerHTML = "Username is already taken!";
      usernameCheck.style.color = "red";
      console.log("hi", username_found);
      return;
    } else {
      // Username is available, allow adding
      usernameCheck.innerHTML = "Username is available!";
      usernameCheck.style.color = "green";
    }
  }
  await checkUsername(); //Checking username
  if (password !== confirmPassword) {
    passwordCheck.innerHTML = "*Passwords do not match!";
    return;
  }
  //..........................................................................
  //password validation

  //   When the user starts to type something inside the password field
  // password.onkeyup = function () {
  //   let lowerCaseLetters = /[a-z]/g;
  //   let l_valid;
  //   if (password.value.match(lowerCaseLetters)) {
  //     l_valid = true;
  //   }

  //   // Validate capital letters
  //   let upperCaseLetters = /[A-Z]/g;
  //   let u_valid;
  //   if (password.value.match(upperCaseLetters)) {
  //     u_valid = true;
  //   }

  //   // Validate numbers
  //   let specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g; // Regular expression for special characters
  //   let s_valid;
  //   if (password.value.match(specialCharacters)) {
  //     s_valid = true;
  //   }

  //   // Validate length
  //   let len_valid;
  //   if (password.value.length >= 8) {
  //     len_valid = true;
  //   }

  //   if (l_valid && s_valid && u_valid && len_valid) {
  //     valid = true; // Enable Sign In button
  //   } else {
  //     passwordCheck.innerHTML = "Enter the valid password";
  //   }
  // };

  //let password = document.getElementById("password");
  //let passwordCheck = document.getElementById("passwordCheck");
  //let password = document.getElementById("password");
  //let passwordCheck = document.getElementById("passwordCheck");
  //   let signUpBtn = document.getElementById("signUpBtn");
  //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  //   let valid = false; // Initialize valid as false

  //   password.onkeyup = function () {
  //     let lowerCaseLetters = /[a-z]/;
  //     let upperCaseLetters = /[A-Z]/;
  //     let specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

  //     let messages = [];
  //     let l_valid = lowerCaseLetters.test(password.value);
  //     let u_valid = upperCaseLetters.test(password.value);
  //     let s_valid = specialCharacters.test(password.value);
  //     let len_valid = password.value.length >= 8;

  //     if (!l_valid) messages.push("At least one lowercase letter.");
  //     if (!u_valid) messages.push("At least one uppercase letter.");
  //     if (!s_valid) messages.push("At least one special character.");
  //     if (!len_valid) messages.push("Minimum length of 8 characters.");

  //     if (l_valid && u_valid && s_valid && len_valid) {
  //       valid = true;
  //       passwordCheck.innerHTML = "Password is valid!";
  //       passwordCheck.style.color = "green";
  //     } else {
  //       valid = false;
  //       passwordCheck.innerHTML = messages.join("<br>");
  //       passwordCheck.style.color = "red";
  //     }

  //     // Enable/Disable the button based on validation
  //     signUpBtn.disabled = !valid;
  //   };

  async function signUp() {
    if (!username_found) {
      const { data, error } = await supabase
        .from("AuthPage")
        .insert([{ "name": name, "password": password }]);

      if (error) {
        console.error("Error fetching user data:", error);
        loginMessage.innerHTML = "Error checking login. Try again.";
        loginMessage.style.color = "red";
        return;
      }

      // Reset username_found to false after successful sign-up
      username_found = false;
      location.reload();
    }
  }
  await signUp();

  
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
  }
  await login();
});

//.............................................................
// const editStudent = async (id) => {
//   const res = await database.from("AuthPage").select("*").eq("id", id);
//   if (res) {
//     document.getElementById("id").value = res.data[0].id;
//     document.getElementById("edit-name").value = res.data[0].name;
//     document.getElementById("edit-age").value = res.data[0].age;
//     document.getElementById("edit-country").value = res.data[0].country;
//   }
// };
//..............................................................................
// const update = document.getElementById("update");

// update.addEventListener("click", async () => {
//   let id = document.getElementById("id").value;
//   let name = document.getElementById("edit-name").value;
//   let age = document.getElementById("edit-age").value;
//   let country = document.getElementById("edit-country").value;
//   update.innerText = "Updateing....";
//   update.setAttribute("disabled", true);
//   const res = await database
//     .from("students")
//     .update({
//       name,
//       age,
//       country,
//     })
//     .eq("id", id);

//   if (res) {
//     alert("Student Update Successfully");
//     update.innerText = "Update";
//     update.setAttribute("disabled", false);
//     name = "";
//     age = "";
//     country = "";
//     getStudent();
//     getTotalCount();
//   } else {
//     alert("Student Not Update Successfully");
//     update.innerText = "Update";
//     update.setAttribute("disabled", false);
//   }
// });
//.........................................................................................
// const deleteStudent = async (id) => {
//   const res = await database.from("students").delete().eq("id", id);

//   if (res) {
//     alert("Delete successfully");
//     getStudent();
//     getTotalCount();
//   } else {
//     alert("Delete successfully");
//   }
// };
