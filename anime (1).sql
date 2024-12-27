-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 27 déc. 2024 à 13:56
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `anime`
--

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add category', 7, 'add_category'),
(26, 'Can change category', 7, 'change_category'),
(27, 'Can delete category', 7, 'delete_category'),
(28, 'Can view category', 7, 'view_category'),
(29, 'Can add round', 8, 'add_round'),
(30, 'Can change round', 8, 'change_round'),
(31, 'Can delete round', 8, 'delete_round'),
(32, 'Can view round', 8, 'view_round'),
(33, 'Can add question', 9, 'add_question'),
(34, 'Can change question', 9, 'change_question'),
(35, 'Can delete question', 9, 'delete_question'),
(36, 'Can view question', 9, 'view_question'),
(37, 'Can add option', 10, 'add_option'),
(38, 'Can change option', 10, 'change_option'),
(39, 'Can delete option', 10, 'delete_option'),
(40, 'Can view option', 10, 'view_option'),
(41, 'Can add match', 11, 'add_match'),
(42, 'Can change match', 11, 'change_match'),
(43, 'Can delete match', 11, 'delete_match'),
(44, 'Can view match', 11, 'view_match'),
(45, 'Can add tournament', 12, 'add_tournament'),
(46, 'Can change tournament', 12, 'change_tournament'),
(47, 'Can delete tournament', 12, 'delete_tournament'),
(48, 'Can view tournament', 12, 'view_tournament'),
(49, 'Can add vote', 13, 'add_vote'),
(50, 'Can change vote', 13, 'change_vote'),
(51, 'Can delete vote', 13, 'delete_vote'),
(52, 'Can view vote', 13, 'view_vote');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `backend_category`
--

CREATE TABLE `backend_category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_category`
--

INSERT INTO `backend_category` (`id`, `name`, `type`, `description`) VALUES
(1, 'Meilleur Antagoniste', 'Personnages', 'Les personnages les plus mémorables parmi les antagonistes d’anime'),
(2, 'Meilleur Personnage Principal', 'Personnages', 'Les héros les plus emblématiques des séries anime'),
(3, 'Personnage le Plus Intelligent', 'Personnages', 'Les personnages qui surpassent tout le monde par leur intelligence'),
(4, 'Personnage le Plus Cheaté', 'Personnages', 'Les personnages avec des pouvoirs trop forts'),
(5, 'Personnage le Plus Fort', 'Personnages', 'Les personnages qui possèdent une force brute incroyable'),
(6, 'Anime avec la Meilleure Fin', 'Animes', 'Les animes avec des fins marquantes et mémorables'),
(7, 'Anime avec le Meilleur Début', 'Animes', 'Les animes avec les introductions les plus captivantes'),
(8, 'Meilleur Anime Triste', 'Animes', 'Les animes qui vous feront verser des larmes'),
(9, 'Meilleur Opening', 'Opening', 'Les intros musicales les plus iconiques des animes'),
(10, 'Meilleur OST', 'Ost', 'Les bandes sonores qui accompagnent parfaitement les scènes d’anime');

-- --------------------------------------------------------

--
-- Structure de la table `backend_match`
--

CREATE TABLE `backend_match` (
  `id` bigint(20) NOT NULL,
  `option1_votes` int(11) NOT NULL,
  `option2_votes` int(11) NOT NULL,
  `option1_id` bigint(20) NOT NULL,
  `option2_id` bigint(20) NOT NULL,
  `winner_id` bigint(20) DEFAULT NULL,
  `round_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `backend_option`
--

CREATE TABLE `backend_option` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `anime_source` varchar(100) NOT NULL,
  `question_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_option`
--

INSERT INTO `backend_option` (`id`, `name`, `image`, `description`, `anime_source`, `question_id`) VALUES
(1, 'Light Yagami', 'https://cdn.myanimelist.net/images/characters/6/63870.jpg', 'Un génie avec un sens de la justice tordu.', 'Death Note', 1),
(2, 'Madara Uchiha', 'https://cdn.myanimelist.net/images/characters/12/450359.jpg', 'Un ninja légendaire avec des pouvoirs incroyables.', 'Naruto', 1),
(3, 'Naruto Uzumaki', 'https://cdn.myanimelist.net/images/characters/12/61330.jpg', 'Un ninja déterminé à devenir Hokage.', 'Naruto', 2),
(4, 'Lelouch vi Britannia', 'https://cdn.myanimelist.net/images/characters/13/149875.jpg', 'Un stratège brillant luttant pour la liberté.', 'Code Geass', 2),
(5, 'Lelouch vi Britannia', 'https://cdn.myanimelist.net/images/characters/13/149875.jpg', 'Un stratège brillant luttant pour la liberté.', 'Code Geass', 3),
(6, 'Light Yagami', 'https://cdn.myanimelist.net/images/characters/6/63870.jpg', 'Un génie avec un sens de la justice tordu.', 'Death Note', 3),
(7, 'Saitama', 'https://cdn.myanimelist.net/images/characters/11/294388.jpg', 'Un héros surpuissant qui peut vaincre n’importe quel ennemi d’un seul coup.', 'One Punch Man', 4),
(8, 'Goku', 'https://cdn.myanimelist.net/images/characters/14/401183.jpg', 'Un guerrier Saiyan avec des pouvoirs incroyables.', 'Dragon Ball', 4),
(9, 'Goku', 'https://cdn.myanimelist.net/images/characters/14/401183.jpg', 'Un guerrier Saiyan avec des pouvoirs incroyables.', 'Dragon Ball', 5),
(10, 'Saitama', 'https://cdn.myanimelist.net/images/characters/11/294388.jpg', 'Un héros surpuissant qui peut vaincre n’importe quel ennemi d’un seul coup.', 'One Punch Man', 5),
(11, 'Code Geass', 'https://cdn.myanimelist.net/images/characters/12/442761.jpg', 'Une fin épique et émouvante.', 'Code Geass', 6),
(12, 'Steins;Gate', 'https://cdn.myanimelist.net/images/characters/16/557273.jpg', 'Une fin complexe et satisfaisante.', 'Steins;Gate', 6),
(23, 'Killua Zoldyck', 'https://cdn.myanimelist.net/images/characters/2/327920.jpg', 'Un assassin talentueux et loyal.', 'Hunter x Hunter', 2),
(24, 'Ken Kaneki', 'https://cdn.myanimelist.net/images/characters/15/307255.jpg', 'Un goule hybride luttant pour sa survie.', 'Tokyo Ghoul', 2),
(26, 'Monkey D. Luffy', 'https://cdn.myanimelist.net/images/characters/9/310307.jpg', 'Un pirate énergique rêvant de devenir le roi des pirates.', 'One Piece', 5),
(29, 'Rintaro Okabe', 'https://cdn.myanimelist.net/images/characters/6/122643.jpg', 'Un scientifique fou voyageant dans le temps.', 'Steins;Gate', 3),
(30, 'Mikasa Ackerman', 'https://cdn.myanimelist.net/images/characters/9/215563.jpg', 'Une guerrière forte et protectrice.', 'Attack on Titan', 5),
(41, 'Frieza', 'https://cdn.myanimelist.net/images/characters/16/561778.jpg', 'Un tyran impitoyable et puissant.', 'Dragon Ball', 1),
(42, 'Johan Liebert', 'https://cdn.myanimelist.net/images/characters/4/316522.jpg', 'Un manipulateur brillant et terrifiant.', 'Monster', 1),
(43, 'Hisoka', 'https://cdn.myanimelist.net/images/characters/9/531213.jpg', 'Un clown sadique et imprévisible.', 'Hunter x Hunter', 1),
(44, 'Griffith', 'https://cdn.myanimelist.net/images/characters/13/558264.jpg', 'Un leader charismatique et cruel.', 'Berserk', 1),
(45, 'Ichigo Kurosaki', 'https://cdn.myanimelist.net/images/characters/3/512788.jpg', 'Un Shinigami substitut déterminé à protéger ses amis.', 'Bleach', 2),
(47, 'Eren Jaeger', 'https://cdn.myanimelist.net/images/characters/2/381118.jpg', 'Un jeune homme déterminé à éliminer les titans.', 'Attack on Titan', 2),
(48, 'Luffy', 'https://cdn.myanimelist.net/images/characters/9/310307.jpg', 'Un pirate énergique rêvant de devenir le roi des pirates.', 'One Piece', 2),
(49, 'Shikamaru Nara', 'https://cdn.myanimelist.net/images/characters/3/131315.jpg', 'Un ninja stratège avec un QI élevé.', 'Naruto', 3),
(50, 'Kurisu Makise', 'https://cdn.myanimelist.net/images/characters/12/492885.jpg', 'Une scientifique brillante spécialisée en neuroscience.', 'Steins;Gate', 3),
(51, 'Conan Edogawa', 'https://cdn.myanimelist.net/images/characters/11/308347.jpg', 'Un détective génial résolvant des mystères complexes.', 'Detective Conan', 3),
(52, 'Senku Ishigami', 'https://cdn.myanimelist.net/images/characters/8/380950.jpg', 'Un scientifique brillant reconstruisant la civilisation.', 'Dr. Stone', 3),
(53, 'Alucard', 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png', 'Un vampire surpuissant et immortel.', 'Hellsing Ultimate', 4),
(54, 'Tatsumaki', 'https://cdn.myanimelist.net/images/characters/7/459590.jpg', 'Une esper aux pouvoirs télékinétiques incroyables.', 'One Punch Man', 4),
(55, 'Gilgamesh', 'https://cdn.myanimelist.net/images/characters/16/551049.jpg', 'Un roi ancien avec une collection d’armes légendaires.', 'Fate/Zero', 4),
(56, 'Rimuru Tempest', 'https://cdn.myanimelist.net/images/characters/4/495795.jpg', 'Un slime réincarné avec des pouvoirs divins.', 'That Time I Got Reincarnated as a Slime', 4),
(57, 'Naruto Uzumaki', 'https://cdn.myanimelist.net/images/characters/12/61330.jpg', 'Un ninja déterminé à devenir Hokage.', 'Naruto', 5),
(59, 'Guts', 'https://cdn.myanimelist.net/images/characters/13/284125.jpg', 'Un guerrier redoutable avec une épée massive.', 'Berserk', 5),
(60, 'Kaguya Otsutsuki', 'https://cdn.myanimelist.net/images/characters/5/292976.jpg', 'Une déesse avec des pouvoirs divins.', 'Naruto', 5),
(61, 'Fullmetal Alchemist: Brotherhood', 'https://cdn.myanimelist.net/images/characters/16/557273.jpg', 'Une fin émouvante et satisfaisante.', 'Fullmetal Alchemist: Brotherhood', 6),
(62, 'Cowboy Bebop', 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png', 'Une fin poignante et mémorable.', 'Cowboy Bebop', 6),
(63, 'Death Note', 'https://cdn.myanimelist.net/images/characters/11/556039.jpg', 'Une fin intense et controversée.', 'Death Note', 6),
(64, 'Your Lie in April', 'https://cdn.myanimelist.net/images/characters/15/561246.jpg', 'Une fin émouvante et tragique.', 'Your Lie in April', 6),
(69, 'Fullmetal Alchemist: Brotherhood', 'https://cdn.myanimelist.net/images/characters/16/557273.jpg', 'Une fin émouvante et satisfaisante.', 'Fullmetal Alchemist: Brotherhood', 6),
(70, 'Cowboy Bebop', 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png', 'Une fin poignante et mémorable.', 'Cowboy Bebop', 6),
(71, 'Steins;Gate', 'https://cdn.myanimelist.net/images/characters/16/557273.jpg', 'Une fin complexe et satisfaisante.', 'Steins;Gate', 6),
(72, 'Death Note', 'https://cdn.myanimelist.net/images/characters/11/556039.jpg', 'Une fin intense et controversée.', 'Death Note', 6),
(73, 'Attack on Titan', 'https://cdn.myanimelist.net/images/characters/2/381118.jpg', 'Une introduction captivante et intense.', 'Attack on Titan', 7),
(74, 'Death Note', 'https://cdn.myanimelist.net/images/characters/11/556039.jpg', 'Un début intrigant et accrocheur.', 'Death Note', 7),
(75, 'Code Geass', 'https://cdn.myanimelist.net/images/characters/13/149875.jpg', 'Une introduction stratégique et captivante.', 'Code Geass', 7),
(76, 'Naruto', 'https://cdn.myanimelist.net/images/characters/12/61330.jpg', 'Un début émouvant et plein d’action.', 'Naruto', 7),
(77, 'Your Lie in April', 'https://cdn.myanimelist.net/images/characters/15/561246.jpg', 'Une histoire émouvante et tragique.', 'Your Lie in April', 8),
(78, 'Clannad: After Story', 'https://cdn.myanimelist.net/images/characters/12/442761.jpg', 'Une histoire touchante et émotionnelle.', 'Clannad: After Story', 8),
(79, 'Anohana: The Flower We Saw That Day', 'https://cdn.myanimelist.net/images/characters/16/557273.jpg', 'Une histoire de deuil et d’amitié.', 'Anohana: The Flower We Saw That Day', 8),
(80, 'Violet Evergarden', 'https://cdn.myanimelist.net/images/characters/11/556039.jpg', 'Une histoire de rédemption et de découverte de soi.', 'Violet Evergarden', 8),
(81, 'Guren no Yumiya - Attack on Titan', 'https://cdn.myanimelist.net/images/characters/2/381118.jpg', 'Un opening intense et épique.', 'Attack on Titan', 9),
(82, 'Unravel - Tokyo Ghoul', 'https://cdn.myanimelist.net/images/characters/15/307255.jpg', 'Un opening sombre et captivant.', 'Tokyo Ghoul', 9),
(83, 'The World - Death Note', 'https://cdn.myanimelist.net/images/characters/11/556039.jpg', 'Un opening mystérieux et accrocheur.', 'Death Note', 9),
(84, 'Colors - Code Geass', 'https://cdn.myanimelist.net/images/characters/13/149875.jpg', 'Un opening stratégique et captivant.', 'Code Geass', 9),
(85, 'Clannad: After Story', 'https://cdn.myanimelist.net/images/characters/12/442761.jpg', 'Une fin émotive et bouleversante.', 'Clannad: After Story', 6),
(86, 'Attack on Titan', 'https://cdn.myanimelist.net/images/characters/2/381118.jpg', 'Une fin grandiose et pleine d’action.', 'Attack on Titan', 6),
(87, 'One Piece', 'https://cdn.myanimelist.net/images/characters/9/310307.jpg', 'Un début épique et aventureux.', 'One Piece', 7),
(88, 'My Hero Academia', 'https://cdn.myanimelist.net/images/characters/13/438617.jpg', 'Une introduction pleine de passion et de super-héros.', 'My Hero Academia', 7),
(89, 'Made in Abyss', 'https://cdn.myanimelist.net/images/characters/6/312272.jpg', 'Une aventure belle mais dévastatrice.', 'Made in Abyss', 8),
(90, 'Angel Beats!', 'https://cdn.myanimelist.net/images/characters/4/195289.jpg', 'Une histoire touchante dans l’au-delà.', 'Angel Beats!', 8),
(91, 'My Dearest - Ghost in the Shell', 'https://cdn.myanimelist.net/images/characters/8/225183.jpg', 'Un opening cyberpunk et émotionnel.', 'Ghost in the Shell', 9),
(92, 'Crossing Field - Sword Art Online', 'https://cdn.myanimelist.net/images/characters/9/310307.jpg', 'Un opening énergique et moderne.', 'Sword Art Online', 9),
(93, 'Tank! - Cowboy Bebop', 'https://cdn.myanimelist.net/images/characters/7/153771.jpg', 'Un OST dynamique et entraînant.', 'Cowboy Bebop', 10),
(94, 'Again - Fullmetal Alchemist: Brotherhood', 'https://cdn.myanimelist.net/images/characters/16/557273.jpg', 'Un OST puissant et émotionnel.', 'Fullmetal Alchemist: Brotherhood', 10),
(95, 'The Day - Death Note', 'https://cdn.myanimelist.net/images/characters/11/556039.jpg', 'Un OST mystérieux et intense.', 'Death Note', 10),
(96, 'Aimer - Fate/stay night: Unlimited Blade Works', 'https://cdn.myanimelist.net/images/characters/8/489319.jpg', 'Un OST épique et émouvant.', 'Fate/stay night: Unlimited Blade Works', 10),
(97, 'My Soul, Your Beats! - Angel Beats!', 'https://cdn.myanimelist.net/images/characters/4/195289.jpg', 'Un OST vibrant et plein d’émotions.', 'Angel Beats!', 10),
(98, 'This Game - No Game No Life', 'https://cdn.myanimelist.net/images/characters/13/45367.jpg', 'Un OST énergique et stimulant.', 'No Game No Life', 10);

-- --------------------------------------------------------

--
-- Structure de la table `backend_question`
--

CREATE TABLE `backend_question` (
  `id` bigint(20) NOT NULL,
  `text` varchar(200) NOT NULL,
  `category_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_question`
--

INSERT INTO `backend_question` (`id`, `text`, `category_id`) VALUES
(1, 'Quel est le meilleur antagoniste dans les anime ?', 1),
(2, 'Quel est le meilleur personnage principal dans les anime ?', 2),
(3, 'Quel personnage anime est le plus intelligent ?', 3),
(4, 'Quel personnage anime est le plus \"cheaté\" ?', 4),
(5, 'Quel personnage anime est le plus fort ?', 5),
(6, 'Quel anime a la meilleure fin ?', 6),
(7, 'Quel anime a le meilleur début ?', 7),
(8, 'Quel est le meilleur anime triste ?', 8),
(9, 'Quel est le meilleur opening d’anime ?', 9),
(10, 'Quel est le meilleur OST d’un anime ?', 10);

-- --------------------------------------------------------

--
-- Structure de la table `backend_round`
--

CREATE TABLE `backend_round` (
  `id` bigint(20) NOT NULL,
  `round_number` int(11) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `tournament_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_round`
--

INSERT INTO `backend_round` (`id`, `round_number`, `start_time`, `end_time`, `is_active`, `tournament_id`) VALUES
(1, 1, '2024-12-27 09:21:42.543000', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `backend_tournament`
--

CREATE TABLE `backend_tournament` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `question_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `backend_tournament`
--

INSERT INTO `backend_tournament` (`id`, `name`, `created_at`, `is_active`, `category_id`, `question_id`) VALUES
(1, 'Tournoi Anime', '2024-12-27 09:21:29.637261', 1, 8, 8),
(2, 'Tournoi Anime', '2024-12-27 09:39:34.227668', 1, 1, 1),
(3, 'Tournoi Anime', '2024-12-27 09:40:16.565631', 1, 10, 10),
(4, 'Tournoi Anime', '2024-12-27 09:54:00.014889', 1, 1, 1),
(5, 'Tournoi Anime', '2024-12-27 09:58:39.966945', 1, 2, 2),
(6, 'Tournoi Anime', '2024-12-27 10:05:00.294252', 1, 1, 1),
(7, 'Tournoi Anime', '2024-12-27 10:15:09.711983', 1, 7, 7),
(8, 'Tournoi Anime', '2024-12-27 10:25:24.605581', 1, 10, 10),
(9, 'Tournoi Anime', '2024-12-27 10:31:45.369384', 1, 6, 6),
(10, 'Tournoi Anime', '2024-12-27 10:38:06.342298', 1, 10, 10),
(11, 'Tournoi Anime', '2024-12-27 10:38:06.462542', 1, 10, 10),
(12, 'Tournoi Anime', '2024-12-27 10:49:22.743930', 1, 4, 4),
(13, 'Tournoi Anime', '2024-12-27 10:51:15.504397', 1, 4, 4),
(14, 'Tournoi Anime', '2024-12-27 10:52:53.447739', 1, 2, 2),
(15, 'Tournoi Anime', '2024-12-27 10:58:10.638428', 1, 1, 1),
(16, 'Tournoi Anime', '2024-12-27 11:00:47.453379', 1, 8, 8),
(17, 'Tournoi Anime', '2024-12-27 11:01:48.336667', 1, 7, 7),
(18, 'Tournoi Anime', '2024-12-27 11:30:31.098464', 1, 7, 7),
(19, 'Tournoi Anime', '2024-12-27 11:30:34.571491', 1, 7, 7),
(20, 'Tournoi Anime', '2024-12-27 11:30:59.455693', 1, 10, 10),
(21, 'Tournoi Anime', '2024-12-27 11:40:47.276884', 1, 9, 9),
(22, 'Tournoi Anime', '2024-12-27 11:41:06.161263', 1, 1, 1),
(23, 'Tournoi Anime', '2024-12-27 11:41:39.076892', 1, 2, 2),
(24, 'Tournoi Anime', '2024-12-27 11:42:10.321147', 1, 8, 8),
(25, 'Tournoi Anime', '2024-12-27 11:42:11.414318', 1, 8, 8),
(26, 'Tournoi Anime', '2024-12-27 11:42:11.627535', 1, 8, 8),
(27, 'Tournoi Anime', '2024-12-27 11:42:36.869670', 1, 1, 1),
(28, 'Tournoi Anime', '2024-12-27 11:43:01.654554', 1, 1, 1),
(29, 'Tournoi Anime', '2024-12-27 11:43:03.462698', 1, 1, 1),
(30, 'Tournoi Anime', '2024-12-27 11:49:34.093034', 1, 1, 1),
(31, 'Tournoi Anime', '2024-12-27 11:54:13.692016', 1, 2, 2),
(32, 'Tournoi Anime', '2024-12-27 11:58:46.470170', 1, 10, 10),
(33, 'Tournoi Anime', '2024-12-27 12:15:36.298834', 1, 2, 2),
(34, 'Tournoi Anime', '2024-12-27 12:24:15.142201', 1, 10, 10),
(35, 'Tournoi Anime', '2024-12-27 12:27:24.409869', 1, 5, 5),
(36, 'Tournoi Anime', '2024-12-27 12:27:41.059346', 1, 6, 6),
(37, 'Tournoi Anime', '2024-12-27 12:27:55.994489', 1, 7, 7),
(38, 'Tournoi Anime', '2024-12-27 12:27:57.510447', 1, 7, 7),
(39, 'Tournoi Anime', '2024-12-27 12:28:07.758983', 1, 9, 9),
(40, 'Tournoi Anime', '2024-12-27 12:28:12.797592', 1, 10, 10),
(41, 'Tournoi Anime', '2024-12-27 12:55:21.171911', 1, 8, 8),
(42, 'Tournoi Anime', '2024-12-27 12:55:33.553707', 1, 10, 10),
(43, 'Tournoi Anime', '2024-12-27 12:55:34.841416', 1, 10, 10),
(44, 'Tournoi Anime', '2024-12-27 12:55:35.047706', 1, 10, 10),
(45, 'Tournoi Anime', '2024-12-27 12:55:35.258804', 1, 10, 10),
(46, 'Tournoi Anime', '2024-12-27 12:55:36.723598', 1, 10, 10),
(47, 'Tournoi Anime', '2024-12-27 12:55:36.889654', 1, 10, 10),
(48, 'Tournoi Anime', '2024-12-27 12:55:37.109127', 1, 10, 10);

-- --------------------------------------------------------

--
-- Structure de la table `backend_vote`
--

CREATE TABLE `backend_vote` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `match_id` bigint(20) NOT NULL,
  `option_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(7, 'Backend', 'category'),
(11, 'Backend', 'match'),
(10, 'Backend', 'option'),
(9, 'Backend', 'question'),
(8, 'Backend', 'round'),
(12, 'Backend', 'tournament'),
(13, 'Backend', 'vote'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-12-27 08:48:07.877487'),
(2, 'auth', '0001_initial', '2024-12-27 08:48:08.651508'),
(3, 'Backend', '0001_initial', '2024-12-27 08:48:09.798885'),
(4, 'admin', '0001_initial', '2024-12-27 08:48:09.995597'),
(5, 'admin', '0002_logentry_remove_auto_add', '2024-12-27 08:48:10.010020'),
(6, 'admin', '0003_logentry_add_action_flag_choices', '2024-12-27 08:48:10.010020'),
(7, 'contenttypes', '0002_remove_content_type_name', '2024-12-27 08:48:10.293146'),
(8, 'auth', '0002_alter_permission_name_max_length', '2024-12-27 08:48:10.404435'),
(9, 'auth', '0003_alter_user_email_max_length', '2024-12-27 08:48:10.452445'),
(10, 'auth', '0004_alter_user_username_opts', '2024-12-27 08:48:10.464808'),
(11, 'auth', '0005_alter_user_last_login_null', '2024-12-27 08:48:10.608964'),
(12, 'auth', '0006_require_contenttypes_0002', '2024-12-27 08:48:10.612559'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2024-12-27 08:48:10.612559'),
(14, 'auth', '0008_alter_user_username_max_length', '2024-12-27 08:48:10.647318'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2024-12-27 08:48:10.670791'),
(16, 'auth', '0010_alter_group_name_max_length', '2024-12-27 08:48:10.709967'),
(17, 'auth', '0011_update_proxy_permissions', '2024-12-27 08:48:10.728971'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2024-12-27 08:48:10.747940'),
(19, 'sessions', '0001_initial', '2024-12-27 08:48:10.797312'),
(20, 'Backend', '0002_match_unique_match_per_round_and_more', '2024-12-27 09:10:41.820716'),
(21, 'Backend', '0003_remove_tournament_creator_alter_round_end_time', '2024-12-27 09:18:24.756707');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Index pour la table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Index pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `backend_category`
--
ALTER TABLE `backend_category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `backend_match`
--
ALTER TABLE `backend_match`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_match_per_round` (`round_id`,`option1_id`,`option2_id`),
  ADD UNIQUE KEY `unique_reverse_match_per_round` (`round_id`,`option2_id`,`option1_id`),
  ADD KEY `Backend_match_option1_id_c27d4fc1_fk_Backend_option_id` (`option1_id`),
  ADD KEY `Backend_match_option2_id_1e91b2f3_fk_Backend_option_id` (`option2_id`),
  ADD KEY `Backend_match_winner_id_f7b53b6d_fk_Backend_option_id` (`winner_id`),
  ADD KEY `Backend_match_round_id_78f901c7_fk_Backend_round_id` (`round_id`);

--
-- Index pour la table `backend_option`
--
ALTER TABLE `backend_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Backend_option_question_id_47d9dc26_fk_Backend_question_id` (`question_id`);

--
-- Index pour la table `backend_question`
--
ALTER TABLE `backend_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Backend_question_category_id_c21ce76d_fk_Backend_category_id` (`category_id`);

--
-- Index pour la table `backend_round`
--
ALTER TABLE `backend_round`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Backend_round_tournament_id_round_number_47a973c3_uniq` (`tournament_id`,`round_number`);

--
-- Index pour la table `backend_tournament`
--
ALTER TABLE `backend_tournament`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Backend_tournament_category_id_dc0784db_fk_Backend_category_id` (`category_id`),
  ADD KEY `Backend_tournament_question_id_44d50590_fk_Backend_question_id` (`question_id`);

--
-- Index pour la table `backend_vote`
--
ALTER TABLE `backend_vote`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Backend_vote_match_id_user_id_d86360b1_uniq` (`match_id`,`user_id`),
  ADD KEY `Backend_vote_option_id_0763f019_fk_Backend_option_id` (`option_id`),
  ADD KEY `Backend_vote_user_id_4a6117f3_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Index pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `backend_category`
--
ALTER TABLE `backend_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `backend_match`
--
ALTER TABLE `backend_match`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `backend_option`
--
ALTER TABLE `backend_option`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT pour la table `backend_question`
--
ALTER TABLE `backend_question`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `backend_round`
--
ALTER TABLE `backend_round`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `backend_tournament`
--
ALTER TABLE `backend_tournament`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `backend_vote`
--
ALTER TABLE `backend_vote`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Contraintes pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `backend_match`
--
ALTER TABLE `backend_match`
  ADD CONSTRAINT `Backend_match_option1_id_c27d4fc1_fk_Backend_option_id` FOREIGN KEY (`option1_id`) REFERENCES `backend_option` (`id`),
  ADD CONSTRAINT `Backend_match_option2_id_1e91b2f3_fk_Backend_option_id` FOREIGN KEY (`option2_id`) REFERENCES `backend_option` (`id`),
  ADD CONSTRAINT `Backend_match_round_id_78f901c7_fk_Backend_round_id` FOREIGN KEY (`round_id`) REFERENCES `backend_round` (`id`),
  ADD CONSTRAINT `Backend_match_winner_id_f7b53b6d_fk_Backend_option_id` FOREIGN KEY (`winner_id`) REFERENCES `backend_option` (`id`);

--
-- Contraintes pour la table `backend_option`
--
ALTER TABLE `backend_option`
  ADD CONSTRAINT `Backend_option_question_id_47d9dc26_fk_Backend_question_id` FOREIGN KEY (`question_id`) REFERENCES `backend_question` (`id`);

--
-- Contraintes pour la table `backend_question`
--
ALTER TABLE `backend_question`
  ADD CONSTRAINT `Backend_question_category_id_c21ce76d_fk_Backend_category_id` FOREIGN KEY (`category_id`) REFERENCES `backend_category` (`id`);

--
-- Contraintes pour la table `backend_round`
--
ALTER TABLE `backend_round`
  ADD CONSTRAINT `Backend_round_tournament_id_c0a6fa44_fk_Backend_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `backend_tournament` (`id`);

--
-- Contraintes pour la table `backend_tournament`
--
ALTER TABLE `backend_tournament`
  ADD CONSTRAINT `Backend_tournament_category_id_dc0784db_fk_Backend_category_id` FOREIGN KEY (`category_id`) REFERENCES `backend_category` (`id`),
  ADD CONSTRAINT `Backend_tournament_question_id_44d50590_fk_Backend_question_id` FOREIGN KEY (`question_id`) REFERENCES `backend_question` (`id`);

--
-- Contraintes pour la table `backend_vote`
--
ALTER TABLE `backend_vote`
  ADD CONSTRAINT `Backend_vote_match_id_81d2db0d_fk_Backend_match_id` FOREIGN KEY (`match_id`) REFERENCES `backend_match` (`id`),
  ADD CONSTRAINT `Backend_vote_option_id_0763f019_fk_Backend_option_id` FOREIGN KEY (`option_id`) REFERENCES `backend_option` (`id`),
  ADD CONSTRAINT `Backend_vote_user_id_4a6117f3_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
