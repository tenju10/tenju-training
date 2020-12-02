const username = $('#name');
const email = $('#mail');
const phone = $('#phone');
const dob = $('#dob');
const submit = $('#submit');

dob.attr('max', setMaxDate());

submit.click(function(event){
    if (!checkFields())
    {
        console.log("There is a problem"); 
        event.preventDefault();
    }
    else
    {
        var form = {
            username: username.val(),
            email: email.val(),
            phone: phone.val(),
            dob: dob.val()
        }
        console.log('sending form');
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/form',
            dataType: 'json',
            data: form
        })
        .done(function(){
            alert("form has been sent");
        })
        .fail(function(){
            alert("Did not work");
        })

        event.preventDefault();
    }
});


function checkFields (){
    const nameValid = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
    const emailValid = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const numberValid = /^[0-9]/;
    if (!emailValid.test(email.val()) && !email.val() === "")
    {
        return false;
    }
    if (!nameValid.test(username.val()))
    {
        return false;
    }
    if (!numberValid.test(phone.val()) && !phone.val() === "")
    {
        return false;
    }
    return true;

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