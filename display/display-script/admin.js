let navBtns = document.querySelectorAll(".nav-link");

navBtns.forEach((navBtn) => {
	navBtn.addEventListener("click", () => {
		let monthValue = navBtn.value;
		getMonthPage(monthValue);
	});
});

function getMonthPage(monthValue) {
	let userData = localStorage.getItem("ypData");
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let month = months[monthValue];

	let monthPageData = {
		month: month,
		monthBackground: `./images/display-images/${month}.jpg`,
	};

	let monthHeading = document.querySelector("#month-heading");

	monthHeading.innerHTML = `${month} Birthdays`;
	document.body.style = `background-image: url(${monthPageData["monthBackground"]}), linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))`;

	createCard(userData, month);
}

function createCard(peopleInfo, month) {
	const cardContainer = document.querySelector("#card-view");
	peopleInfo = JSON.parse(peopleInfo);

	peopleInfo.forEach(personsInfo => {
		let personsMonth = personsInfo["birthday"].substr(0, 2);
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		let imageSrc = personsInfo["personal_image"];
		let fullName = personsInfo["full_name"];
		let phoneNumber = personsInfo["phone_number"];
		let age = personsInfo["age"];
		let birthDay = personsInfo["birthday"];

		let card = `
		<div class="card">
			<div class="info-card">
				<img class="person-image" src="${imageSrc}" alt="">
				<div class="persons-info">
					<p class="name">${fullName}</p>
					<p class="phone-number">${phoneNumber}</p>
					<p class="age">${age}</p>
					<p class="birthday">${birthDay}</p>
				</div>
			</div>
		</div>
		`;


		console.log(personsMonth.substr(1, 1));

		let classMatch = Number(personsMonth.substr(1, 1));
		console.log(classMatch, months.indexOf(month), month);
		cardContainer.innerHTML = "";

		const noBirthdayMessage = `
		<div id="no-birthdays">
			<p style="font-size: 50px; color:black;">No birthdays in this month</p>
		</div>
		`;

		if (classMatch == months.indexOf(month) && months.includes(month)) {
			console.log("Card Added");
			cardContainer.innerHTML = card;
		} else {
			console.log("Card Not For The Month");
			cardContainer.innerHTML = noBirthdayMessage;

		}
	});
}

window.onload = () => {
	getMonthPage(0);
};
