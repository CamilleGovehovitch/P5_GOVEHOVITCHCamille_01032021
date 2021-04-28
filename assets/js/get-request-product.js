//use the url parameter to collect the product id and add the product id to the request api
const paramsUrl = window.location.search;
const urlParams = new URLSearchParams(paramsUrl);
const productId = urlParams.get('id');
let productUrl = 'http://localhost:3000/api/teddies/' + productId;

//fFETCH
let getRequestApi = fetch(productUrl)
    .then (function(response) {
        return response.json();
    })
    .then (function (data) {
        //create DOM elements to construct the product page
        //Create title element
        let rowProductName = document.createElement('div');
        rowProductName.setAttribute('class', 'row title');
        rowProductName.innerHTML = ` 
            <div class="col-12 product-image">
                <h1>${data.name}</h1>
            </div>
        `;
        //Create the template product page
        let rowProductTemplate = document.createElement('div');
        let container = document.getElementById('containerProduct');
        rowProductTemplate.setAttribute('class', 'row');
        rowProductTemplate.setAttribute('id', 'productItemContent');
        rowProductTemplate.innerHTML = `
            <div class="col product-image">
                <img src="${data.imageUrl}" alt="image du produit représentant un ours en peluche">
            </div>
            <div class="col product-selection">
                <div class="col product-content">
                    <p>${data.description}</p>
                    <p id="productPrice"></p>
                </div>
                <div class="col select-colors">
                    <select id="productColors" class="form-select"></select>
                </div>
                <div class="col select-number-product">    
                    <select id="selectNumberOfProduct" class="form-select"">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                </div>
                <div class="col add-cart">
                    <a>
                        <button type="button" id="addCartBtn" class="btn btn-primary btn-lg">Ajouter au panier</button>
                    </a>
                </div>  
                
            </div>
        
        `;

        container.appendChild(rowProductName);
        container.appendChild(rowProductTemplate);

        //Control quantity colors
        const selectColorsProduct = document.getElementById('productColors');
        const selectNumberOfProduct = document.getElementById('selectNumberOfProduct');
        const productPrice = document.getElementById('productPrice');

        selectColorsProduct.setAttribute('id', 'selectColorsProduct');
        for(let i = 0; i < data.colors.length; i++) {
            let optionColorsProduct = document.createElement('option');
            optionColorsProduct.setAttribute('value', data.colors[i]);
            optionColorsProduct.setAttribute('id', 'productColor' + i);
            optionColorsProduct.text = data.colors[i];
            selectColorsProduct.appendChild(optionColorsProduct);
        }

        rowProductTemplate.classList.add('product-item-content');

        //DISPLAY PRODUCT PRICE
        productPrice.innerText = data.price / 100 + '.00€';
        selectNumberOfProduct.addEventListener('change', function(e){
            let price = (parseInt(data.price) * e.target.value) / 100;
            productPrice.innerText = price + '.00 €';
        })

        //cart shop function
        const addCartBtn = document.getElementById('addCartBtn');

        let cart = localStorage.getItem('cart');
        if(!cart) {
            localStorage.setItem('cart', '[]');
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            cart = JSON.parse(cart);
        }
        //Add into cart
        addCartBtn.addEventListener('click', function(e) {
            e.preventDefault();

            cart.push(
                {
                    name: data.name,
                    colors: selectColorsProduct.value,
                    numberOfProduct: selectNumberOfProduct.value,
                    productId: data._id,
                    total: parseInt(data.price) * parseInt(selectNumberOfProduct.value)
                }
            )

            localStorage.setItem('cart', JSON.stringify(cart));

            console.log(cart);
        })
    })
    .catch (function(error) {
        console.log(error.message);
    })






