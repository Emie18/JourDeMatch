/*---------------------------------
Fichier: filtre.js
contenant la fonction gérant le filtre
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/
$('#f').submit((event) => {
    //On empêche le rechargement de la page web
    event.preventDefault();

    //requete ajax qui renvoit la les information pour le filtre:
    /*-- le nombre de jour par rapport à aujourd'hui, la ville,et le sport--*/
    ajaxRequest('GET', 'php/request.php/elem_pour_filtre', filtre);

    //callback de la requete ajax : c'est la fonction filtre
    function filtre(data) {

        //On recupère la ville selectionnée
        var selecte_villes = document.getElementById('villes');
        var ville_selectionne = selecte_villes.options[selecte_villes.selectedIndex].text;

        //On recupère le sport selectionnée
        var selecte_sport = document.getElementById('sports');
        var sport_selectionne = selecte_sport.options[selecte_sport.selectedIndex].text;

        //On recupère la prériode selectionnée
        var selecte_periode = document.getElementById('nb_jour').value;

        //On recupère la disponibilité selectionnée (complet, non complet)
        var selecte_dispo = document.getElementById('dispo').value;

        //Pour chaque match on fait regarde celle qui correspond aux donnée de la sélection
        //et on les gardes celle qui ne corresponde pas on les éffaces de l'interface web
        data.forEach((elem) => {
            if ((elem['type_sport'] == sport_selectionne || sport_selectionne == "") && (elem['nom'] == ville_selectionne || ville_selectionne == "" && (parseInt(elem['jours']) >= parseInt(selecte_periode) || selecte_periode == 0)) && ((document.getElementById('banderole' + elem['id_jeux']).style.display == "block" && selecte_dispo == "complet") || (selecte_dispo == "noncomplet" && document.getElementById('banderole' + elem['id_jeux']).style.display == '') || (selecte_dispo == 0))) {
                $('#c'+ elem['id_jeux']).show();
            } else {
                $('#c'+ elem['id_jeux']).hide();
            }
        })
    }
});