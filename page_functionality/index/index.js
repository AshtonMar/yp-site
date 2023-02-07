let signin_btn = document.getElementById('signin-btn');
let signup_btn = document.getElementById('signup-btn');

signin_btn.addEventListener('click', () => {
	createForms(signin_btn.value);
});

signup_btn.addEventListener('click', () => {
	createForms(signup_btn.value);
});

function createForms(form) {
	getUserObject();
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
		document.getElementById('signin-form').addEventListener('submit', () => signIn('user'));
		document.getElementById("toggle-password").onclick = togglePassword();
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

		document.getElementById('user-submit-btn').addEventListener('click', signUp);
	}
}

createForms('signup-form');
