$('#connexion').submit((event) =>
  {
    event.preventDefault();
    ajaxRequest('POST', 'php/request.php/connexion/',null, 'email=' + $('#email').val() + '&mot_de_passe=' + $('#mot_de_passe').val());
  }
);
