let users = [];

class searchNavigation {
	searchInput;
	modalBtn;
	togglepassWord;

	constructor() {
		let modal = document.getElementById("admin-modal");
		this.searchInput = document.querySelector("[data-search]");
		this.modalBtn = document.getElementById("admin-btn");
		this.togglepassWord = document.getElementById("toggle-password");

		this.togglepassWord.addEventListener("click", () => {
			let password = document.querySelector("#admin-password");

			if (password.type === "password") {
				password.type = "text";
				document.getElementById("toggle-password").className = "fa-regular fa-eye";
			} else {
				password.type = "password";
				document.getElementById("toggle-password").className = "fa-solid fa-eye-low-vision";
			}
		});

		this.modalBtn.onclick = function () {
			if (modal.style.filter == "opacity(1)") {
				modal.style = `
				filter: opacity(0);
				z-index: -1;`;
			} else {
				modal.style = `
				filter: opacity(1);
				z-index: 985;`;
			}

			const signInBtn = document.getElementById("sign-in-btn");

			signInBtn.addEventListener("click", adminSignIn);
		};

		this.searchInput.addEventListener("input", (e) => {
			const value = e.target.value.toLowerCase();

			users.forEach(user => {
				let age = String(user["age"]);
				let birthDay = user["birthday"];

				const isVisible = user["name"].toLowerCase().includes(value) || age.includes(value) || birthDay.includes(value);
				user["element"].classList.toggle("hide", !isVisible);

			});
		});
	}
};

function userInfo() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then(data => {
			data = data.yp_data;

			let ypDataArray = [];

			data.forEach(user => {
				let ypAge = getAge(user["birthday"]);
				let ypData = {
					full_name: user["full_name"],
					personal_image: user["profile_image"],
					age: ypAge,
					birthday: user["birthday"],
					phone_number: user["phone_number"]
				};

				ypDataArray.push(ypData);

			});
			window.localStorage.setItem("ypData", JSON.stringify(ypDataArray));

			ypProfileCard(data);
		})
		.catch((error) => {
			console.log(error);
		});
}

function getAge(birthdayDate) {
	let today = new Date();
	let birthDate = new Date(birthdayDate);

	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();

	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	return age;
}

function ypProfileCard(info) {
	const ypCardTemplate = document.querySelector("[data-user-template]");
	const ypCardContainer = document.querySelector("#card-view");

	users = info.map(user => {
		const card = ypCardTemplate.content.cloneNode(true).children[0];

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

function adminSignIn() {
	const usernameValue = document.getElementById("admin-username").value.toLowerCase().trim();
	const passwordValue = document.getElementById("admin-password").value.toLowerCase().trim();

	let usersInfo = {
		username: "Ashton Martin",
		password: "vMvwST6y75cTRk"
	};

	JSON.stringify(usersInfo);

	if (usernameValue === usersInfo["username"].toLowerCase() && passwordValue === usersInfo["password"].toLowerCase()) {
		alert(`Welcome ${usersInfo["username"]}`);
		document.querySelector("#admin-form").action = "/admin.html";
	} else if (usernameValue === usersInfo["username"] && passwordValue !== usersInfo["password"]) {
		alert("The password is incorrect");
	} else if (usernameValue !== usersInfo["username"] && passwordValue === usersInfo["password"]) {
		alert("The username is incorrect");
	} else if (usernameValue !== usersInfo["username"] && passwordValue !== usersInfo["password"]) {
		alert("The login info you entered is incorrect");
	}

	usernameValue.value = "";
	passwordValue.value = "";
}

window.onload = () => {
	userInfo();
	const search = new searchNavigation();
};
