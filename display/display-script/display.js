window.onload = () => {
  createPage(0);
};

let navBtns = document.querySelectorAll(".nav-link");

navBtns.forEach((navBtn) => {
  navBtn.addEventListener("click", () => {
    let monthValue = navBtn.value;
    createPage(monthValue);
  });
});


function createPage(monthValue) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[monthValue];

  let monthPageData = {
    month: month,
    monthBackground: `./images/display-images/${month}.jpg`,
  };

  let monthHeading = document.querySelector("#month-heading");

  monthHeading.innerHTML = `${month} Birthdays`;
  document.body.style = `background-image: url(${monthPageData["monthBackground"]}), linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))`;
}

function userInfo() {
	fetch(`http://127.0.0.1:5000/view_yp_profiles/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => {
			let yp = data.yp_data;

			if(yp.length === 0){
				alert("There is no data to view")
			}else{
				for(i of yp){
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

	console.log(info["birthday"].substr(3, 2));

	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


	let ypCard = `
	<div id="${info["yp_id"]}" class="info-card">
	<img src="${info["profile_image"]}" alt="person-image" class="person-image" />
	<div class="persons-info">
	<p>${info["full_name"]}</p>
	<p>${age}</p>
	<p>${info["birthday"]}</p>
	<p>${info["phone_number"]}</p>
	</div>
	`;



	ypInfoDisplay.innerHTML += ypCard
  }

userInfo()

function getAge(birthdayDate){
	let today = new Date();
    let birthDate = new Date(birthdayDate);

    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
	
	return age
}
