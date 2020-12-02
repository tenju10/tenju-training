const username = $('#name');
const email = $('#mail');
const phone = $('#phone');
const address = $('#address')
const dob = $('#dob');
const submit = $('#submit');
const form = $('#form');

dob.attr('max', setMaxDate());

$(document).ready(function(){
    $.validator.addMethod(
        "pattern",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
    form.validate({
        rules: {
            name: "required",
            mail:{
                email: true
            },
            phone: {
                pattern: "^[0-9]", 
                minlength: 10,
                maxlength: 10
            }
        },
        messages :{
            name: "Name Required",
            mail: "Valid Email Required",
            phone: "Valid Phone Number Required"
        },
        submitHandler: submitForm

    })
})

function submitForm(event){
    console.log(email.val());
    var data = {
        username: username.val(),
        email: email.val(),
        address: address.val(),
        phone: phone.val(),
        dob: dob.val()
    }
    console.log('sending form');
    $.ajax({
        type: 'get',
        url: 'http://localhost:3002/form',
        dataType: 'json',
        data: data
    })
    .done(function(){
        alert("form has been sent");
    })
    .fail(function(){
        alert("Did not work");
    })
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