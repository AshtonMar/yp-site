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

// function fetchData() {}

function createPage(monthValue) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[monthValue];

  let monthPageData = {
    month: month,
    monthBackground: `./images/display-images/${month}.jpg`,
  };

  let monthHeading = document.querySelector("#month-heading");

  monthHeading.innerHTML = month;
  document.body.style = `background-image: url(${monthPageData["monthBackground"]}), linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))`;
}

function createCard(info) {
  let personCard = `
  <div class="info-card">
  <img src="../images/display-images/placeholder.jpg" alt="person-image" class="person-image" />
  <div class="persons-info">
    <p>Ashton Martin</p>
    <p>074 975 0527</p>
    <p>01/01/0001</p>
    <p>19</p>
  </div>
  `;
}
// function makeCard(info) {
//   let dob = info["birthday"];
//   let age = getUserAge(dob);
//   let image = info["profile_image"];
//   localStorage.setItem("info", JSON.stringify(info));

//   if (image === "" || image === null) {
//     image = "./images/placeholder.jpg";
//   } else {
//     // pass
//   }
//   return `
// <div class="profile-card">
//   <p class="content-listing card-content">Name</p>
//   <p class="card-content name">${info["full_name"]}</p>
//   <p class="content-listing card-content">Phone Number</p>
//   <p class="card-content phone-number">${info["phone_number"]}</p>
//   <p class="content-listing card-content">Age</p>
//   <p class="card-content age">${age}</p>
//   <p class="content-listing card-content">Birthday</p>
//   <p class="card-content birthday">${info["birthday"]}</p>
//   <button value="${info["yp_id"]}" onclick="deleteInfo(${info["yp_id"]})" class="delete-btn">Delete</button>
// </div> `;
// }

// function getUserAge(birthDay) {
//   let day = birthDay.substr(0, 2);
//   let month = birthDay.substr(3, 2);
//   let year = birthDay.substr(6, 4);

//   day = Number(day);
//   month = Number(month);
//   year = Number(year);
//   let age = calculateAge(new Date(year, month, day));
//   console.log(age);

//   return age;
// }

// function calculateAge(dob) {
//   let difference = Date.now() - dob.getTime();
//   let ageDate = new Date(difference);
//   let ageCalc = Math.abs(ageDate.getUTCFullYear() - 1970);

//   return ageCalc;
// }

// function deleteInfo(yp_id) {
//   fetch("https://yp-database.herokuapp.com/delete_userinfo/" + yp_id + "/", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => response.json())
//     .then(() => {
//       alert("Successfully Deleted The UserInfo");
//       window.location.reload();
//     });
// }

// function getInfo() {
//   fetch("https://yp-database.herokuapp.com/view_profiles/")
//     .then((response) => response.json())
//     .then((data) => {
//       let ypData = data.yp_data;

//       ypData.forEach((yp) => {
//         console.log(yp);
//         let birthday = yp["birthday"];
//         let janContainer = document.querySelector("#jan-container");
//         let febContainer = document.querySelector("#feb-container");
//         let marContainer = document.querySelector("#mar-container");
//         let aprContainer = document.querySelector("#apr-container");
//         let mayContainer = document.querySelector("#may-container");
//         let junContainer = document.querySelector("#jun-container");
//         let julContainer = document.querySelector("#jul-container");
//         let augContainer = document.querySelector("#aug-container");
//         let sepContainer = document.querySelector("#sep-container");
//         let octContainer = document.querySelector("#oct-container");
//         let novContainer = document.querySelector("#nov-container");
//         let decContainer = document.querySelector("#dec-container");

//         if (yp["birthday"].substr(3, 2) === "01") {
//           janContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "02") {
//           febContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "03") {
//           marContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "04") {
//           aprContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "05") {
//           mayContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "06") {
//           junContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "07") {
//           julContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "08") {
//           augContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "09") {
//           sepContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "10") {
//           octContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "11") {
//           novContainer.innerHTML += makeCard(yp);
//         } else if (yp["birthday"].substr(3, 2) === "12") {
//           decContainer.innerHTML += makeCard(yp);
//         } else {
//           console.log("A Users Info Is Incorrect");
//         }
//       });
//     });
// }

// getInfo();

// window.addEventListener("keyup", function closeWindow(event) {
//   let x = event.key;
//   if (x === "X") {
//     window.location.href = "./index.html";
//   }
// });
