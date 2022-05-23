function fetchData() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then(data => {
			data = data.yp_data;
			userArray = data;
			console.log(userArray);
		})
		.catch((error) => {
			console.log(error);
		});
}

let userArray = [];

fetchData();

function adminFunctionality() {
	const displayBody = document.querySelector("body");
	const ypCards = document.querySelectorAll(".card");

	ypCards.forEach((ypCard) => {
		ypCard.addEventListener("click", () => {
			for (i of userArray) {
				let user = i;
				console.log(user["yp_id"], ypCard.id, user["yp_id"] == ypCard.id);
				if (user["yp_id"] == ypCard.id) {
					const age = getAge(i["birthday"]);
					const modalBody = `
						<div id="admin-functions-modal">
							<div id="admin-btn" class="admin-functions-view">
							</div>
							<div id="admin-options">
								<button id="delete-user-btn" value="${i["yp_id"]}">Delete User</button>
								<button id="user-update-btn" value="${i["yp_id"]}">Update User</button>
							</div>
							<div class="user-info">
								<div class="info">
									<img class="person-image" src="${i["profile_image"]}" alt="${i["full_name"]}-image">
										<div class="persons-info">
											<p class="name">${i["full_name"]}</p>
											<p class="age">${age}</p>
											<p class="birthday">${i["birthday"]}</p>
											<p class="phone-number">${i["phone_number"]}</p>
										</div>
								</div>
							</div>
						</div>
						`;

					displayBody.innerHTML += modalBody;

					const adminModal = document.getElementById("admin-functions-modal");
					adminModal.style.filter = "opacity(1)";
					adminModal.style.zIndex = "995";

					const updateBtn = document.getElementById("user-update-btn");
					const deleteBtn = document.getElementById("delete-user-btn");

					updateBtn.addEventListener('click', updateInfo(user));
					deleteBtn.addEventListener('click', deleteInfo);

					const modalExitBtn = document.querySelector(".admin-functions-view").addEventListener('click', () => {
						adminModal.style.filter = "opacity(0)";
						adminModal.style.zIndex = "-1";
					});

				} else {
					return;
				}

			}
		});
	});
}

function updateInfo(usersInfo) {
	const adminModal = document.getElementById("admin-functions-modal");

	const updateForm = `
	<form action="#" id="update-user-info" class="update-form">
		<input autocomplete="off" id="user-fullname" class="input" required type="text"
			placeholder="Full Name" />
		<input autocomplete="off" id="user-phone-number" class="input" required type="number"
			max-length="10" placeholder="Phone Number" />
		<input autocomplete="off" id="user-image" class="input" type="file" accept="image/*"
			placeholder="Personal Image" />
		<img id="output" width="100%" />
		<div class="birthdate-entry">
			<input autocomplete="off" id="month" class="date-input input" required type="number"
				placeholder="mm" maxlength="2" />
			<label class="divider">/</label>
			<input autocomplete="off" id="day" class="date-input input" required type="number"
				placeholder="dd" maxlength="2" />
			<label class="divider">/</label>
			<input autocomplete="off" id="year" class="date-input input" required type="number"
				placeholder="yyyy" maxlength="4" />
		</div>
		<button id="update-info-btn">Update Info</button>
	</form>
	`;

	adminModal.innerHTML = updateForm;

	const UpdateBtn = document.querySelector("#update-info-btn").addEventListener('click', () => {
		const nameUpdateInput = document.querySelector("#user-fullname").value;
		const imageUpdateInput = document.querySelector("#user-phone-number").value;
		const phoneNumberUpdateInput = document.querySelector("#user-image").value;
		const birthmonthInput = document.querySelector("#month").value;
		const birthdayInput = document.querySelector("#day").value;
		const birthyearInput = document.querySelector("#year").value;
		const birthdateUpdateInput = `${birthmonthInput}/${birthdayInput}/${birthyearInput}`;

		console.log(usersInfo);
		console.log(nameUpdateInput, imageUpdateInput, phoneNumberUpdateInput, birthdateUpdateInput);
	});
}

function deleteInfo() {
	const adminModal = document.getElementById("admin-functions-modal");
	const deleteForm = `
	<form action="#" id="update-user-info" class="update-form">
		<input autocomplete="off" id="user-fullname" class="input" required type="text"
			placeholder="Full Name" />
		<input autocomplete="off" id="user-phone-number" class="input" required type="number"
			max-length="10" placeholder="Phone Number" />
	</form>
	`;
}
