//Variables Form and inputs
const commandForm = document.getElementById('commandForm');
const firstNameInput = document.getElementById('firstNameInput');
const lastNameInput = document.getElementById('lastNameInput');
const numberAdressInput = document.getElementById('numberAdressInput');
const typeAdressInput = document.getElementById('typeAdressInput');
const adressInput = document.getElementById('adressInput');
const cityInput = document.getElementById('cityInput');
const emailInput = document.getElementById('emailInput');

const submitBtn = document.getElementById('submitBtn');

//Errors container
const firstErr = document.getElementById('firstErr');
const lastErr = document.getElementById('lastErr');
const numberErr = document.getElementById('numberErr');
const voieErr = document.getElementById('voieErr');
const adressErr = document.getElementById('adressErr');
const cityErr = document.getElementById('cityErr');
const emailErr = document.getElementById('emailErr');

//Regex
const numberOnlyRegex = new RegExp('^[0-9]{1,3}');
const emailRegex = new RegExp('^[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4}$');
const  nameRegex = new RegExp('^[a-zA-Z- ]{2,30}');

//Order URL request
const orderRequestUrl = 'http://localhost:3000/api/teddies/order';

//function validation form inputs
function formValidation(inputValue, inputId, errorMessage) {
    let errorArray = [];
    if(nameRegex.test(inputValue)) {
        inputId.classList.remove('error');
        errorMessage.innerText = ' ';
        return true;
    } else {
        inputId.classList.add('error');
        errorMessage.classList.add('error-message');
        errorArray = {
            inputId : 'ce champs ne peu contenir ques des caractères alphabétiques',
        }
        errorMessage.innerText = errorArray.inputId;
        return false;
    }
}
function emailValidation(email, emailId, mailErrorMessage) {
    if(emailRegex.test(email)) {
        emailId.classList.remove('error');
        mailErrorMessage.innerText = ' ';
        return true;
    } else {
        emailId.classList.add('error');
        mailErrorMessage.classList.add('error-message');
        mailErrorMessage.innerText = 'Votre email n\'a pas la forme requise exemple@exemple.com';
        return false;
    }
}
function isNumber(number, numberId, numberErrorMessage) {
    if(numberOnlyRegex.test(number)) {
        numberId.classList.remove('error');
        numberErrorMessage.innerText = ' ';
        return true;
    } else {
        numberId.classList.add('error');
        numberErrorMessage.classList.add('error-message');
        numberErrorMessage.innerText = 'Ce champs ne peut contenir que des caractères numériques';
        return false;
    }
}
//Validation form
commandForm.addEventListener('input', function(e){
    //validation input
    if(formValidation(firstNameInput.value,  firstNameInput, firstErr) === true &&
        formValidation(lastNameInput.value, lastNameInput, lastErr) === true &&
        isNumber(numberAdressInput.value, numberAdressInput, numberErr) === true &&
        formValidation(typeAdressInput.value, typeAdressInput, voieErr) === true &&
        formValidation(adressInput.value, adressInput, adressErr) === true &&
        formValidation(cityInput.value, cityInput, cityErr) === true  &&
        emailValidation(emailInput.value, emailInput, emailErr) === true ) {
                submitBtn.disabled = false;

    } else {
        submitBtn.disabled = true;
    }
});

commandForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let cart = localStorage.getItem('cart');
    if(!cart) {
        localStorage.setItem('cart', '[]');
        cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        cart = JSON.parse(cart);
    }
    let productIds = cart.map(item => item.productId);
    let data = {
        "contact": {
            "firstName": firstNameInput.value,
            "lastName": lastNameInput.value,
            "address": numberAdressInput.value + ' ' + typeAdressInput.value + ' ' + adressInput.value,
            "city": cityInput.value,
            "email": emailInput.value
        },
        "products": productIds
    }
    //SEND ORDER REQUEST TO API
    const order =  fetch(orderRequestUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    }).then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data);
        window.location = 'validation-command.html?orderId=' + data.orderId;
    })

})
