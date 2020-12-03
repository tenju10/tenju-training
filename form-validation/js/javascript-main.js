
const username = document.querySelector('#name');
const emailAddress = document.querySelector('#mail');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');

const dob = document.querySelector('#dob');
const submit = document.querySelector('#submit');

const requiredName = document.querySelector('.required-name');
const validEmail = document.querySelector('.valid-email');
const validPhone = document.querySelector('.valid-phone');

let removeRequiredListener = (inputEle, labelEle) => {
    inputEle.addEventListener('focus', function() {
        inputEle.classList.remove('required');
        labelEle.classList.remove('show');
    })
}

let addRequired = (inputEle, labelEle) => {
    inputEle.classList.add('required');
    labelEle.classList.add('show');
}

dob.setAttribute('max', setMaxDate());

submit.addEventListener('click', function(event){
    if (!checkFields())
    {
        console.log("There is a problem");
        event.preventDefault();
    }
    else
    {
        var form = {
            username: username.value,
            emailAddress: emailAddress.value,
            address: address.value,
            phone: phone.value,
            dob: dob.value
        }

        var request = new XMLHttpRequest();
        request.addEventListener('load', callResponse);
        request.open('POST', 'https://tenju.netlify.app:3002/formjs')
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(form));

        event.preventDefault();
    }
});

removeRequiredListener(username, requiredName);
removeRequiredListener(emailAddress, validEmail);
removeRequiredListener(phone, validPhone);

function checkFields (){
    const nameValid = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
    const emailValid = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const numberValid = /^[0-9]{10}$/;///^[0-9]/;
    let fieldsValid = true;
    if (!emailValid.test(emailAddress.value) && emailAddress.value !== "")
    {   
        addRequired(emailAddress, validEmail);
        fieldsValid = false;
    }
    if (!nameValid.test(username.value) || username.value === "")
    {
        console.log("Name is incorrect or empty");
        addRequired(username, requiredName);
        fieldsValid = false;
    }
    if (!numberValid.test(phone.value) && phone.value !== "")
    {
        addRequired(phone, validPhone);
        fieldsValid = false;
    }

    return fieldsValid;
}

function callResponse() {
    console.log(this.responseText);
    alert("form has been sent");
}

function setMaxDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10){
        dd = '0' + dd
    } 
    if (mm < 10){
        mm = '0' + mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;
}