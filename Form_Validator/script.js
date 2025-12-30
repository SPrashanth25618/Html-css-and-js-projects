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
  
  let isFormValid = requiredisFilled;
  if(requiredisFilled){
    const isUsernameValid = checklength(username,3,15);    
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checklength(password,6,25);
    const isPasswordsMatch = checkPasswordsMatch(password,confirmPassword);
    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }
  if(isFormValid){
    alert("Registration Successfull");
    form.reset();
    document.querySelectorAll('.form-group').forEach(group => {
      group.className = "form-group";
    })
  }
});

function checkPasswordsMatch(password,confirmPassword){
  if(password.value !== confirmPassword.value){
    showError(password,"Passwords are not matched");
    showError(confirmPassword,"Passwords are not matched");
    return false;
  }
  else{
    showSuccess(password);
    showError(confirmPassword);
    return true;
  }
}

function checkEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(emailRegex.test(email.value.trim())){
    showSuccess(email);
    return true;
  }else{
    showError(email,"Email is not valid");
    return false;
  }
}

function checklength(input,min,max){
  if(input.value.length < min){
    showError(input,`${formatFieldName(input)} must be at least ${min} characters.`)
    return false;
  }else if(input.value.length > max){
    showError(input,`${formatFieldName(input)} must be less than ${max} characters.`);
    return false;
  }else{
    showSuccess(input);
    return true;
  }  
}

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