ajaxRequest('GET', 'php/request.php/villes', affiche_liste_villes);

function affiche_liste_villes(data){

     var sel = document.getElementById('villes');
    data.forEach(elem => {
    let opt = document.createElement('option');
    opt.value = elem.nom;
    opt.textContent += elem.nom // or opt.innerHTML += user.name
    sel.appendChild(opt);
        // console.log(element.nom);
    });
}
ajaxRequest('GET', 'php/request.php/sports', affiche_liste_sports);

function affiche_liste_sports(data){

    var sel = document.getElementById('sports');
   data.forEach(elem => {
   let opt = document.createElement('option');
   opt.value = elem.type_sport;
   opt.textContent += elem.type_sport // or opt.innerHTML += user.name
   sel.appendChild(opt);
       // console.log(element.nom);
   });
}