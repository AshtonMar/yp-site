const exit_btn = document.getElementById("exit-btn");
exit_btn.onclick = () => { previousPage('display') };
window.onload = () => {
	getUserObject();
	let database = createAdminTable(JSON.parse(window.localStorage.getItem("user_data")));
	rowControls(database);
};

function createAdminTable(user_info) {
	if (user_info == undefined)
		return false;

	createColumnHeadings(Object.keys(user_info['data'][0]));
	for (const user_data of user_info['data']) {
		createUserRows(user_data);
	}

	return user_info["data"];
}

function createColumnHeadings(column_headings) {
	const column_heading_container = document.getElementById("table-column-headings");

	for (const heading of column_headings) {
		if (heading !== "id") {
			const column_heading = `
				<div class="table-column-heading"> ${heading} </div>
			`;

			column_heading_container.innerHTML += column_heading;
		}
	}
}

function createUserRows(user_data) {
	const column_container = document.getElementById("table-columns");

	column_container.innerHTML += `<div id="table-row-${user_data["id"]}" class="table-row"></div>`;
	const table_row = document.getElementById(`table-row-${user_data["id"]}`);

	for (const key in user_data) {
		if (key !== "id" && key !== "Profile Image") {
			const table_column = `<div class="table-column">${user_data[key]}</div>`;
			table_row.innerHTML += table_column;
		} else if (key !== "id" && key === "Profile Image") {
			const table_column = `<img src="${user_data[key]}" class="table-column image">`;
			table_row.innerHTML += table_column;
		}
	}

}

function rowControls(data) {
	if (data === false) return;

	let data_rows = document.getElementsByClassName("table-row");
	getUser = (selected_id) => {
		for (const user_info of data) {
			if (user_info["id"] === selected_id) {
				highlightRow(data_rows, selected_id)
				adminControls(user_info);
			}
		}
	}

	for (const row of data_rows) {
		row.addEventListener("click", () => {
			getUser(parseInt(row.id.split("-")[2]));
		})
	};
}

function highlightRow(user_rows, id) {
	if (user_rows) {
		for (const user_row of user_rows) {
			const isHighlighted = Number(user_row.id.split("-")[2]) === id

			user_row.classList.toggle("highlighted", isHighlighted);
		}
	}
}

function adminControls(user_info) {
	const update_btn = document.getElementById("update-btn");
	const delete_btn = document.getElementById("delete-btn");

	const age = getAge(user_info['Birthday']);
	const popup_templates = {
		update_popup: `
		<div id="popup-background">
			<div id="update_popup">
				<div class="user-info">
					<img id="popup-img" src="${user_info['Profile Image']}" width="100%"/>	
					<input value="${user_info['Full Name']}" id="name-input"/>
					<input disabled="true" value="${age}" id="age-input"/>
					<input value="${user_info['Birthday']}" id="birthday-input"/>
				</div>
				<button id="popup-update-btn">Update</button>
			</div>
		</div>`,
		confirmation_popup: `
		<div id="popup-background">
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
		body.innerHTML = popup_templates["update_popup"];
		const update = document.getElementById("popup-update-btn");

		update.addEventListener("click", () => {
			const yp_name = document.getElementById("name-input").value;
			const yp_birthday = document.getElementById("birthday-input").value;

			let user_values = [yp_name, yp_birthday];
			let updated_values = {};

			if (user_values[0] !== user_info['Full Name']) {
				updated_values['full_name'] = user_values[0];
			}

			if (user_values[1] !== user_info['Birthday']) {
				updated_values['birthday'] = user_values[1];
			}

			updateUserData(user_info["id"], updated_values);
		})
	})

	delete_btn.addEventListener('click', () => {
		body.innerHTML = popup_templates["confirmation_popup"];

		const confirmation_text = document.getElementById('confirmation-text');
		const confirmButtons = document.querySelectorAll('.confirmation_buttons')

		confirmation_text.innerHTML = `
			Are you sure you want to delete ${user_info['Full Name']}'s Details?
		`

		for (const btn of confirmButtons) {
			btn.addEventListener('click', () => {
				if (btn.id === 'yes') {
					deleteUserData(user_info["id"]);
				} else {
					console.log("no");
					window.location.reload();
				}
			})
		}
	})

}
