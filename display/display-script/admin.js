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

	createCard(userData, month)
}


let navBtns = document.querySelectorAll(".nav-link");

navBtns.forEach((navBtn) => {
	navBtn.addEventListener("click", () => {
		let monthValue = navBtn.value;
		getMonthPage(monthValue);
	});
});

function createCard(peopleInfo, month) {
	peopleInfo = JSON.parse(peopleInfo)

	console.log(peopleInfo, month);
	const cardTemplate = document.querySelector("#data-user-template")
	const card = cardTemplate.content.cloneNode(true).children[0]

	const imageSrc = card.querySelector(".person-image")
	const fullName = card.querySelector(".name")
	const phoneNumber = card.querySelector(".phone-number")
	const age = card.querySelector(".age")
	const birthDay = card.querySelector(".birthday")


	peopleInfo.forEach(personsInfo => {
		let personsMonth = personsInfo["birthday"].substr(0, 2)
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		if (personsMonth.substr(0, 1) == months.indexOf(month) && months.includes(month)) {
			imageSrc.src = personsInfo["profile_image"]
			fullName.textContent = personsInfo["full_name"]
			phoneNumber.textContent = personsInfo["birthday"]
			age.textContent = personsInfo["full_name"]
			birthDay.textContent = personsInfo["birthday"]

			console.log(card);
		} else {
			//pass
		}

	});
}

window.onload = () => {
	getMonthPage(0)
};
