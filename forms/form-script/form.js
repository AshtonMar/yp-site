let signInBtn = document.querySelector("#admin-form-btn");
let signUpBtn = document.querySelector("#new-user-form-btn");
signInBtn.disabled = true;

window.onload = () =>{
	createForms("new-user-form");
}


signInBtn.addEventListener("click", () => {
    createForms(signInBtn.value);
});


signUpBtn.addEventListener("click", () => {
    createForms(signUpBtn.value);
});


function createForms(form) {
    let formSection = document.querySelector("#form-section");
    let currentForm;

    let adminForm = `
  <form id="admin-form" class="form" action="#">
    <input autocomplete="off" id="admin-username" class="input" type="text" placeholder="Username" />
	<div class="view-password">
		<input autocomplete="off" id="admin-password" class="input" type="password" placeholder="Password" />
		<i id="toggle-password" class="fa-solid fa-eye-low-vision"></i>
  	</div>
    <button id="admin-submit-btn" type="submit" value="submit">Sign In</button>
   </form>
`;

    let registrationForm = `
    <div id="new-user-form" class="form">
      <input autocomplete="off" id="user-fullname" class="input" required type="text" placeholder="Full Name" />
      <input autocomplete="off" id="user-phone-number" class="input" required type="number" max-length="10" placeholder="Phone Number" />
      <input autocomplete="off" id="user-image" class="input" type="file" accept="image/*" placeholder="Personal Image" />
      <img id="output" width="100%"/>
      <div class="birthdate-entry">
        <input autocomplete="off" id="day" class="date-input input" required type="number" placeholder="dd" maxlength="2" />
        <label class="divider">/</label>
        <input autocomplete="off" id="month" class="date-input input" required type="number" placeholder="mm" maxlength="2" />
        <label class="divider">/</label>
        <input autocomplete="off" id="year" class="date-input input" required type="number" placeholder="yyyy" maxlength="4" />
      </div>
      <button id="user-submit-btn">Register User</button>
    </div>
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

	
	if(currentForm === adminForm){
		const adminUserFormSubmit = document.querySelector("#admin-form").addEventListener("submit", adminFormFunctionality);
		
		document.getElementById('toggle-password').addEventListener("click", () => {
			let password = document.querySelector('#admin-password');
			if (password.type === "password") {
				password.type = "text";
				document.getElementById('toggle-password').className = "fa-regular fa-eye"
			} else {
				password.type = "password";
				document.getElementById('toggle-password').className = "fa-solid fa-eye-low-vision"
			}
		});
		
		
	}else{
		const newUserFormSubmit = document.querySelector("#user-submit-btn").addEventListener("click", newUserInfo);

		document.getElementById("user-image").addEventListener("change", loadFile = function (event) {
			let image = document.getElementById("output");
			image.src = URL.createObjectURL(event.target.files[0]);
		})
	}

}
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
	let adminPassword = document.querySelector('#admin-password');

    const userName = ["Charl", "Ashton"];
    const passWord = ["pass", createdPassword];

    if (userName.includes(adminUserName.value) && passWord.includes(adminPassword.value)) {
        alert(`Welcome ${adminUserName.value}`);
        document.querySelector("#admin-form").action = "/display.html";
    } else if (userName.includes(adminUserName.value) && passWord.includes(adminPassword.value) === false) {
		console.log("here");
        alert("Incorrect Password Enterered");
		adminPassword.value = "";
	} else if (userName.includes(adminUserName.value) === false && passWord.includes(adminPassword.value)) {
		console.log("here");
        alert("Incorrect Username Enterered");
		adminUserName.value = "";
	}else{
        alert("Incorrect Username and Password Enterered");
		adminUserName.value = "";
		adminPassword.value = "";
	}
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

    let inputValueCheck = ["", null, "undefined"];

	if (inputValueCheck.includes(userImage)) {
		userImage = "./images/display-images/placeholder.jpg";
	}else{
		let image = document.getElementById("output");
		userImage = image.src
	}

    if (inputValueCheck.includes(fullName) === false && typeof fullName === "string") {
        if (inputValueCheck.includes(phoneNumber) === false && typeof Number(phoneNumber) === "number" && phoneNumber.charAt(0) === "0" && phoneNumber.length === 10) {
			if ((day.value.length, month.value.length === 2 && year.value.length === 4)) {
				birthDay = [day.value, month.value, year.value];
				
				if (birthDay.length > 0) {

					let result = true;
	
					for (let i = 0; i < birthDay.length; i++) {
						if (typeof birthDay[i] === "number" && birthDay[3] > 2008) {
							result = false;
							birthDay = [];
							break;
						}
					}
	
					birthDate = `${birthDay[0]}/${birthDay[1]}/${birthDay[2]}`;
					phoneNumber = String(phoneNumber);
	
					addUserToDatabase(fullName, userImage, birthDate, phoneNumber);
					birthDay = [];
				}
			} else {
				alert("Please fill out the birthday correctly");
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
        .then((data) => {
			userData = JSON.stringify(userData);
			if (data.status_code === 201) {
				alert("successful registration");
                window.localStorage.setItem("user", JSON.stringify(userData));
			} else {
                alert("unsuccessful registration");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
