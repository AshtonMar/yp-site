function createAdminTable(yp_information, heading_names) {

	if (yp_information == undefined || heading_names == undefined)
		return { "created": false };

	const heading_columns = document.getElementById("table-headings");
	const information_columns = document.getElementById("table-information");

	for (const heading_name of heading_names) {
		if (heading_name !== "profile_image" && heading_name !== "yp_id") {
			const heading_column_structure = `<div class="table-heading">${heading_name}</div>`;

			heading_columns.innerHTML += heading_column_structure;
		}
	}

	for (const yp_person of yp_information) {
		const yp_person_row = `<div id="table-row-${yp_person["yp_id"]}" class="table-row"></div>`;

		information_columns.innerHTML += yp_person_row;

		const yp_person_row_column = document.getElementById(`table-row-${yp_person["yp_id"]}`);

		for (const key of heading_names) {
			if (key !== "profile_image" && key !== "yp_id") {
				const yp_person_columns = `<div class="table-column">${yp_person[key]}</div>`;

				yp_person_row_column.innerHTML += yp_person_columns;
			}
		}
	}

	return { "created": true, "info": yp_information };
}


function rowControls(yp_information) {
	let row_id = 1;

	let data_rows = document.getElementsByClassName("table-row");
	for (const row of data_rows) {
		row.addEventListener("click", () => {
			row_id = parseInt(row.id.split("-")[2]);
			getUser(row_id);
		})
	};

	getUser = (selected_id) => {
		for (let user_info of yp_information) {
			if (user_info["yp_id"] === selected_id) {
				highlightRow(data_rows, selected_id)
				adminControls(user_info);
			}
		}
	}
}

function highlightRow(user_rows, id) {
	for (const user_row of user_rows) {
		if (user_row && Number(user_row.id.split("-")[2]) === id && user_row.className.split(" ")[1] !== "highlighted") {
			user_row.className += " highlighted";
		} else {
			user_row.className = "table-row";
		}
	}
}

function adminControls(userInfo) {
	const update_btn = document.getElementById("update-btn");
	const delete_btn = document.getElementById("delete-btn");
	const exit_btn = document.getElementById("exit-button");

	let age = getAge(userInfo['birthday']);

	const popup_templates = {
		update_popup: `
		<div class="popup-background">
			<div id="update_popup">
				<div class="user-info">
					<img id="popup-img" src="${userInfo['profile_image']}" width="100%"/>	
					<input value="${userInfo['full_name']}" id="name-input"/>
					<input disabled="true" value="${age}" id="age-input"/>
					<input value="${userInfo['birthday']}" id="birthday-input"/>
				</div>
				<button id="popup-update-btn">Update</button>
			</div>
		</div>`,
		confirmation_popup: `
		<div class="popup-background">
			<div id="confirmation_popup">
				<div id="confirmation-text"></div>
				<div class="confirmation-buttons">
					<button class="confirmation_buttons" id="yes">Yes</button>
					<button class="confirmation_buttons" id="no">No</button>
				</div>
			</div>
		</div>`
	}

	const body = document.getElementsByTagName("body")[0];
	update_btn.addEventListener('click', () => {
		body.innerHTML += popup_templates["update_popup"];
		const update = document.getElementById("popup-update-btn");

		update.addEventListener("click", () => {
			const yp_name = document.getElementById("name-input").value;
			const yp_birthday = document.getElementById("birthday-input").value;

			let user_values = [yp_name, yp_birthday];
			let updated_values = {};

			if (user_values[0] !== userInfo['full_name']) {
				updated_values['full_name'] = user_values[0];
			}

			if (user_values[1] !== userInfo['birthday']) {
				updated_values['birthday'] = user_values[1];
			}

			if (updateUserData(userInfo["yp_id"], updated_values))
				console.log("Success");
			else
				console.log("Failure");
		})
	})

	delete_btn.addEventListener('click', () => {
		body.innerHTML += popup_templates["confirmation_popup"];

		let confirmation_text = document.getElementById('confirmation-text');
		let confirmButtons = document.querySelectorAll('.confirmation_buttons')

		confirmation_text.innerHTML = `Are you sure you want to delete ${userInfo['full_name']}'s information?`

		for (const btn of confirmButtons) {
			btn.addEventListener('click', () => {
				if (btn.id === 'yes') {
					deleteUserData(userInfo["yp_id"]);
				} else {
					console.log("no");
				}
			})
		}
	})

	exit_btn.addEventListener('click', () => {
		body.innerHTML += popup_templates["confirmation_popup"];

		let confirmation_text = document.getElementById('confirmation-text');
		let confirmButtons = document.querySelectorAll('.confirmation_buttons')

		confirmation_text.innerHTML = `Are you sure you want to exit?`

		for (const btn of confirmButtons) {
			btn.addEventListener('click', () => {
				if (btn.id === 'yes') {
					exitAdmin();
				} else {
					console.log("no");
				}
			})
		}
	})

}
