
function togglePasswordVisibility(){
    const passwordField = document.getElementById("password");
    const toggleButton = document.getElementById("password-button");

    if(passwordField.type === "password"){
        passwordField.type = "text";
        toggleButton.classList.remove("fa-eye");
        toggleButton.classList.add("fa-eye-slash");
    }else{
        passwordField.type = "password";
        toggleButton.classList.remove("fa-eye-slash");
        toggleButton.classList.add("fa-eye");
    }
}

function checkPassword(){
    const password = document.getElementById("password");
    const confirm_password = document.getElementById("confirm-password");
    const password_msg = document.getElementById("password-msg");
    const check = document.getElementById("check2");
    const submit = document.getElementById("submit-button");

    if(password.value != confirm_password.value){
        password_msg.style.display = "block";
        password_msg.textContent = "Passwords does not match";
        confirm_password.style.borderColor = "red";
        check.style.display = "none";
        submit.disabled = "true";
    }else{
        password_msg.style.display = "none";
        password_msg.textContent = "";
        confirm_password.style.borderColor = "#3d8361";
        if(password.value != "") {
            check.style.display = "inline";
            submit.disabled = "false";
        }
    }
}

function checkEMail(){
    const email = document.getElementById("email");
    const email_msg = document.getElementById("email-msg");
    const check = document.getElementById("check1");
    const submit = document.getElementById("submit-button");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email.value)){
        email_msg.textContent = "Invalid email ID";
        email_msg.style.display = "block";
        email.style.borderColor = "red";
        check.style.display = "none";
        submit.ariaDisabled = "true";
    }else{
        email_msg.textContent = "";
        email_msg.style.display = "none";
        email.style.borderColor = "#3d8361";
        check.style.display = "inline";
        submit.ariaDisabled = "false";
    }
}

function validatePassword(){
    const password = document.getElementById("password");
    const msg = document.getElementById("pw-validation-msg");

    //patterns
    const hasNumber = /\d/;
    const hasCharacter = /[a-zA-Z]/;
    const hasSymbol = /[!@#$%^&*()\-=_+{}[\]|;:'",.<>/?\\]/;

    let val = password.value;
    if(hasNumber.test(val) && hasCharacter.test(val) && hasSymbol.test(val) && val.length >= 8){
        msg.textContent = "";
        msg.style.display = "none";
        password.style.borderColor = "#3d8361";
    }else{

        msg.style.display = "block";
        if(val.length < 8){
            msg.textContent = "too short";
        }else{
            msg.innerHTML = "password should contain numbers,<br>alphabets & symbols";
        }
        password.style.borderColor = "red";
    }
}

document.getElementById('google-button').addEventListener('click', function() {
    window.location.href = '/auth/google';
  });

  document.getElementById('facebook-button').addEventListener('click', function() {
    window.location.href = '/auth/facebook';
  });