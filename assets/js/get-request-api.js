const apiUrl = 'http://localhost:3000/api/teddies/';

let getRequestApi = fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data){
        let containerItems = document.getElementById('containerProduct');

        for(let i = 0; i < data.length; i++) {
            let rowTemplate = document.createElement('div');
            rowTemplate.setAttribute('class', 'row product-item');
            rowTemplate.innerHTML = `<div class="col-6 product-img">
                                        <a href="./product-template.html?id=${data[i]._id}">
                                            <img src="${data[i].imageUrl}" alt="">
                                        </a>    
                                    </div>
                                    <div class="col-6 product-description">
                                        <p>${data[i].description}</p>
                                        <a href="./product-template.html?id=${data[i]._id}">
                                            <button type="button" class="btn btn-primary btn-lg">En savoir plus</button>
                                        </a>
                                    </div>`;
            containerItems.appendChild(rowTemplate);
        }

    })
    .catch(function(error) {
        console.log(error.message);
    })
