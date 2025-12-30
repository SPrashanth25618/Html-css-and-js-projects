const form = document.getElementById("register-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const requiredisFilled = checkRequired([
    username,
    email,
    password,
    confirmPassword,
  ]);
});

function checkRequired(arr) {
  let isvalid = true;
  arr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input,`${formatFieldName(input)} is required`);
      isvalid = false;
    }else{
      showSuccess(input);
    }
  });
  return true;
}

function formatFieldName(input){
  return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

function showError(input,message){
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input){
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";

}