const rowCartSummary = document.getElementById('rowCartSummary');
const colCartSummary = document.createElement('div');
// Creation of cart
let cart = localStorage.getItem('cart');
if(!cart) {
    localStorage.setItem('cart', '[]');
    cart = JSON.parse(localStorage.getItem('cart'));
} else {
    cart = JSON.parse(cart);
}
//function remove item from cart
function removeItemFromCart() {
    for (const element of cart) {
    }

}

colCartSummary.setAttribute('class', 'cart');
colCartSummary.innerHTML = `<div class="summary-container">
                                <table class="summary-table">
                                    <thead>
                                        <tr>
                                            <th>Nom du produit</th>
                                            <th>Quantité</th>
                                            <th>Couleurs</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>  
                                    <tbody id="tableDataOrder">
                                        
                                    </tbody>      
                                </table>
                            </div>
                            `;

rowCartSummary.appendChild(colCartSummary);

//creation of data from order
let tableDataOrder = document.getElementById('tableDataOrder');
let tableData = document.createElement('td');

for (const element of cart) {
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = ` <td>${element.name}</td>
                            <td>${element.numberOfProduct}</td>
                            <td>${element.colors}</td>
                            <td>${element.total / 100 + '.00€'}</td>
                            `;
    tableDataOrder.appendChild(tableRow);
}
