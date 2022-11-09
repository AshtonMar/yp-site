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

fetchData();

function createYpDataRow(youngPeople) {
	const table = document.getElementById("young-people-table");

	youngPeople.forEach(youngPerson => {
		const ypRow = `
		<tr class="yp-row admin-control" >
			<td class="info-column">
			<i class="fa-solid fa-pen-to-square"></i>
				<button>Delete</button>
			</td>
			<td class="id-column hidden">${youngPerson["yp_id"]}</td>
			<td class="info-column"><img class="table-image" src="${youngPerson["profile_image"]}" alt="yp-image"></td>
			<td class="info-column">${youngPerson["full_name"]}</td>
			<td class="info-column">${youngPerson["birthday"]}</td>
			<td class="info-column">${youngPerson["phone_number"]}</td>
		</tr >`;

		table.innerHTML += ypRow;
	});
}
