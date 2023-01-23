let userNames = [];
let signInBtn = document.getElementById("signin-btn");
let signUpBtn = document.getElementById("signup-btn");

signInBtn.addEventListener("click", () => {
	createForms(signInBtn.value);
});

signUpBtn.addEventListener("click", () => {
	createForms(signUpBtn.value);
});

function createForms(form) {
	let formSection = document.getElementById("form-display");
	let currentForm = "";

	const forms = {
		adminForm: `
			<form id="signin-form" class="form" action="#">
				<input required autocomplete="off" id="signin-username" type="text" placeholder="Username" />
				<div class="view-password">
					<input required autocomplete="off" id="signup-password" type="password" placeholder="Password" />
					<i id="toggle-password" class="fa-solid fa-eye-low-vision"></i>
				</div>
				<button id="admin-submit-btn" type="submit" value="submit">Sign In</button>
			</form>
		`,
		registrationForm: `
			<form id="signup-form" class="form" action="#">
				<input autocomplete="off" id="user-fullname" required type="text" placeholder="Full Name" />
				<input autocomplete="off" id="user-phone-number" required type="number" max-length="10" placeholder="Phone Number" />
				<input autocomplete="off" id="user-image" type="file" accept="image/*" placeholder="Personal Image" />
				<img id="output" width="100%"/>
				<div class="birthdate-entry">
					<input autocomplete="off" id="month" class="date-input input" required type="number" placeholder="mm" maxlength="2" />
					<label class="divider">/</label>
					<input autocomplete="off" id="day" class="date-input input" required type="number" placeholder="dd" maxlength="2" />
					<label class="divider">/</label>
					<input autocomplete="off" id="year" class="date-input input" required type="number" placeholder="yyyy" maxlength="4" />
				</div>
				<button id="user-submit-btn">Register User</button>
			</form>
		`
	}

	if (form === "signin-form") {
		currentForm = forms["adminForm"];

		signInBtn.disabled = true;
		signUpBtn.disabled = false;

		document.body.style = `
			background-size: cover;
			background-image: url("../global_use/global_images/background.png"), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4));`;
	} else if (form === "signup-form") {
		currentForm = forms["registrationForm"];

		signUpBtn.disabled = true;
		signInBtn.disabled = false;

		document.body.style = `
			background-size: cover;
			background-image: url(../global_use/global_images/background.png), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4));`;
	}

	formSection.innerHTML = currentForm;

	if (currentForm === forms["adminForm"]) {
		document.getElementById("signin-form").addEventListener("submit", userInfo);

		document.getElementById("toggle-password").addEventListener("click", () => {
			let password = document.getElementById("signup-password");

			if (password.type === "password") {
				password.type = "text";
				document.getElementById("toggle-password").className = "fa-regular fa-eye";

			} else {
				password.type = "password";
				document.getElementById("toggle-password").className = "fa-solid fa-eye-low-vision";

			}
		});

	} else {
		let imageInput = document.getElementById("user-image");
		let image = document.getElementById("output");
		let inputValueCheck = ["", null, "undefined"];

		imageInput.addEventListener("change", function () {

			if (inputValueCheck.includes(imageInput.value) === false) {
				const reader = new FileReader(); // Converts the file into a data url(contains info of the file)

				reader.addEventListener("load", () => {
					reader.result;
					image.src = reader.result;
				});

				reader.readAsDataURL(this.files[0]); // Gets the first selected file      
			} else {
				image.src = "";
			}
		});

		document.getElementById("user-submit-btn").addEventListener("click", newUserInfo);
	}
}

function userSignIn() {
	let username = document.getElementById("signin-username");
	let adminPassword = document.getElementById("signup-password");

	const passWord = 'DEw0DPc6u7_2';
	lowerCaseUsername = username.value.toLowerCase().trim();

	if (userNames.includes(lowerCaseUsername) && passWord.includes(adminPassword.value)) {
		window.location.replace("http://127.0.0.1:5500/display-all.html");
	} else if (userNames.includes(lowerCaseUsername) && passWord.includes(adminPassword.value) === false) {
		alert("Incorrect Password Enterered");
		adminPassword.value = "";
		return;
	} else if (userNames.includes(lowerCaseUsername) === false && passWord.includes(adminPassword.value)) {
		alert("Incorrect Username Enterered");
		username.value = "";
		return;
	} else {
		alert("Incorrect Username and Password Enterered");
		username.value = "";
		adminPassword.value = "";
		return;
	}
}

function newUserInfo() {
	let fullName = document.getElementById("user-fullname");
	let phoneNumber = document.getElementById("user-phone-number");
	let userImage = document.getElementById("user-image");

	let day = document.getElementById("day");
	let month = document.getElementById("month");
	let year = document.getElementById("year");

	fullName = fullName.value;
	phoneNumber = phoneNumber.value;
	userImage = userImage.value;

	let inputValueCheck = ["", null, "undefined"];

	if (inputValueCheck.includes(userImage)) {
		userImage = "./images/display-images/placeholder.jpg";
	} else {
		let image = document.getElementById("output");
		userImage = image.src;
	}

	if (typeof fullName === "string") {
		if (typeof Number(phoneNumber) === "number" && phoneNumber.charAt(0) === "0" && phoneNumber.length === 10) {
			if (day.value.length, month.value.length === 2 && year.value.length === 4 && Number(day.value) <= 31 && Number(month.value) <= 12 && Number(year.value) < 2009) {
				birthDay = [day.value, month.value, year.value];
				if (birthDay.length > 0) {
					for (let i = 0; i < birthDay.length; i++) {
						if (typeof birthDay[i] === "number" && birthDay[3] > 2008) {
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
				alert("Check name input if you entered an incorrect value");
				return;
			}
		} else {
			alert("Check phone number input if you entered an incorrect value");
			return;
		}
	} else {
		alert("Check fullname input if you entered an incorrect value");
		return;
	}
}

function userInfo() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" }
	})
		.then((response) => response.json())
		.then((data) => {
			let yp = data.yp_data;
			let username;

			if (yp.length === 0) {
				alert("There is no data to view");
			} else {
				for (i of yp) {
					username = i["full_name"].toLowerCase().trim();
					if (userNames.includes(username) === false) {
						userNames.push(username);
					}
				}
				userSignIn();
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

function addUserToDatabase(fullName, userImage, birthDate, phoneNumber) {
	let userData = {
		full_name: fullName,
		profile_image: userImage,
		phone_number: phoneNumber,
		birthday: birthDate
	};

	fetch(`http://127.0.0.1:5000/new_user/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userData)
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

createForms("signup-form");
