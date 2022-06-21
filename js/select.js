ajaxRequest('GET', 'php/request.php/header',affiche_header);
function affiche_header(data){
    if(data==""){
        document.getElementById('add_match').style.display="none";
        document.getElementById('profil').style.display="none";
        document.getElementById('notif').style.display="none";
        document.getElementById('notif2').style.display="none";

    }else{
        document.getElementById('add_match').style.display="block";
        document.getElementById('profil').style.display="block";
        document.getElementById('notif').style.display="block";
        document.getElementById('notif2').style.display="block";
    }
}

ajaxRequest('GET', 'php/request.php/villes', affiche_liste_villes);
function affiche_liste_villes(data){

     //var sel = document.getElementById('villes');
    data.forEach(elem => {
    let opt = document.createElement('option');
    opt.value = elem.insee;
    opt.textContent += elem.nom // or opt.innerHTML += user.name
    $('#villes').append(opt);
        // console.log(element.nom);
    });
}

ajaxRequest('GET', 'php/request.php/sports', affiche_liste_sports);
function affiche_liste_sports(data){

   // var sel = document.getElementById('sports');
   data.forEach(elem => {
   let opt = document.createElement('option');
   opt.value = elem.type_sport;
   opt.textContent += elem.type_sport // or opt.innerHTML += user.name
   $('#sports').append(opt);
       // console.log(element.nom);
   });
}
ajaxRequest('GET', 'php/request.php/forme', affiche_liste_forme);
function affiche_liste_forme(data){

    //var sel = document.getElementById('formes');
   data.forEach(elem => {
   let opt = document.createElement('option');
   opt.value = elem.texte;
   opt.textContent += elem.texte // or opt.innerHTML += user.name
   $('#formes').append(opt);
       // console.log(element.nom);
   });
}
ajaxRequest('GET', 'php/request.php/cartes', affiche_liste_cartes);
function affiche_liste_cartes(data){

    data.forEach(elem => {
        //console.log(elem);
       let a = document.createElement('a');
       let id = 0;
        a.innerHTML =`
        
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
    
        </div>
        `

        a.className='carte';
        a.href = '#';
        a.id= 'c'+elem['id_jeux'];
        id=elem['id_jeux'];
        let click =0;
        a.onclick= function(e) {
            e.preventDefault(); 
            click +=1

            if(click%2){
                a.className='carte carte_agrandi';
                
                detail(id);
            }else{
                a.className='carte';
                supp_detail(id);
           }

        };
   $('#cartes').append(a);
       // console.log(element.nom);
   });
}

ajaxRequest('GET', 'php/request.php/nb_joueur', affiche_nb_joueur);
function affiche_nb_joueur(data){
    for(a in data){
        ajaxRequest('POST', 'php/request.php/nb_joueur2', affiche_nb_joueur2,'id_jeux=' + data[a]['id_jeux']);
         //console.log(data[a]['id_jeux']);
    }
   
}
function affiche_nb_joueur2(data){
   // console.log(data);
    let span = document.createElement('span');
    span.innerHTML = data[0]['nb'];
    let ii = "#"+data[0]['id'].toString();
    let n = $(ii).html();
    if (n!=null){
    n=n.replace('/','');
    n=parseInt(n);
    n2= parseInt(data[0]['nb'])
    if(n==n2)
    document.getElementById('banderole'+data[0]['id'].toString()).style.display="block";
    //$('#banderole').style.display="none";
    let p = document.getElementById(data[0]['id'].toString());
    if(p!=null)
    p.insertBefore(span, p.firstChild);
    }
    //document.getElementById(id.toString()).innerHTML="${data['nb']}";
}
