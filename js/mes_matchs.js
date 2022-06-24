/*---------------------------------
Fichier: mes_match.js
contenant la fonction pour afficher
les matchs du profil
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/
//requête pour récupérer les matchs du profil
ajaxRequest('GET', 'php/request.php/mes_matchs', affiche_mes_matchs);

//fonction pour afficher les matchs du profil
function affiche_mes_matchs(data) {
    data.forEach(elem => {
        let a = document.createElement('a');
        let id = 0;
        a.innerHTML = `
        <div class="org_jou">
        <p class="organisateur${elem.organisateur}">organisateur</p>
        <p class="joueur${elem.joueur}">joueur</p>
        </div>
        <img class="image_principale" src="${elem.image}">
        <div id="banderole${elem.id_jeux}"class="banderol_complet">Complet</div>
        <div class="imagej" id="img${elem.id_jeux}"></div>
        <h3>${elem.titre}</h3>
        <div class="info" id="info">
            <img class="logo s" id="${elem.type_sport}"src="${elem.icone}">
            <div class="lieu">
                <img src="icone/localisation.png">
                <p class="localisation v">${elem.nom}</p>
            </div>
            <div class="lieu">
                <img src="icone/homme.png">
                <p class="localisation"  id ='${elem.id_jeux}'>/${elem.nb_joueurmax}</p>
            </div>
            <div class="date_heure">
                <p class="lieu">Date: ${elem.date}</p>
                <p class="lieu">Début: ${elem.heure}</p>
                <p class="lieu">Durée: ${elem.duree}</p>
                <p class="lieu" id="adresse${elem.id_jeux}"></p>
                <p class="lieu" id="description${elem.id_jeux}"></p>
                <p class="lieu" id="prix${elem.id_jeux}"></p>
                <p class="lieu" id="equipe${elem.id_jeux}"></p>
                <p class="lieu" id="meilleur_joueur${elem.id_jeux}"></p>
            </div>
            <div class="btn_participer"><input class="f${elem.organisateur}" type="button" class="btn_pp" onclick=modif_match(${elem.id_jeux}) value="modifier"><div>
        </div>
        `
        a.className = 'carte';
        a.href = '#';
        a.id = 'c' + elem['id_jeux'];
        id = elem['id_jeux'];
        let click = 0;
        a.onclick = function (e) {
            e.preventDefault();
            click += 1
            if (click % 2) {
                a.className = 'carte carte_agrandi';
                detail(id);
            } else {
                a.className = 'carte';
                supp_detail(id);
            }
        };
        if (elem['jours'] < 0) {
            $('#cartesm').append(a);
        } else {
            $('#cartes2').append(a);
        }
    });
}