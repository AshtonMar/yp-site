let usernames = [];
let signin_btn = document.getElementById('signin-btn');
let signup_btn = document.getElementById('signup-btn');

signin_btn.addEventListener('click', () => {
	createForms(signin_btn.value);
});

signup_btn.addEventListener('click', () => {
	createForms(signup_btn.value);
});

function createForms(form) {
	let form_section = document.getElementById('form-display');
	let current_form = "";

	const forms = {
		admin_form: `
			<form id='signin-form' class='form' action='#'>
				<input required autocomplete='off' id='signin-username' type='text' placeholder='Username' />
				<div class='view-password'>
					<input required autocomplete='off' id='signin-password' type='password' placeholder='Password' />
					<i id='toggle-password' class='fa-solid fa-eye-low-vision'></i>
				</div>
				<button id='admin-submit-btn' type='submit' value='submit'>Sign In</button>
			</form>
		`,
		registration_form: `
			<form id='signup-form' class='form' action='#'>
				<input autocomplete='off' id='user-fullname' required type='text' placeholder='Full Name' />
				<input autocomplete='off' id='user-phone-number' required type='number' max-length='10' placeholder='Phone Number' />
				<input autocomplete='off' id='user-image' type='file' accept='image/*' placeholder='Personal Image' />
				<img id='output' width='100%'/>
				<div class='birthdate-entry'>
					<input autocomplete='off' id='month' class='date-input input' required type='number' placeholder='mm' maxlength='2' />
					<label class='divider'>/</label>
					<input autocomplete='off' id='day' class='date-input input' required type='number' placeholder='dd' maxlength='2' />
					<label class='divider'>/</label>
					<input autocomplete='off' id='year' class='date-input input' required type='number' placeholder='yyyy' maxlength='4' />
				</div>
				<button id='user-submit-btn'>Register User</button>
			</form>
		`
	}

	if (form === 'signin-form') {
		current_form = forms['admin_form'];

		signin_btn.disabled = true;
		signup_btn.disabled = false;
	} else if (form === 'signup-form') {
		current_form = forms['registration_form'];

		signup_btn.disabled = true;
		signin_btn.disabled = false;
	}

	document.body.style = `
		background-image: url('../../global_use/global_images/background.png'), linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
		background-blend-mode: overlay;
		background-position: center;
		background-size: cover;
	`;

	form_section.innerHTML = current_form;

	if (current_form === forms['admin_form']) {
		document.getElementById('signin-form').addEventListener('submit', userInfo);

		document.getElementById('toggle-password').addEventListener('click', () => {
			let password = document.getElementById('signin-password');

			if (password.type === 'password') {
				password.type = 'text';
				document.getElementById('toggle-password').className = 'fa-regular fa-eye';

			} else {
				password.type = 'password';
				document.getElementById('toggle-password').className = 'fa-solid fa-eye-low-vision';

			}
		});
	} else {
		let image_input = document.getElementById('user-image');
		let image = document.getElementById('output');
		let input_value_check = ["", null, 'undefined'];

		image_input.addEventListener('change', function () {

			if (input_value_check.includes(image_input.value) === false) {
				const reader = new FileReader(); // Converts the file into a data url(contains info of the file)

				reader.addEventListener('load', () => {
					reader.result;
					image.src = reader.result;
				});

				reader.readAsDataURL(this.files[0]); // Gets the first selected file      
			} else {
				image.src = "";
			}
		});

		document.getElementById('user-submit-btn').addEventListener('click', newUserInfo);
	}
}

function userSignIn() {
	let username = document.getElementById('signin-username');
	let login_password = document.getElementById('signin-password');

	// const password = 'DEw0DPc6u7_2';
	const password = 'D';
	lowercase_username = username.value.toLowerCase().trim();

	if (usernames.includes(lowercase_username) && password === login_password.value) {
		window.location.replace('http://127.0.0.1:5500/display.html');
	} else if (usernames.includes(lowercase_username) && password !== login_password.value) {
		login_password.value = "";
		alert('Incorrect Password Enterered');
		return;
	} else if (!usernames.includes(lowercase_username) && password === login_password.value) {
		username.value = "";
		alert('Incorrect Username Enterered');
		return;
	} else {
		username.value = "";
		login_password.value = "";
		alert('Incorrect Username and Password Enterered');
		return;
	}
}

function newUserInfo() {
	let fullname = document.getElementById('user-fullname');
	let phone_number = document.getElementById('user-phone-number');
	let user_image = document.getElementById('user-image');

	let day = document.getElementById('day');
	let month = document.getElementById('month');
	let year = document.getElementById('year');

	fullname = fullname.value;
	phone_number = phone_number.value;
	user_image = user_image.value;

	let input_value_check = ["", null, 'undefined'];

	if (input_value_check.includes(user_image)) {
		user_image = './images/display-images/placeholder.jpg';
	} else {
		let image = document.getElementById('output');
		user_image = image.src;
	}

	if (typeof fullname === 'string') {
		if (typeof Number(phone_number) === 'number' && phone_number.charAt(0) === '0' && phone_number.length === 10) {
			if (day.value.length, month.value.length === 2 && year.value.length === 4 && Number(day.value) <= 31 && Number(month.value) <= 12 && Number(year.value) < 2009) {
				birthDay = [day.value, month.value, year.value];
				if (birthDay.length > 0) {
					for (let i = 0; i < birthDay.length; i++) {
						if (typeof birthDay[i] === 'number' && birthDay[3] > 2008) {
							birthDay = [];
							break;
						}
					}

					birth_date = `${birthDay[0]}/${birthDay[1]}/${birthDay[2]}`;
					phone_number = String(phone_number);
					addUserToDatabase(fullname, user_image, birth_date, phone_number);
					birthDay = [];
				}
			} else {
				alert('Check name input if you entered an incorrect value');
				return;
			}
		} else {
			alert('Check phone number input if you entered an incorrect value');
			return;
		}
	} else {
		alert('Check fullname input if you entered an incorrect value');
		return;
	}
}

function userInfo() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then((response) => response.json())
		.then((data) => {
			let yp = data.yp_data;
			let username;

			if (yp.length === 0) {
				alert('There is no data to view');
				return;
			} else {
				for (i of yp) {
					username = i['full_name'].toLowerCase().trim();
					if (usernames.includes(username) === false) {
						usernames.push(username);
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
	let user_data = {
		'full_name': fullName,
		'profile_image': userImage,
		'phone_number': phoneNumber,
		'birthday': birthDate
	};

	fetch(`http://127.0.0.1:5000/new_user/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user_data)
	})
		.then((response) => response.json())
		.then((data) => {
			user_data = JSON.stringify(user_data);
			if (data.status_code === 201) {
				window.localStorage.setItem('user', JSON.stringify(user_data));
				alert('successful registration');
				return;
			} else {
				alert('unsuccessful registration');
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

createForms('signup-form');
