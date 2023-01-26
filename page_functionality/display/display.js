window.onload = () => {
	let users = [];
	new searchNavigation();
	userInfo();
};

class searchNavigation {
	search_input;
	modal_btn;

	constructor() {
		const modal = document.getElementById("admin-modal");
		this.search_input = document.getElementById("search-bar");
		this.modal_btn = document.getElementById("admin-btn");

		this.modal_btn.onclick = function () {
			if (modal.style.filter == "opacity(1)") {
				modal.style = `
				filter: opacity(0);
				z-index: -1;`;
			} else {
				modal.style = `
				filter: opacity(1);
				z-index: 985;`;
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

			const signin_btn = document.getElementById("signin-btn");
			document.getElementById("toggle-password").onclick = togglePassword();

			signin_btn.addEventListener("click", adminSignIn);
		};

		this.search_input.addEventListener("input", (e) => {
			const value = e.target.value.toLowerCase();

			users.forEach(user => {
				let birthday = user["birthday"];

				const isVisible = user["name"].toLowerCase().includes(value) || birthday.includes(value);
				user["element"].classList.toggle("hide", !isVisible);

			});
		});
	}
};

function ypProfileCard(info) {
	const card_template = document.querySelector("[data-user-template]");
	const card_container = document.querySelector("#card-view");

	users = info.map(user => {
		const card = card_template.content.cloneNode(true).children[0];

		card.id = user["yp_id"];

		const body = card.querySelector("[data-body]");
		const image = body.querySelector("[data-image]");
		const name = body.querySelector("[data-name]");
		const birthday = body.querySelector("[data-birthday]");

		image.src = user["profile_image"];
		name.textContent = user["full_name"];
		birthday.textContent = user["birthday"];

		card_container.append(card);

		return { element: card, name: user["full_name"], birthday: user["birthday"] };
	});
}
