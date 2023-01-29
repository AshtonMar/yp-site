window.onload = () => {
	let user_values = [];
	getUserObject();
	createCardTemplate(JSON.parse(window.localStorage.getItem("user_data")));
	new searchNavigation();
};

class searchNavigation {
	search_input;
	modal_btn;
	toggle_password;
	exit_btn;

	constructor() {
		const modal = document.getElementById("admin-modal");
		this.search_input = document.getElementById("search-bar");
		this.modal_btn = document.getElementById("admin-login-btn");
		this.exit_btn = document.getElementById("home-button");

		this.modal_btn.onclick = () => {
			if (modal.style.filter == "opacity(1)") {
				modal.style = `
					filter: opacity(0);
					z-index: -1;
				`;
			} else {
				modal.style = `
					filter: opacity(1);
					z-index: 985;
				`;
			}

			const admin_form = `
				<form id='signin-form' class='form' action='#'>
					<input required autocomplete='off' id='signin-username' type='text' placeholder='Username' />
					<div class='view-password'>
						<input required autocomplete='off' id='signin-password' type='password' placeholder='Password' />
						<i id='toggle-password' class='fa-solid fa-eye-low-vision'></i>
					</div>
					<button id='signin-btn' type='submit' value='submit'>Sign In</button>
				</form>
			`;

			modal.innerHTML = admin_form;

			const signin_form = document.getElementById('signin-form');
			signin_form.addEventListener('submit', () => signIn('admin'));

			this.toggle_password = document.getElementById("toggle-password");
			this.toggle_password.onclick = togglePassword();
		};

		this.search_input.addEventListener("input", (e) => {
			const value = e.target.value.toLowerCase();

			for (const card of user_values) {
				const isVisible = card["name"].toLowerCase().includes(value) || card["birthday"].includes(value);
				card["element"].classList.toggle("hide", !isVisible);
			}
		});

		this.exit_btn.onclick = () => { previousPage('index') };
	}
};

function createCardTemplate(users) {
	const card_template = document.querySelector("[data-user-template]");
	const card_container = document.getElementById("card-view");

	user_values = users["data"].map(user => {
		const card = card_template.content.cloneNode(true).children[0];
		const body = card.querySelector("[data-body]");
		const image = body.querySelector("[data-image]");
		const name = body.querySelector("[data-name]");
		const birthday = body.querySelector("[data-birthday]");

		card.id = user["id"];
		image.src = user["Profile Image"];
		name.textContent = user["Full Name"];
		birthday.textContent = user["Birthday"];

		card_container.append(card);

		return { element: card, name: user["Full Name"], birthday: user["Birthday"] };
	});
}
