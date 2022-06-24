-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 24 juin 2022 à 08:25
-- Version du serveur : 10.5.15-MariaDB-0+deb11u1
-- Version de PHP : 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jour_de_match`
--

-- --------------------------------------------------------

--
-- Structure de la table `a_comme_statut`
--

CREATE TABLE `a_comme_statut` (
  `id_jeux` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `organisateur` tinyint(4) NOT NULL,
  `joueur` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `a_comme_statut`
--

INSERT INTO `a_comme_statut` (`id_jeux`, `email`, `organisateur`, `joueur`) VALUES
(20, 'carole@gmail.com', 0, 1),
(20, 'emilie@gmail.com', 1, 1),
(20, 'thomas@gmail.com', 0, 1),
(21, 'angelique@gmail.com', 0, 1),
(21, 'carole@gmail.com', 0, 1),
(21, 'emilie@gmail.com', 1, 0),
(21, 'folrian@gmail.com', 0, 1),
(21, 'madec@gmail.com', 0, 1),
(21, 'nadine@gmail.com', 0, 1),
(22, 'carole@gmail.com', 1, 0),
(22, 'folrian@gmail.com', 0, 1),
(22, 'thomas@gmail.com', 0, 1),
(23, 'angelique@gmail.com', 0, 1),
(23, 'carole@gmail.com', 0, 1),
(23, 'emilie@gmail.com', 0, 1),
(23, 'folrian@gmail.com', 1, 1),
(23, 'thomas@gmail.com', 0, 1),
(24, 'carole@gmail.com', 0, 1),
(24, 'emilie@gmail.com', 0, 1),
(24, 'madec@gmail.com', 0, 1),
(24, 'thomas@gmail.com', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `demande`
--

CREATE TABLE `demande` (
  `id_jeux` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `accepter` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `demande`
--

INSERT INTO `demande` (`id_jeux`, `email`, `accepter`) VALUES
(20, 'carole@gmail.com', 1),
(20, 'emilie@gmail.com', 1),
(20, 'thomas@gmail.com', 1),
(21, 'angelique@gmail.com', 1),
(21, 'carole@gmail.com', 1),
(21, 'folrian@gmail.com', 1),
(21, 'madec@gmail.com', 1),
(21, 'nadine@gmail.com', 1),
(21, 'thomas@gmail.com', 0),
(22, 'folrian@gmail.com', 1),
(22, 'thomas@gmail.com', 1),
(24, 'carole@gmail.com', 1),
(24, 'emilie@gmail.com', 1),
(24, 'madec@gmail.com', 1),
(24, 'thomas@gmail.com', 1);

-- --------------------------------------------------------

--
-- Structure de la table `forme_sportive`
--

CREATE TABLE `forme_sportive` (
  `texte` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `forme_sportive`
--

INSERT INTO `forme_sportive` (`texte`) VALUES
('Débutant'),
('Expert'),
('Intermédiaire');

-- --------------------------------------------------------

--
-- Structure de la table `jeux`
--

CREATE TABLE `jeux` (
  `id_jeux` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `nb_joueurmax` int(11) NOT NULL,
  `nb_joueurmin` int(11) DEFAULT NULL,
  `prix` float NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `equipe_a` int(11) DEFAULT NULL,
  `equipe_b` int(11) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `date` date NOT NULL,
  `duree` time NOT NULL,
  `heure` time NOT NULL,
  `type_sport` varchar(50) NOT NULL,
  `insee` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `jeux`
--

INSERT INTO `jeux` (`id_jeux`, `titre`, `adresse`, `nb_joueurmax`, `nb_joueurmin`, `prix`, `description`, `equipe_a`, `equipe_b`, `prenom`, `nom`, `date`, `duree`, `heure`, `type_sport`, `insee`) VALUES
(20, 'Tennis junior', 'gymnase de st piere', 3, NULL, 4, 'tournois de tennis', NULL, NULL, NULL, NULL, '2022-07-10', '01:00:00', '10:30:00', 'Tennis', '29019'),
(21, 'Nat\'s coupe', 'Piscine municipale', 15, NULL, 5, 'Tout le monde peut participer', NULL, NULL, NULL, NULL, '2022-07-04', '02:30:00', '14:00:00', 'Natation', '35288'),
(22, 'L\'Avar', '20 rue Emile Zola', 8, NULL, 95, 'Concours de pétanque, avec un prix pour le gagnant !', NULL, NULL, NULL, NULL, '2022-10-02', '03:00:00', '18:00:00', 'Pétanque', '35238'),
(23, 'Coupe uropa', '14 rue de l\'abriler', 5, NULL, 12.55, 'il y a un prix pour le gagnant, et une buvette se tiendra entre midi et deux', 13, 10, 'Thomas', 'Jolier', '2022-06-01', '02:00:00', '11:00:00', 'Pétanque', '22113	'),
(24, 'football Cup', 'Terrain de bellaire', 22, NULL, 0, 'Match amical ', NULL, NULL, NULL, NULL, '2022-08-27', '02:00:00', '14:00:00', 'Football', '29061');

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE `profil` (
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `photo` text DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `notation_app_web` int(11) DEFAULT NULL,
  `insee` varchar(6) NOT NULL,
  `texte` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`email`, `mot_de_passe`, `prenom`, `nom`, `photo`, `date_naissance`, `notation_app_web`, `insee`, `texte`) VALUES
('angelique@gmail.com', '$2y$10$Gpa1uG7p5GUZJF.yEYB72OdhnA6dIu6R1FmzZHrwygB1sa5jNu6/O', 'Angélique', 'Abril', 'photo/brune.png', '2000-01-01', 3, '33063', 'Expert'),
('carole@gmail.com', '$2y$10$QA4AJmFyebdEq76TH72CoOwtJ//KYwHHx0p.UsZldoNp.6534OSOS', 'Carole', 'L\'Aviere', 'photo/rousse.png', '2000-01-01', 2, '35238', 'Expert'),
('emilie@gmail.com', '$2y$10$lWB.rWElrZqllrV1eCGQv.oioQWOyLJbL0.7zHLMlzIOv1Um9TVXa', 'Emilie', 'Le Rouzic', 'photo/chatain.png', '2002-01-18', 3, '29019', 'Expert'),
('folrian@gmail.com', '$2y$10$jSqU7LHLZL.UfvgfR5Ix0OserYMClVU.FmblBuPVSJ3Nnk3moSrKO', 'Florian', 'Moreau', 'photo/lunette.png', '2001-08-05', 3, '83137', 'Intermédiaire'),
('madec@gmail.com', '$2y$10$8AkHog2L.AkfD6LanlioGemBiqP1k3XquODpq57W5Uee8CTcjciXO', 'Maïel', 'Madec', 'photo/moustachu.png', '2000-01-22', 5, '29061', 'Expert'),
('nadine@gmail.com', '$2y$10$bYjLerFnmeuXduENN7ZffOMWfeU6Jc4lYEEUygpanuLcBJTnE090q', 'Pasquier', 'Nadine', 'photo/rousse.png', '2002-01-20', 5, '59350', 'Expert'),
('thomas@gmail.com', '$2y$10$yVog1b3I1J3lD9suqtAQZOfo1ICxOcm4h5NLBHv6j00ToW0l91X6q', 'Thomas', 'Jolier', 'photo/blond.png', '1975-02-15', 3, '29061', 'Expert');

-- --------------------------------------------------------

--
-- Structure de la table `sport`
--

CREATE TABLE `sport` (
  `type_sport` varchar(50) NOT NULL,
  `icone` text DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sport`
--

INSERT INTO `sport` (`type_sport`, `icone`, `image`) VALUES
('Baseball', 'icone/baseball.png', 'image/baseball.png'),
('Football', 'icone/foot.png', 'image/foot.png'),
('Natation', 'icone/natation.png', 'image/natation.png'),
('Pétanque', 'icone/petanque.png', 'image/petanque.png'),
('Tennis', 'icone/tennis.png', 'image/tennis.png');

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

CREATE TABLE `ville` (
  `insee` varchar(6) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ville`
--

INSERT INTO `ville` (`insee`, `nom`) VALUES
('06088', 'Nice'),
('13055', 'Marseille'),
('14118', 'Caen'),
('22113	', 'Lannion'),
('29019', 'Brest'),
('29040', 'Le Conquet'),
('29061', 'Gouesnou'),
('29075', 'Guipavas'),
('29212', 'Plouzané'),
('29260', 'Saint-Renan'),
('31555', 'Toulouse'),
('33063', 'Bordeaux'),
('35238', 'Rennes'),
('35288', 'Saint-Malo'),
('44109', 'Nantes'),
('56121', 'Lorient'),
('56260', 'Vannes'),
('59350', 'Lille'),
('67482', 'Strasbourg'),
('69123', 'Lyon'),
('75056', 'Paris'),
('83137', 'Toulon');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `a_comme_statut`
--
ALTER TABLE `a_comme_statut`
  ADD PRIMARY KEY (`id_jeux`,`email`),
  ADD KEY `a_comme_statut_profil0_FK` (`email`);

--
-- Index pour la table `demande`
--
ALTER TABLE `demande`
  ADD PRIMARY KEY (`id_jeux`,`email`),
  ADD KEY `demande_profil0_FK` (`email`);

--
-- Index pour la table `forme_sportive`
--
ALTER TABLE `forme_sportive`
  ADD PRIMARY KEY (`texte`);

--
-- Index pour la table `jeux`
--
ALTER TABLE `jeux`
  ADD PRIMARY KEY (`id_jeux`),
  ADD KEY `jeux_sport_FK` (`type_sport`),
  ADD KEY `jeux_ville0_FK` (`insee`);

--
-- Index pour la table `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`email`),
  ADD KEY `profil_ville_FK` (`insee`),
  ADD KEY `profil_forme_sportive0_FK` (`texte`);

--
-- Index pour la table `sport`
--
ALTER TABLE `sport`
  ADD PRIMARY KEY (`type_sport`);

--
-- Index pour la table `ville`
--
ALTER TABLE `ville`
  ADD PRIMARY KEY (`insee`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `jeux`
--
ALTER TABLE `jeux`
  MODIFY `id_jeux` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `a_comme_statut`
--
ALTER TABLE `a_comme_statut`
  ADD CONSTRAINT `a_comme_statut_jeux_FK` FOREIGN KEY (`id_jeux`) REFERENCES `jeux` (`id_jeux`),
  ADD CONSTRAINT `a_comme_statut_profil0_FK` FOREIGN KEY (`email`) REFERENCES `profil` (`email`);

--
-- Contraintes pour la table `demande`
--
ALTER TABLE `demande`
  ADD CONSTRAINT `demande_jeux_FK` FOREIGN KEY (`id_jeux`) REFERENCES `jeux` (`id_jeux`),
  ADD CONSTRAINT `demande_profil0_FK` FOREIGN KEY (`email`) REFERENCES `profil` (`email`);

--
-- Contraintes pour la table `jeux`
--
ALTER TABLE `jeux`
  ADD CONSTRAINT `jeux_sport_FK` FOREIGN KEY (`type_sport`) REFERENCES `sport` (`type_sport`),
  ADD CONSTRAINT `jeux_ville0_FK` FOREIGN KEY (`insee`) REFERENCES `ville` (`insee`);

--
-- Contraintes pour la table `profil`
--
ALTER TABLE `profil`
  ADD CONSTRAINT `profil_forme_sportive0_FK` FOREIGN KEY (`texte`) REFERENCES `forme_sportive` (`texte`),
  ADD CONSTRAINT `profil_ville_FK` FOREIGN KEY (`insee`) REFERENCES `ville` (`insee`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
