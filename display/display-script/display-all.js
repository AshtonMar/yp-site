function userInfo() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then((data) => {
			let yp = data.yp_data;

			if (yp.length === 0) {
				alert("There is no data to view")
			} else {
				for (i of yp) {
					console.log(i);
					ypProfileCard(i)
				}
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

function ypProfileCard(info) {
	let age = getAge(info["birthday"])
	let ypInfoDisplay = document.querySelector("#card-view");

	let ypCard = `
	<div id="${info["yp_id"]}" class="${info["full-name"]} info-card">
		<img src="${info["profile_image"]}" alt="person-image" class="person-image" />
		<div id="yp-info" class="persons-info">
			<li><a class="persons-name">${info["full_name"]}</a></li>
			<p>${age}</p>
			<li><a class="persons-name">${info["birthday"]}</a></li>
		</div>
	</div>
	`;

	ypInfoDisplay.innerHTML += ypCard
}

userInfo()

function getAge(birthdayDate) {
	let today = new Date();
	let birthDate = new Date(birthdayDate);

	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();

	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	return age
}

document.getElementById("search-bar").addEventListener("keyup", () => {
	let input = document.getElementById("search-bar");
	let cardValue = document.getElementsByClassName("info-card")

	console.log(cardValue.className);
	console.log(input.value);



})
