let signInBtn = document.querySelector("#admin-form-btn");
let signUpBtn = document.querySelector("#user-registration-form-btn");
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
  <form id="admin-form" class="form" action="">
    <input autocomplete="off" id="admin-username" class="input" type="text" placeholder="Username" />
    <input autocomplete="off" id="admin-password" class="input" type="password" placeholder="Password" />
    <button id="admin-submit-btn" type="submit" value="submit">Sign In</button>
   </form>
`;

  let registrationForm = `
<form id="new-user-form" class="form" action="">
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

  if (form === "admin-user") {
    currentForm = adminForm;

    signInBtn.disabled = true;
    signUpBtn.disabled = false;

    document.body.style = `
    background-image: url("../images/form-images/login-background.jpg"), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4));
    background-blend-mode: overlay;
    `;
  } else if (form === "new-user") {
    currentForm = registrationForm;

    signUpBtn.disabled = true;
    signInBtn.disabled = false;

    document.body.style = `
    background-image: url(../images/form-images/new-user-background.jpg), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4));
    background-blend-mode: overlay;
    `;
  }

  formSection.innerHTML = currentForm;
  newUserFormFunctionality();
}

createForms("admin-user");

function newUserFormFunctionality() {
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
