'use strict';

let bouton = document.getElementById('btn');
let tt = document.getElementById('nom');
bouton.addEventListener('click', event => {
  ajaxRequest('GET', '../php/request.php/profil', affiche);
});

function affiche(data){
  console.log(data);
  tt.innerHTML = data[0].email;
}