let signInBtn = document.querySelector("#admin-form-btn");
let signUpBtn = document.querySelector("#new-user-form-btn");
signInBtn.disabled = true;

signInBtn.addEventListener("click", () => {
  console.log(signInBtn.value);
  createForms(signInBtn.value);
});

signUpBtn.addEventListener("click", () => {
  console.log(signUpBtn.value);
  createForms(signUpBtn.value);
});

function createForms(form) {
  let formSection = document.querySelector("#form-section");
  let currentForm;

  let adminForm = `
  <form id="admin-form" class="form" onsubmit="adminFormFunctionality()">
    <input autocomplete="off" id="admin-username" class="input" type="text" placeholder="Username" />
    <input autocomplete="off" id="admin-password" class="input" type="password" placeholder="Password" />
    <button id="admin-submit-btn" type="submit" value="submit">Sign In</button>
   </form>
`;

  let registrationForm = `
<form id="new-user-form" class="form" action="newUserFormFunctionality()">
  <input autocomplete="off" id="user-fullname" class="input" required type="text" placeholder="Full Name" />
  <input autocomplete="off" id="user-phone-number" class="input" required type="text" placeholder="Phone Number" />
  <input autocomplete="off" id="user-image" class="input" type="text" placeholder="Personal Image" />
  <div class="birthdate-format">
      <div class="birthdate-format-choice">
          <input autocomplete="off" id="format-one" type="radio" name="birthdate-format" value="1" />
          <label for="dd/mm/yyyy">dd/mm/yyyy</label>
      </div>
      <div class="birthdate-format-choice">
          <input autocomplete="off" id="format-two" type="radio" name="birthdate-format" value="2" />
          <label for="day month year">day month year</label>
      </div>
  </div>
  <div class="birthdate-entry"></div>
  <button id="user-submit-btn" type="submit" value="submit">Register User</button>
</form>
`;

  console.log(form);
  if (form === "admin-form") {
    currentForm = adminForm;

    signInBtn.disabled = true;
    signUpBtn.disabled = false;

    document.body.style = `
    background-image: url("../images/form-images/login-background.jpg"), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4));
    `;
  } else if (form === "new-user-form") {
    currentForm = registrationForm;

    signUpBtn.disabled = true;
    signInBtn.disabled = false;

    document.body.style = `
    background-image: url(../images/form-images/new-user-background.jpg), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4));
    `;
  }

  formSection.innerHTML = currentForm;

  if (currentForm == registrationForm) {
    let birthdateEntry = document.querySelector(".birthdate-entry");
    let formatOne = document.querySelector("#format-one");

    formatOne.addEventListener("click", () => {
      let birthDateFormatOne = `
      <input autocomplete="off" id="day" class="date-input input" required type="text" placeholder="dd" maxlength="2" />
      <label class="divider">/</label>
      <input autocomplete="off" id="month" class="date-input input" required type="text" placeholder="mm" maxlength="2" />
      <label class="divider">/</label>
      <input autocomplete="off" id="year" class="date-input input" required type="text" placeholder="yyyy" maxlength="4" />
      `;

      birthdateEntry.innerHTML = "";
      birthdateEntry.innerHTML = birthDateFormatOne;
    });

    let formatTwo = document.querySelector("#format-two");

    formatTwo.addEventListener("click", () => {
      let birthDateFormatTwo = `
      <input autocomplete="off" id="birthday" class="input" required type="text" placeholder="e.g 12 Jan 2002" />
      `;

      birthdateEntry.innerHTML = "";
      birthdateEntry.innerHTML = birthDateFormatTwo;
    });
  }
}

createForms("admin-form");

function createPass() {
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const calpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "1234567890";
  const specials = ",.!@#$%^&*";
  const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];

  let opt, choose;
  let pass = "";

  for (let i = 0; i < 8; i++) {
    opt = Math.floor(Math.random() * options.length);
    choose = Math.floor(Math.random() * options[opt].length);
    pass = pass + options[opt][choose];
    options.splice(opt, 1);
  }

  return pass;
}

let createdPassword = createPass();
console.log(createdPassword);

function adminFormFunctionality() {
  let adminUserName = document.querySelector("#admin-username");
  let adminPassword = document.querySelector("#admin-password");

  const userName = ["Charl", "Ashton"];
  const passWord = "pass";

  console.log(passWord);

  if ((adminUserName.value in userName && adminPassword.value === passWord) || createdPassword) {
    alert(`Welcome ${adminUserName.value}`);
    window.location.href = "./display/display.html";
  } else {
    alert("Incorrect Details");
  }
}

function newUserFormFunctionality() {}
