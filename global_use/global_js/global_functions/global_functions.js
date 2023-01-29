let timeout = 0;
function debounce(func, delay) {
	return function () {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			func();
		}, delay);
	};
}

let user_data = {
	"data": [],
	"usernames": []
}

function pageRedirect(page_url) {
	window.location.replace(page_url);
	return;
}

function checkLocalStorageSpace(key, value) {
	value = JSON.stringify(value);

	window.localStorage.setItem(key, value);

	let isFull = window.localStorage.getItem(key)

	if (isFull) {
		return;
	} else {
		console.log("Clearing localStorage");
		localStorage.clear();
		return false;
	}
}

// FETCHES
function getUserObject() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" }
	})
		.then((response) => response.json())
		.then((data) => {
			let data_array = [];
			let usernames_array = [];

			for (const user of data.yp_data) {
				const data_obj = {
					"id": user["yp_id"],
					"Full Name": user["full_name"],
					"Profile Image": user["profile_image"],
					"Birthday": user["birthday"],
					"Phone Number": user["phone_number"]
				};

				usernames_array.push(user["full_name"]);
				data_array.push(data_obj);
			}

			user_data["data"] = data_array;
			user_data["usernames"] = usernames_array;

			checkLocalStorageSpace("user_data", user_data);
		})
		.catch((error) => {
			console.log(error);
		});
}

function addUserToDatabase(fullName, userImage, birthDate, phoneNumber) {
	let new_user = {
		"full_name": fullName,
		"profile_image": userImage,
		"birthday": birthDate,
		"phone_number": phoneNumber
	};

	fetch(`http://127.0.0.1:5000/new_user/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(new_user)
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status_code === 201) {
				alert("successful registration");
				return;
			} else {
				alert("unsuccessful registration");
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

function updateUserData(id, new_values) {
	if (Object.keys(new_values).length !== 0) {
		fetch(`http://127.0.0.1:5000/edit_yp_profiles/${id}/`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(new_values)
		})
			.then((response) => response.json())
			.then(data => {
				console.log("Success", data);
				return true;
			})
			.catch((error) => {
				console.log("Error", error);
			});
	} else {
		return false;
	}
}

function deleteUserData(id) {
	fetch(`http://127.0.0.1:5000/delete_yp_profiles/${id}/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then(data => {
			console.log("Success", data);
			return true;
		})
		.catch((error) => {
			console.log("Error", error);
		});
}

// PRELOADER
function removeLoader() {
	let loader = document.getElementById("preloader");
	loader.style.filter = "opacity(0.5)";
	loader.style.filter = "opacity(0)";
	loader.style.height = "100vh";

	removeLoaderComplete = () => {
		loader.style.display = "none";
	};

	if (loader.style.filter == "opacity(0)") {
		loader.style.height = "20vh";
		removeLoaderComplete = debounce(removeLoaderComplete, 500);
		removeLoaderComplete();
	}
}

window.addEventListener("load", debounce(removeLoader, 1000));

// CONTROLS 
function togglePassword() {
	document.getElementById("toggle-password").addEventListener("click", () => {
		let password = document.getElementById("signin-password");

		if (password.type === "password") {
			password.type = "text";
			document.getElementById("toggle-password").className = "fa-regular fa-eye";

		} else {
			password.type = "password";
			document.getElementById("toggle-password").className = "fa-solid fa-eye-low-vision";

		}
	});
}

function signIn(user) {
	let username = document.getElementById("signin-username");
	let password = document.getElementById("signin-password");

	username_value = username.value;
	password_value = password.value;

	const login_credentials = {
		"admin": {
			"username": "YP_Admin_User",
			"password": "vMvwST6y75cTRk"
		},
		"user": {
			"username": user_data["usernames"].includes(username_value),
			"password": "DEw0DPc6u7_2"
		}
	};

	if (login_credentials[user]["username"] && password_value === login_credentials[user]["password"]) {
		url = 'http://127.0.0.1:5500/display.html';
		if (user === "admin")
			url = 'http://127.0.0.1:5500/admin.html';

		setTimeout(() => pageRedirect(url), 500);
	} else if (login_credentials[user]["username"] && password_value !== login_credentials[user]["password"]) {
		password.value = "";
		alert("The password is incorrect");
		return;
	} else if (!login_credentials[user]["username"] && password_value === login_credentials[user]["password"]) {
		username.value = "";
		alert("The username is incorrect");
		return;
	} else if (!login_credentials[user]["username"] && password_value !== login_credentials[user]["password"]) {
		username.value = "";
		password.value = "";
		alert("The login info you entered is incorrect");
		return;
	}
}

function signUp() {
	let fullname = document.getElementById("user-fullname").value;
	let phone_number = document.getElementById("user-phone-number").value;
	let user_image = document.getElementById("user-image").value;

	let day = document.getElementById("day").value;
	let month = document.getElementById("month").value;
	let year = document.getElementById("year").value;

	let input_value_check = ["", null, "undefined"];

	if (input_value_check.includes(user_image)) {
		user_image = "./images/display-images/placeholder.jpg";
	} else {
		let image = document.getElementById("output");
		user_image = image.src;
	}

	if (typeof fullname === "string") {
		if (typeof Number(phone_number) === "number" && phone_number.charAt(0) === "0" && phone_number.length === 10) {
			if (day.length, month.length === 2 && year.length === 4 && Number(day) <= 31 && Number(month) <= 12 && Number(year) < 2009) {
				let birthday = [day, month, year];
				for (let i = 0; i < birthday.length; i++) {
					if (typeof birthday[i] === "number" && birthday[3] > 2008) {
						birthday = [];
						break;
					}
				}

				let birth_date = `${birthday[0]}/${birthday[1]}/${birthday[2]}`;
				phone_number = String(phone_number);
				addUserToDatabase(fullname, user_image, birth_date, phone_number);
				birthday = [];
			} else {
				alert("Check date if you entered an incorrect value");
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

function previousPage(page) {
	window.location.replace(`http://127.0.0.1:5500/${page}.html`);
}

// CALCULATIONS
function getAge(dateString) {
	let today = new Date();
	let birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	let month = today.getMonth() - birthDate.getMonth();
	if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
