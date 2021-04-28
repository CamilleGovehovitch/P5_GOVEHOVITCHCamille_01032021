const validatedMessageContainer = document.getElementById('validatedMessageContainer');
const validatedMessage = document.createElement('p');
//recover url parameter
const paramsUrl = window.location.search;
const urlParams = new URLSearchParams(paramsUrl);
const orderId = urlParams.get('orderId');

validatedMessage.setAttribute('class', 'validated-message');
validatedMessage.innerText = 'Merci de votre commande n° ' + orderId;
validatedMessageContainer.appendChild(validatedMessage);

function clearCart() {
    localStorage.clear();
}
clearCart();
