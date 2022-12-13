function fetchData() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then(data => {
			data = data.yp_data;
			let table_headings = Object.keys(data[0]);

			const admin_table_created = createAdminTable(data, table_headings);
			if (admin_table_created["created"])
				rowControls(admin_table_created["info"]);
		})
		.catch((error) => {
			console.log(error);
		});
}

fetchData();

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
			getUser();
		})
	};

	getUser = () => {
		for (let user_info of yp_information) {
			if (user_info["yp_id"] === row_id) {
				adminControls(user_info);
			}
		}
	}
}

function adminControls(userInfo) {
	// const update_btn = document.getElementById();
	// const delete_btn = document.getElementById();
	// const exit_btn = document.getElementById();

	console.log(userInfo);

	update_popup = `
		<div class="popup">
			<div class="popup-info">
				<img class="user-image" src="" alt="">
				<div class="user-info">
					<input class="name"/>
					<input class="age"/>
					<input class="birthday"/>
				</div>
			</div>
		</div>`
}
