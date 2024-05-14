const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const age = getValue('age');
    const profession = getValue('profession');
    const institute = getValue('institute');
    const image = getValue('image');

    console.log(image);
    
    const info = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      age,
      profession,
      institute,
      image,
    };

    // const formData = new FormData();
    // formData.append('username', username);
    // formData.append('first_name', first_name);
    // formData.append('last_name', last_name);
    // formData.append('email', email);
    // formData.append('password', password);
    // formData.append('confirm_password', confirm_password);
    // formData.append('age', age);
    // formData.append('profession', profession);
    // formData.append('institute', institute);
    // formData.append('picture', image)

  
    if (password === confirm_password) {
      document.getElementById("error").innerText = "";
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      ) {
        console.log(info);
  
        fetch("http://localhost:8000/register/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
          // body: formData
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      } else {
        document.getElementById("error").innerText =
          "pass must contain eight characters, at least one letter, one number and one special character:";
      }
    } else {
      document.getElementById("error").innerText =
        "password and confirm password do not match";
      alert("password and confirm password do not match");
    }
  };
  
  const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
  };
  
  const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    console.log(username, password);
    if ((username, password)) {
      fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "index.html";
          }
          else {
            console.log("The email or password incorrect");
          }
        });
    }
  };

  function if_logged_in() {
    const element = document.getElementById('login-btn');
    if (localStorage.getItem('token')) {
        element.innerHTML = `
        <a onclick=logout()>Logout</a>
        `
        const register = document.getElementById('register');
        register.innerHTML = "";
    } else {
        const navbtns = document.getElementById('nav-btns');
        navbtns.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li id="login-btn"><a href="login.html">Login</a></li>
        <li id="register"><a href="registration.html">Registration</a></li>
        `
    }
}

if_logged_in()

function logout() {
    // Clear session data
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = 'login.html';
}