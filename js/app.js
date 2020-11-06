"use strict";
(function () {
    const searchButton = document.querySelector("button.searchButton");

    searchButton.addEventListener("click", search);
})();

function search() {
    const inputSearch = document.querySelector("input.searchInput");
    const recepeInput = inputSearch.value;
    const url = "http://www.recipepuppy.com/api/?q=" + recepeInput;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let arrSearchResult = JSON.parse(xhr.responseText);
                console.log(arrSearchResult['results']);
                let arrTitle = [];
                for(let i = 0; i<arrSearchResult['results'].length;i++){
                    for (let key in arrSearchResult['results'][i]) {
                    arrTitle[i] = arrSearchResult['results'][i]['title'];
                    }
                }
                console.log("Title:")
                console.log(arrTitle.length);
                for(let i = 0; i<arrTitle.length; i++){
                    console.log(arrTitle[i]);
                }
                let arrFoto = [];
                for(let i = 0; i<arrSearchResult['results'].length;i++){
                    for (let key in arrSearchResult['results'][i]) {
                        arrFoto[i] = arrSearchResult['results'][i]['thumbnail'];
                    }
                }
                console.log("Foto:")
                console.log(arrFoto.length);
                for(let i = 0; i<arrFoto.length; i++){
                    console.log(arrFoto[i]);
                }
                let arrIng = [];
                for(let i = 0; i<arrSearchResult['results'].length;i++){
                    for (let key in arrSearchResult['results'][i]) {
                        arrIng[i] = arrSearchResult['results'][i]['ingredients'];
                    }
                }
                console.log("Ingredients:")
                console.log(arrTitle.length);
                for(let i = 0; i<arrIng.length; i++){
                    console.log(arrIng[i]);
                };
                let table = document.createElement("table");
                let tr = table.insertRow(-1);
                let col = ["Pavadinimas", "Nuotrauka", "Ingridientai"];
                for (let i = 0; i < 3; i++) {
                    let th = document.createElement("th");
                    th.innerHTML = col[i];
                    tr.appendChild(th);
                };
                for (let i =0; i <arrSearchResult['results'].length; i++){
                    let tabRow = document.createElement("tr");
                    tabRow.innerHTML = "<tr> </tr><td>" +  arrTitle[i] + "</td> <td>"
                                                        + "<img src=" + arrFoto[i] + " > " + "</td> <td>"
                                                        + arrIng[i] + "</td> </tr>";
                    table.appendChild(tabRow);
                };
                var result = document.querySelector('.result');
                result.innerHTML = "";
                result.appendChild(table);
                if(arrSearchResult['results'].length == 0){
                    alert("Receptas nerastas. Bandykite dar kartą!");
                }
            }
        }
    };
    xhr.open("GET", url);
    xhr.send();
}









