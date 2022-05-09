let signInBtn = document.querySelector("#admin-form-btn");
let signUpBtn = document.querySelector("#new-user-form-btn");
signInBtn.disabled = true;

signInBtn.addEventListener("click", () => {
    console.log(signInBtn.value);
    createForms(signInBtn.value);
});

signUpBtn.addEventListener("click", () => {
    console.log(signUpBtn.value);
    createForms(signUpBtn.value);
});

function createForms(form) {
    let formSection = document.querySelector("#form-section");
    let currentForm;

    let adminForm = `
  <form id="admin-form" class="form" onsubmit="adminFormFunctionality()" action="#">
    <input autocomplete="off" id="admin-username" class="input" type="text" placeholder="Username" />
    <input autocomplete="off" id="admin-password" class="input" type="password" placeholder="Password" />
    <button id="admin-submit-btn" type="submit" value="submit">Sign In</button>
   </form>
`;

    let registrationForm = `
  <form id="new-user-form" action="#" class="form" onsubmit="newUserInfo()" >
    <input autocomplete="off" id="user-fullname" class="input" required type="text" placeholder="Full Name" />
    <input autocomplete="off" id="user-phone-number" class="input" required type="number" max-length="10" placeholder="Phone Number" />
    <input autocomplete="off" id="user-image" class="input" type="text" placeholder="Personal Image" />
    <div class="birthdate-entry">
      <input autocomplete="off" id="day" class="date-input input" required type="number" placeholder="dd" maxlength="2" />
      <label class="divider">/</label>
      <input autocomplete="off" id="month" class="date-input input" required type="number" placeholder="mm" maxlength="2" />
      <label class="divider">/</label>
      <input autocomplete="off" id="year" class="date-input input" required type="number" placeholder="yyyy" maxlength="4" />
    </div>
    <button id="user-submit-btn" type="submit" value="submit">Register User</button>
  </form>
`;

    if (form === "admin-form") {
        currentForm = adminForm;

        signInBtn.disabled = true;
        signUpBtn.disabled = false;

        document.body.style = `
    background-image: url("../images/form-images/login-background.jpg"), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4));
    `;
    } else if (form === "new-user-form") {
        currentForm = registrationForm;

        signUpBtn.disabled = true;
        signInBtn.disabled = false;

        document.body.style = `
    background-image: url(../images/form-images/new-user-background.jpg), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4));
    `;
    }

    formSection.innerHTML = currentForm;
}

createForms("new-user-form");

function createPass() {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    const calpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "1234567890";
    const specials = ",.!@#$%^&*";
    const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];

    let opt, choose;
    let pass = "";

    for (let i = 0; i < 8; i++) {
        opt = Math.floor(Math.random() * options.length);
        choose = Math.floor(Math.random() * options[opt].length);
        pass = pass + options[opt][choose];
        options.splice(opt, 1);
    }

    return pass;
}

let createdPassword = createPass();
console.log(createdPassword);

function adminFormFunctionality() {
    let adminUserName = document.querySelector("#admin-username");
    let adminPassword = document.querySelector("#admin-password");

    const userName = ["Charl", "Ashton"];
    const passWord = ["pass", createdPassword];

    console.log(passWord);

    if (userName.includes(adminUserName.value) && passWord.includes(adminPassword.value)) {
        alert(`Welcome ${adminUserName.value}`);
        document.querySelector("#admin-form").action = "/display.html";
    } else if (userName.includes(adminUserName.value) && passWord.includes(adminPassword.value) === false) {
        alert("Incorrect Password Enterered");
    } else if (userName.includes(adminUserName.value) === false && passWord.includes(adminPassword.value)) {
        alert("Incorrect Username Enterered");
    } else {
        alert("Incorrect Details Enterered");
    }

    adminUserName.value = "";
    adminPassword.value = "";
}

function newUserInfo() {
    let fullName = document.querySelector("#user-fullname");
    let phoneNumber = document.querySelector("#user-phone-number");
    let userImage = document.querySelector("#user-image");

    let day = document.querySelector("#day");
    let month = document.querySelector("#month");
    let year = document.querySelector("#year");

    fullName = fullName.value;
    phoneNumber = phoneNumber.value;
    userImage = userImage.value;
    let birthDay = [];

    if ((day.value.length, month.value.length === 2 && year.value.length === 4)) {
        birthDay = [day.value, month.value, year.value];
    } else {
        alert("Please fill out the birthday correctly");
    }

    let inputValueCheck = ["", null];

    phoneNumber = Number(phoneNumber);

    if (inputValueCheck.includes(fullName) === false && typeof fullName === "string") {
        if (inputValueCheck.includes(phoneNumber) === false && typeof phoneNumber === "number") {
            if (inputValueCheck.includes(userImage)) {
                userImage = "./images/display-images/placeholder.jpg";
            }
            if (birthDay.length > 0) {
                let result = true;

                for (let i = 0; i < birthDay.length; i++) {
                    if (typeof birthDay[i] === "number" && birthDay[3] > 2008) {
                        result = false;
                        birthDay = [];
                        break;
                    }
                }

                let birthDate = String(birthDay[1]) + String(birthDay[1]) + String(birthDay[1]);
                phoneNumber = String(phoneNumber);

                addUserToDatabase(fullName, userImage, birthDate, phoneNumber);
                birthDay = [];
            }
        } else {
            alert("Phone Number was entered incorrectly");
        }
    }
}

function addUserToDatabase(fullName, userImage, birthDate, phoneNumber) {
    let userData = {
        full_name: fullName,
        profile_image: userImage,
        phone_number: phoneNumber,
        birthday: birthDate,
    };

    fetch(`http://127.0.0.1:5000/new_user/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
        .then((response) => response.json())

        .then(() => {
            userData = JSON.stringify(userData);
            console.log(userData);
            if (data.status_code === 201) {
                window.localStorage.setItem("user", JSON.stringify(userData));
                alert("successful registration");
                console.log(userData);
                // document.querySelector("#new-user-form").action = "#";
            } else {
                alert("unsuccessful registration");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function viewUser() {
    fetch(`http://127.0.0.1:5000/view_profiles/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.text())
        .then((data) => console.log(data))
        .catch((error) => {
            console.log(error);
        });
}

viewUser();
