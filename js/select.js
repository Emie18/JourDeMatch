/*-----------------------------------
Fichier: select.js
Liste des requetes ajax du fichier:
    header ->affiche_header
    villes ->affiche_liste_villes
    sports ->affiche_liste_sports
    forme ->affiche_liste_forme
    cartes ->affiche_liste_cartes
    get_id_jeux ->affiche_nb_joueur
    nb_joueur2 ->affiche_nb_joueur2
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
--------------------------------------*/

//fonction qui va afficher si on est connecté les liens vers
//les pages web qu'ils ont le droit d'accès.
//La requete ajax renvoit rien si on est pas connecté
function affiche_header(data) {
    let bouton_de_connexion = document.getElementsByClassName('text-connexion');
    if (data[0]['profil'] == "") {
        $('#add_match').hide();
        $('#mes_matchs').hide();
        $('#profil').hide();
        $('#notif').hide();
        $('#notif2').hide();
        bouton_de_connexion[0].innerHTML = 'connexion';
        data.forEach((elem) => {
            console.log(data);
            $('#btn_participer' + elem['id_jeux']).hide();
        });
        bouton_de_connexion[0].href = 'connexion.html';
    } else {
        $(".btn_pp").css("display", "flex");
        $('#add_match').show();
        $('#profil').show();
        $('#notif').show();
        $('#notif2').show();
        $('#mes_matchs').show();
        bouton_de_connexion[0].innerHTML = '';
        bouton_de_connexion[0].href = '';
    }
}

//requête ajax qui vas remplir le select ayant pour id: villes
ajaxRequest('GET', 'php/request.php/villes', affiche_liste_villes);
function affiche_liste_villes(data) {
    data.forEach(elem => {
        let opt = document.createElement('option');
        opt.value = elem.insee;
        opt.textContent += elem.nom;
        $('#villes').append(opt);
    });
}

//requête ajax qui vas remplir le select ayant pour id: sports
ajaxRequest('GET', 'php/request.php/sports', affiche_liste_sports);
function affiche_liste_sports(data) {
    data.forEach(elem => {
        let opt = document.createElement('option');
        opt.value = elem.type_sport;
        opt.textContent += elem.type_sport;

        $('#sports').append(opt);
    });
}

//requête ajax qui vas remplir le select ayant pour id: formes
ajaxRequest('GET', 'php/request.php/forme', affiche_liste_forme);
function affiche_liste_forme(data) {
    data.forEach(elem => {
        let opt = document.createElement('option');
        opt.value = elem.texte;
        opt.textContent += elem.texte;
        $('#formes').append(opt);
    });
}

//requête ajax qui vas remplir le select ayant pour id: joueur_match
ajaxRequest('GET', 'php/request.php/joueur_match/', affiche_joueurs);
function affiche_joueurs(data) {
    data.forEach(elem => {
        let opt = document.createElement('option');
        opt.value = elem.email;
        opt.textContent += elem.nom + ' ' + elem.prenom;
        $('#joueur_match').append(opt);
    });
}

//requête ajax qui vas remplir le div ayant pour id: cartes
ajaxRequest('GET', 'php/request.php/cartes', affiche_liste_cartes);

//fonction qui affiche tout les cartes, contenant les matchs
function affiche_liste_cartes(data) {
    data.forEach(elem => {
        let a = document.createElement('a');
        let id = 0;

        a.innerHTML = `
        <img class="image_principale" src="${elem.image}">
        <div id="banderole${elem.id_jeux}"class="banderol_complet">Complet</div>
        <p class="demande_envoyer" id="demande${elem.id_jeux}"></p>
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
            <div class="btn_participer" id="btn_participer${elem.id_jeux}"><input type="button" class="btn_pp" onclick=participer(${elem.id_jeux}) value="Participer"><div>
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
        $('#cartes').append(a);
    });
}

//requete decalée pour enlever le bouton participer
ajaxRequest('GET', 'php/request.php/header', affiche_header)

//requete ajax pour recupérer les id des matchs
ajaxRequest('GET', 'php/request.php/get_id_jeux', affiche_nb_joueur);
function affiche_nb_joueur(data) {
    for (a in data) {
        ajaxRequest('POST', 'php/request.php/nb_joueur2', affiche_nb_joueur2, 'id_jeux=' + data[a]['id_jeux']);
    }
}

//fonction pour affichier le nombre de joueur inscrits du match
function affiche_nb_joueur2(data) {
    let span = document.createElement('span');
    span.innerHTML = data[0]['nb'];
    let ii = "#" + data[0]['id'].toString();
    let n = $(ii).html();
    if (n != null) {
        n = n.replace('/', '');
        n = parseInt(n);
        n2 = parseInt(data[0]['nb'])

        if (n == n2) {
            document.getElementById('banderole' + data[0]['id'].toString()).style.display = "block";
            if (document.getElementById('btn_participer' + data[0]['id'].toString()))
                document.getElementById('btn_participer' + data[0]['id'].toString()).style.display = "none";
        }

        let p = document.getElementById(data[0]['id'].toString());
        if (p != null)
            p.insertBefore(span, p.firstChild);
    }
}

