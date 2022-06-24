/*---------------------------------
Fichier: photo-dynamique.js
contenant les fonctions pour
afficher les photos de profil
@Auteurs: Le Rouzic Emilie
    &     Maïel Madec
@Ecole: ISEN Yncréa Ouest
@Date de création: juin-2022
-----------------------------------*/
//les deux fonctions sont identique
//elles affichent au click du select
//la photo selectionnée
function photo(choix) {
  switch (choix) {
    case "0":
      document.getElementById("photo").src = "icone/profil.png";
      break;
    case "1":
      document.getElementById("photo").src = "photo/blonde.png";
      break;
    case "2":
      document.getElementById("photo").src = "photo/blond.png";
      break;
    case "3":
      document.getElementById("photo").src = "photo/brune.png";
      break;
    case "4":
      document.getElementById("photo").src = "photo/chatain.png";
      break;
    case "5":
      document.getElementById("photo").src = "photo/lunette.png";
      break;
    case "6":
      document.getElementById("photo").src = "photo/moustachu.png";
      break;
    case "7":
      document.getElementById("photo").src = "photo/rousse.png";
      break;
    case "8":
      document.getElementById("photo").src = "photo/chauve.png";
      break;
    case "9":
      document.getElementById("photo").src = "photo/crepu.png";
      break;

  }
}

function photo2(choix) {
  switch (choix) {
    case "0":
      document.getElementById("photo").src = "icone/profil.png";
      break;
    case "1":
      document.getElementById("photo").src = "photo/blonde.png";
      break;
    case "2":
      document.getElementById("photo").src = "photo/blond.png";
      break;
    case "3":
      document.getElementById("photo").src = "photo/brune.png";
      break;
    case "4":
      document.getElementById("photo").src = "photo/chatain.png";
      break;
    case "5":
      document.getElementById("photo").src = "photo/lunette.png";
      break;
    case "6":
      document.getElementById("photo").src = "photo/moustachu.png";
      break;
    case "7":
      document.getElementById("photo").src = "photo/rousse.png";
      break;
    case "8":
      document.getElementById("photo").src = "photo/chauve.png";
      break;
    case "9":
      document.getElementById("photo").src = "photo/crepu.png";
      break;

  }
}