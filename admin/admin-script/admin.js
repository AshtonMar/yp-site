const exitBtn = document.getElementById("exit-btn");

exitBtn.addEventListener("click", () => {
	const adminExit = confirm("You about to exit?");

	if (adminExit === "ok") {
		alert("All the changes you have made will be saved. Enjoy your day further.")
	}
})

function fetchData() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then(data => {
			data = data.yp_data;
			createYpDataRow(data)
		})
		.catch((error) => {
			alert(error);
		});
}

fetchData()

function getUsersId(usersName) {
	fetch(`http://127.0.0.1:5000/fetch_yp_id/${usersName}/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then(data => {
			let yp_id = data.yp_data[0]["yp_id"];
			return yp_id;
		})
		.catch((error) => {
			console.log(error);
		});
}

function createYpDataRow(youngPeople) {
	const table = document.getElementById("young-people-table");

	youngPeople.forEach(youngPerson => {
		const ypRow = `
		<tr tr class="yp-row admin-control" >
			<td class="id-column hidden">${youngPerson["yp_id"]}</td>
			<td class="info-column"><img class="table-image" src="${youngPerson["profile_image"]}" alt="yp-image"></td>
			<td class="info-column">${youngPerson["full_name"]}</td>
			<td class="info-column">${youngPerson["birthday"]}</td>
			<td class="info-column">${youngPerson["phone_number"]}</td>
		</tr >`;

		table.innerHTML += ypRow;
	});

	let adminControlRow = document.querySelectorAll(".yp-row.admin-control");

	let clicks = 0
	adminControlRow.forEach(row => {
		row.addEventListener("click", () => {
			clicks = clicks + 1
			if (clicks == 2) {
				let ypName = row.children[2].innerHTML;
				console.log(getUsersId(ypName));
				clicks = 0;
			}
		})
	});
}


function adminFunctionality() {
	const displayBody = document.querySelector("body");
	const ypCards = document.querySelectorAll(".card");

	ypCards.forEach((ypCard) => {
		ypCard.addEventListener("click", () => {
			for (user of userArray) {
				console.log(userArray);
				if (user["yp_id"] == ypCard.id) {
					const age = getAge(user["birthday"]);
					const modalBody = `
						<div id="admin-functions-modal">
							<div id="admin-btn" class="admin-functions-view">
							</div>
							<div id="admin-options">
								<button id="delete-user-btn" value="${user["yp_id"]}">Delete User</button>
								<button id="user-update-btn" value="${user["yp_id"]}">Update User</button>
							</div>
							<div class="user-info">
								<div class="info">
									<img class="person-image" src="${user["profile_image"]}" alt="${user["full_name"]}-image">
										<div class="persons-info">
											<p class="name">${user["full_name"]}</p>
											<p class="age">${age}</p>
											<p class="birthday">${user["birthday"]}</p>
											<p class="phone-number">${user["phone_number"]}</p>
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
					const modalExitBtn = document.querySelector("#admin-btn.admin-functions-view");

					updateBtn.addEventListener('click', () => { updateInfo(user); });

					deleteBtn.addEventListener('click', () => { deleteInfo(); });

					modalExitBtn.addEventListener('click', () => {
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
		<button onclick="adminFunctionality()"  id="exit-btn" class="exit-btn-to-previous">Exit</button>
		<input autocomplete="off" id="user-fullname" class="input" type="text"
			placeholder="Full Name" />
		<input autocomplete="off" id="user-phone-number" class="input" type="number"
			max-length="10" placeholder="Phone Number" />
		<input autocomplete="off" id="user-image" class="input" type="file" accept="image/*"
			placeholder="Personal Image" />
		<img id="output" width="100%" />
		<div class="birthdate-entry">
			<input autocomplete="off" id="month" class="date-input input" type="number"
				placeholder="mm" maxlength="2" />
			<label class="divider">/</label>
			<input autocomplete="off" id="day" class="date-input input" type="number"
				placeholder="dd" maxlength="2" />
			<label class="divider">/</label>
			<input autocomplete="off" id="year" class="date-input input" type="number"
				placeholder="yyyy" maxlength="4" />
		</div>
		<button id="update-info-btn">Update Info</button>
	</form>
	`;

	adminModal.innerHTML = updateForm;

	const updateBtn = document.querySelector("#update-info-btn");

	updateBtn.addEventListener('click', () => {
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

function update(id) {
	fetch(`http://127.0.0.1:5000/edit_yp_profiles/${id}/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then(data => console.log(data))
		.catch((error) => {
			console.log(error);
		});
}

function deleteInfo() {
	const adminModal = document.getElementById("admin-functions-modal");
	const deleteForm = `
	<form action="#" id="update-user-info" class="update-form">
		<button onclick="adminFunctionality()" id="exit-btn" class="exit-btn-to-previous">Exit</button>
		<input autocomplete="off" id="user-fullname" class="input" required type="text"
			placeholder="Full Name" />
		<input autocomplete="off" id="user-phone-number" class="input" required type="number"
			max-length="10" placeholder="Phone Number" />
	</form>
	`;
}

function deleteUser(id) {
	fetch(`http://127.0.0.1:5000/delete_yp_profiles/${id}/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => console.log(response.json()))
		.then(() => {
			alert("Successfully Deleted The UserInfo");
		})
		.catch((error) => {
			console.log(error);
		});
}
