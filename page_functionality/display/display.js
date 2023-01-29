window.onload = () => {
	getUserObject();
	users = JSON.parse(window.localStorage.getItem("user_data"));
	createCardTemplate(users);
	new searchNavigation();
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

			const signin_btn = document.getElementById("signin-btn"); JSON.parse(json)
			document.getElementById("toggle-password").onclick = togglePassword();

			signin_btn.addEventListener("click", adminSignIn);
		};

		this.search_input.addEventListener("input", (e) => {
			const value = e.target.value.toLowerCase();
			console.log(value);
			users["data"].forEach(user => {
				const isVisible = user["Full Name"].toLowerCase().includes(value) || user["Birthday"].includes(value);

			});
		});
	}
};

function createCardTemplate(users) {
	const ypCardTemplate = document.querySelector("[data-user-template]");
	const ypCardContainer = document.getElementById("card-view");

	users = info.map(user => {
		const card = ypCardTemplate.content.cloneNode(true).children[0];

		card.id = user["yp_id"];

		const body = card.querySelector("[data-body]");
		const image = body.querySelector("[data-image]");
		const name = body.querySelector("[data-name]");
		const age = body.querySelector("[data-age]");
		const birthDay = body.querySelector("[data-birthday]");

		const ypAge = getAge(user["birthday"]);

		image.src = user["profile_image"];
		name.textContent = user["full_name"];
		age.textContent = ypAge;
		birthDay.textContent = user["birthday"];

		ypCardContainer.append(card);

		return { element: card, name: user["full_name"], age: ypAge, birthday: user["birthday"] };
	});
}
