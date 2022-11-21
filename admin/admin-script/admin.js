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
				adminControls(admin_table_created["info"]);
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


function adminControls(yp_information) {
	// const update_btn = document.getElementById();
	// const delete_btn = document.getElementById();
	// const exit_btn = document.getElementById();

	const data_rows = document.getElementsByClassName("table-row");

	for (const row of data_rows) {
		row.addEventListener("click", () => {
			let row_id = row.id.split("-");
			let info_id = parseInt(row_id[row_id.length - 1]);

			for (const yp_info of yp_information) {
				if (info_id === yp_info["yp_id"]) {
					row.className = "highlighted_row";
				} else {
					row.className = "table-row";
				}
			}

		})
	}

}
