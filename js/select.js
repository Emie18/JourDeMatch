ajaxRequest('GET', 'php/request.php/villes', affiche_liste_villes);

function affiche_liste_villes(data){

     var sel = document.getElementById('villes');
    data.forEach(elem => {
    let opt = document.createElement('option');
    opt.value = elem.insee;
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
ajaxRequest('GET', 'php/request.php/forme', affiche_liste_forme);
function affiche_liste_forme(data){

    var sel = document.getElementById('formes');
   data.forEach(elem => {
   let opt = document.createElement('option');
   opt.value = elem.texte;
   opt.textContent += elem.texte // or opt.innerHTML += user.name
   sel.appendChild(opt);
       // console.log(element.nom);
   });
}
ajaxRequest('GET', 'php/request.php/cartes', affiche_liste_cartes);
function affiche_liste_cartes(data){

    var sel = document.getElementById('cartes');
   data.forEach(elem => {
    console.log(elem);
   let a = document.createElement('a');
    a.innerHTML =`
    <img src="${elem.image}">
    <div class="banderol_complet">Complet</div>
    <h3>${elem.titre}</h3>
    <div class="info">
        <img class="logo" src="${elem.icone}">
        <div class="lieu">
            <img src="icone/localisation.png">
            <p class="localisation">${elem.nom}</p>
        </div>
        <div class="lieu">
            <img src="icone/homme.png">
            <p class="localisation">15/${elem.nb_joueurmax}</p>
        </div>
        <div class="date_heure">
            <p class="lieu">Date: ${elem.date}</p>
            <p class="lieu">début: ${elem.heure}</p>
            <p class="lieu">durée: ${elem.duree}</p>
        </div>
    </div>
    `
    a.className='carte';
    a.href = '#';
  
   sel.appendChild(a);
       // console.log(element.nom);
   });
}
