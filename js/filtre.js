$('#f').submit((event) =>
  {
    event.preventDefault();
    let villes = document.getElementsByClassName('v');
    let carte = document.getElementsByClassName('carte');
    var element = document.getElementById('villes');
    var ville_f = element.options[ element.selectedIndex ].text;

    let sports = document.getElementsByClassName('s');
    var el = document.getElementById('sports');
    var sport_f = el.options[ el.selectedIndex ].text;
    //console.log( sport_f );
    for (let i = 0; i <carte.length; i++){
        if(villes[i].innerHTML==ville_f || sports[i].id==sport_f){
            carte[i].style.display = 'flex';
        }else{
            carte[i].style.display = 'none';
        }
    }
}
);