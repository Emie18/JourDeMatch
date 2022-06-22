/* Fichier contenant des requetes ajax et leur callback*/
/*Liste des requetes du fichier:
    header ->affiche_header
    villes ->affiche_liste_villes
    sports ->affiche_liste_sports
    forme ->affiche_liste_forme
    cartes ->affiche_liste_cartes
    get_id_jeux ->affiche_nb_joueur
    nb_joueur2 ->affiche_nb_joueur2
*/
//fonction qui va afficher si on est connecté les liens vers
//les pages web qu'ils ont le droit d'accès.
//La requete ajax renvoit rien si on est pas connecté


function affiche_header(data) {
let bouton_de_connexion=document.getElementsByClassName('text-connexion');
    if (data[0]['profil'] == "") {
        $('#add_match').hide();
        $('#mes_matchs').hide();
        $('#profil').hide();
        $('#notif').hide();
        $('#notif2').hide();
        bouton_de_connexion[0].innerHTML='connexion';
        data.forEach((elem)=>{
            console.log(data);
            $('#btn_participer'+elem['id_jeux']).hide();
        });
        bouton_de_connexion[0].href='connexion.html';
    } else {
        $( ".btn_pp" ).css( "display", "flex" );
        $('#add_match').show();
        $('#profil').show();
        $('#notif').show();
        $('#notif2').show();
        $('#mes_matchs').show();
        bouton_de_connexion[0].innerHTML='';
        bouton_de_connexion[0].href='';
    }
}

//requete ajax qui vas renmplir le select ayant pour id: villes
ajaxRequest('GET', 'php/request.php/villes', affiche_liste_villes);
function affiche_liste_villes(data) {
    //pour chaque ville
    data.forEach(elem => {
        //je crée un élément <option>
        let opt = document.createElement('option');
        //je lui donne une valeur: (insee)
        opt.value = elem.insee;
        //puis je remplis sont text: (nom de la ville)
        opt.textContent += elem.nom
        //enfin je l'ajoute au <select>
        $('#villes').append(opt);
    });
}

//requete ajax qui vas renmplir le select ayant pour id: sports
ajaxRequest('GET', 'php/request.php/sports', affiche_liste_sports);
function affiche_liste_sports(data) {
    //pour chaque sport
    data.forEach(elem => {
        //je crée un élément <option>
        let opt = document.createElement('option');
        //je lui donne la même valeur et le même texte: ex(football)
        opt.value = elem.type_sport;
        opt.textContent += elem.type_sport;
        //enfin je l'ajoute au <select>
        $('#sports').append(opt);
    });
}

//requete ajax qui vas renmplir le select ayant pour id: formes
ajaxRequest('GET', 'php/request.php/forme', affiche_liste_forme);
function affiche_liste_forme(data) {
    //pour chaque forme sportive
    data.forEach(elem => {
        //je crée un élément <option>
        let opt = document.createElement('option');
        //je lui donne la même valeur et le même texte: ex(Débutant)
        opt.value = elem.texte;
        opt.textContent += elem.texte;
        //enfin je l'ajoute au <select>
        $('#formes').append(opt);
    });
}
//requete ajax qui vas renmplir le select ayant pour id: joueur_match
ajaxRequest('GET', 'php/request.php/joueur_match/', affiche_joueurs);
function affiche_joueurs(data){
  //pour chaque ville
  data.forEach(elem => {
    //je crée un élément <option>
    let opt = document.createElement('option');
    //je lui donne une valeur: (email)
    opt.value = elem.email;
    //puis je remplis sont text: (nom et prenom du joueur)
    opt.textContent += elem.nom + ' ' + elem.prenom;
    //enfin je l'ajoute au <select>
    $('#joueur_match').append(opt);
});
}

//requete ajax qui vas renmplir le div ayant pour id: cartes
ajaxRequest('GET', 'php/request.php/cartes', affiche_liste_cartes);
function affiche_liste_cartes(data) {
    //Pour chaque matchs
    data.forEach(elem => {
        //je crée un élément <a>
        let a = document.createElement('a');
        //j'initialise la variable id à 0
        let id = 0;
        //Je remplis mon <a> avec les éléments nécessaires
        //à la création d'une carte
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
        //j'ajoute la class "carte" à mon <a> pour le css (la mise en page)
        a.className = 'carte';
        //je luis donne un lien vide
        a.href = '#';
        //puis un id conrespondant à la lettre 'c' plus l'id du match
        a.id = 'c' + elem['id_jeux'];
        //je donne à ma variable id la valeur de l'id du match
        id = elem['id_jeux'];

        //Variable pour compter le nombre de click sur mon <a>
        let click = 0;
        //j'ajoute à mon <a> un évènement s'il est cliqué
        a.onclick = function (e) {
            //j'empêche le page de remonter lors de mon click
            e.preventDefault();
            //incrémentation de click
            click += 1
            //Si le click est impaire
            if (click % 2) {
                //j'ajoute la class "carte_agrandi",
                //Elle va agrandir en css la carte pour, avoir la place d'afficher les détails
                a.className = 'carte carte_agrandi';
                //appel à la fonction détail pour afficher les détails de chaque match
                detail(id);
            } else {
                //Si Click est paire 
                //je retire la classe "carte_agrandi"
                a.className = 'carte';
                //je supprime les détails
                supp_detail(id);
            }

        };
        // pour finir j'ajoute mon <a> dans le div ayant pour id: cartes
        $('#cartes').append(a);
    });
}
//requete decalée pour enlever le bouton participer
ajaxRequest('GET','php/request.php/header', affiche_header)
//requete ajax pour recupérer les id des matchs
ajaxRequest('GET', 'php/request.php/get_id_jeux', affiche_nb_joueur);
function affiche_nb_joueur(data) {
    //pour chaque match
    for (a in data) {
        //requete ajax pour compter le nombre de joueur du match
        ajaxRequest('POST', 'php/request.php/nb_joueur2', affiche_nb_joueur2, 'id_jeux=' + data[a]['id_jeux']);
    }

}

//fonction pour affichier le nombre de joueur inscrits du match
function affiche_nb_joueur2(data) {
    //création de l'élément <span>
    let span = document.createElement('span');
    //Dans le <span> je met le nombre de joueur inscrits du match
    span.innerHTML = data[0]['nb'];
    //Variable pour recupérer l'id du match et en faire un id (html)
    let ii = "#" + data[0]['id'].toString();
    //dans n je met le nombre de joueur max contenu dans l'id : ii créé précedement
    let n = $(ii).html();
    //si n existe
    if (n != null) {
        //Conversion en chiffre de n (nombre max) et n2 (contient le nombre d'inscrits)
        n = n.replace('/', '');
        n = parseInt(n);
        n2 = parseInt(data[0]['nb'])

        //si le nombre max = le nombre d'inscrits
        if (n == n2) {
            //j'affiche la banderole complet sur la carte contenant le match
            document.getElementById('banderole' + data[0]['id'].toString()).style.display = "block";
            //si c'est complet alors j'enlève la bonton participer
            if (document.getElementById('btn_participer' + data[0]['id'].toString()))
                document.getElementById('btn_participer' + data[0]['id'].toString()).style.display = "none";
        }

        // Enfin j'ajoute le nombre de joueur inscrits dans la page wed
        let p = document.getElementById(data[0]['id'].toString());
        if (p != null)
            p.insertBefore(span, p.firstChild);
    }
}


