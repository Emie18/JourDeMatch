Projet Web
================
Groupe n°83

**Objectif : Concevoir et développer une application web de gestion de matchs sportifs.**

> Cette application devra permettre de rechercher un match, de réserver une place en tant que joueur, mais aussi de proposer un nouveau match.

- Eléments requis :
	- Apache2
	- PHP 7.4
	- Postgresql11 ou MySQL5.7
	- unzip
	```
	sudo apt install unzip
	```

I. Installation sur le serveur
----------------------------------------------

L'archive étant sur votre serveur, veuillez suivre les étapes suivantes pour l'installer convenable sur votre machine virtuelle.

- A l'endroit où est l'archive, veuillez "dézipper" son contenu dans le répertoire suivant :
	```
	unzip projetweb_groupe83.zip -d /var/www
	```

- Création du VirtualHost :
	1. Créer le fichier 
	```
	sudo nano /etc/apache2/sites-available/jourdematch.conf
	```
	
	2. Remplir le fichier de la sorte
	```
	<VirtualHost *:80>
    ServerName jourdematch
    ServerAlias www.jourdematch 
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/jourdematch
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
	</VirtualHost>
	```
	
	3. Pour que le tout marche, on va désactiver le fichier de configuration par défaut et le remplacer par le nôtre
	```
	a2dissite 000-default.conf
	a2ensite jourdematch.conf
	```
	
	4. Maintenant on va relancer le serveur pour qu'il puisse prendre en compte notre configuration
	```
	sudo systemctl reload apache2
	```

> à partir de maintenant, il est normalement possible d'accéder à votre site web (sans la base de donnée) de par votre ip comme ceci : http://votreip. Exemple : http://10.10.51.83

II. Mise en place de la base de donnée
---------------------------------------------------------------

Nous allons maintenant rajouter la base de donnée nécessaire pour le stockage des données utilisateurs de vos clients.

> Requis : Se mettre dans `/var/www/JourDeMatch` car la base de donnée à insérer est dans ce dossier

- Création de l'utilisateur et de la base de donnée
	1. Connectez-vous à mysql
	```
	sudo mysql
	```

	2. Création de votre base de donnée
	```
	CREATE DATABASE jour_de_match DEFAULT CHARACTER SET utf8 DEFAULT COLLATE
	utf8_general_ci;
	```
	
	3. Créer votre utilisateur, retenez bien votre nom d'utilisateur et le mot de passe, nous en aurons besoin après
	```
	CREATE USER 'user'@'localhost' IDENTIFIED BY 'monpwd';
	```
	>user : votre nom d'utilisateur
	>monpwd : votre mot de passe

	4. Donnez les droits à l'utilisateur que nous avons créer précédemment
	```
	GRANT ALL PRIVILEGES ON jour_de_match.* TO 'user'@'localhost' WITH GRANT
	OPTION;
	```
	>user : votre nom d'utilisateur

- Nous avons créer l'utilisateur et la base de donnée, maintenant on va la remplir et y donner accès à notre site internet

	1. Connexion à la base de donnée
	```
	USE jour_de_match;
	```

	2. Mettre le contenu `.sql` de notre dossier dans notre base de donnée tout fraîchement créer
	```
	SOURCE jour_de_match.sql
	```
	
	3. Vous pouvez maintenant sortir de mysql
	```
	exit
	```

	4. Allons dans le fichier `constants.php` pour y mettre nos identifiants
	```
	sudo nano php/constants.php
	```

	Puis remplacer par vos identifiants :
	```php
	<?php 
	define('DB_USER', 'user');
	define('DB_PASSWORD', 'monpwd');
	define('DB_NAME', 'jour_de_match');
	define('DB_SERVER', 'localhost'); 
	?>
	```
	>user : votre nom d'utilisateur
	>monpwd : votre mot de passe

**L'installation serveur est maintenant faite, vous pouvez vous connecter à votre site web : http://votreip

------------------------

Compte d'utilisateur test : 
- Utilisateur avec notification en attente
	- emilie@gmail.com
	- mdp : 205

- Utilisateur qui a envoyé la notification
	- thomas@gmail.com
	- mdp : th22
