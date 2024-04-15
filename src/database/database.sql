/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - senalearn
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`senalearn` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `senalearn`;

/*Table structure for table `categorias` */

DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `Id_Cat` varchar(100) NOT NULL,
  `Nom_Cat` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categorias` */

insert  into `categorias`(`Id_Cat`,`Nom_Cat`,`updatedAt`,`createdAt`) values 
('1','Programación',NULL,NULL),
('2','mamawebos',NULL,NULL),
('2fquk70wlt28m5c0','desarrollo web',NULL,NULL),
('2fquk70wlt28mn9b','diseño gráfico',NULL,NULL),
('2fquk70wlt28muiz','marketing digital',NULL,NULL),
('2fquk70wlt28n9fi','negocios y emprendimiento',NULL,NULL),
('2fquk70wlt28nixt','ciencia de datos',NULL,NULL),
('2fquk70wlt28np26','arte y creatividad',NULL,NULL),
('2fquk70wlt28ogue','salud y bienestar',NULL,NULL),
('2fquk70wlt28ors4','cocina y gastronomía',NULL,NULL),
('2fquk73olt36rfar','petristas',NULL,NULL),
('3','Marketing',NULL,NULL),
('4','Idiomas',NULL,NULL),
('5','SOFTWARE',NULL,NULL),
('ahyv5gwlua8201i','javascript','2024-03-27 19:56:40','2024-03-27 19:51:48'),
('ahyv6j0lt7mmmac','lolala',NULL,NULL);

/*Table structure for table `certificados` */

DROP TABLE IF EXISTS `certificados`;

CREATE TABLE `certificados` (
  `Tit_Cert` varchar(255) DEFAULT NULL,
  `Descp_Cert` text DEFAULT NULL,
  `Fec_Crea_Cert` date DEFAULT NULL,
  `Firm_Dig_Cert` varchar(255) DEFAULT NULL,
  `Id_User_FK` varchar(100) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `certificados_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `certificados_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `certificados` */

insert  into `certificados`(`Tit_Cert`,`Descp_Cert`,`Fec_Crea_Cert`,`Firm_Dig_Cert`,`Id_User_FK`,`Id_Cur_FK`,`createdAt`,`updatedAt`) values 
('Tecnico en sistemas','el estudiante curso correctamente durante el periodo de 6 años el curso de ADSO','2024-04-11','url firma','ahyv45gluc483jo','1','2024-04-11 17:04:11','2024-04-11 17:04:13'),
('dsfdf','fsdfdf','2024-04-11','firma','ahyv8xwlu7cj900','1','2024-04-11 22:53:52','2024-04-11 22:53:52'),
('dsfdf','fsdfdf','2024-04-11','https://url.com/photo.png','ahyv8xwlu7cj900','3','2024-04-11 17:42:45','2024-04-13 15:44:18');

/*Table structure for table `comentarios` */

DROP TABLE IF EXISTS `comentarios`;

CREATE TABLE `comentarios` (
  `Id_Com` int(255) NOT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Id_Cursos_FK` varchar(100) DEFAULT NULL,
  `Fecha_Pub_Com` date DEFAULT NULL,
  `Desc_Comentario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Com`),
  KEY `Id_User_FK` (`Id_User_FK`),
  KEY `Id_Cursos_FK` (`Id_Cursos_FK`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`Id_Cursos_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `comentarios_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `comentarios` */

/*Table structure for table `contenido_modulos` */

DROP TABLE IF EXISTS `contenido_modulos`;

CREATE TABLE `contenido_modulos` (
  `Id_Cont` varchar(100) NOT NULL,
  `Tip_Cont` int(50) DEFAULT NULL COMMENT '1:audio, 2:video, 3: texto, 4:documento',
  `Url_Cont` varchar(255) DEFAULT NULL,
  `Tit_Cont` varchar(255) DEFAULT NULL,
  `Porcentaje_Asig` decimal(5,2) DEFAULT NULL,
  `Id_Mod_FK` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Cont`),
  KEY `Id_Mod_FK` (`Id_Mod_FK`),
  CONSTRAINT `contenido_modulos_ibfk_1` FOREIGN KEY (`Id_Mod_FK`) REFERENCES `modulocursos` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contenido_modulos` */

insert  into `contenido_modulos`(`Id_Cont`,`Tip_Cont`,`Url_Cont`,`Tit_Cont`,`Porcentaje_Asig`,`Id_Mod_FK`,`createdAt`,`updatedAt`) values 
('2',1,'edsfsafasdsd','modulo 2',5.00,'erxyjd4soluxdl4co','2024-04-08 18:57:52','2024-04-13 00:45:36'),
('3',1,'vfsdffdf','modulo 2.1',5.00,'erxyjd4soluxdl4co','2024-04-08 18:58:20','2024-04-13 00:45:36'),
('4',1,'fdgsfsdf','hhhhhh',8.00,'ahyv5b8lubfeofn','2024-04-12 15:52:42','2024-04-12 21:34:35'),
('ahyva8slubjubdo',1,'454355','fdsfdsfdsffdsfdsfdsf',8.00,'ahyv5b8lubfeofn','2024-03-28 18:09:31','2024-04-12 21:34:35'),
('erxyjd1l8lux60cfq',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:13:13','2024-04-12 21:34:35'),
('erxyjd26oluxdfdtg',1,'url video','contenido de prueba 3',5.00,'1','2024-04-13 00:40:52','2024-04-13 00:45:36'),
('erxyjd2j8luxdh3qn',1,'url video','contenido de prueba 3',5.00,'1','2024-04-13 00:42:12','2024-04-13 00:45:36'),
('erxyjd2rsluxdj64x',1,'url video','contenido de prueba 3',5.00,'1','2024-04-13 00:43:49','2024-04-13 00:45:36'),
('erxyjd494luxdhzps',1,'url video','contenido de prueba 3',5.00,'1','2024-04-13 00:42:54','2024-04-13 00:45:36'),
('erxyjd4soluxdka0t',1,'url video','contenido de prueba 3',5.00,'1','2024-04-13 00:44:41','2024-04-13 00:45:36'),
('erxyjd4soluxdlgf2',1,'url video','contenido de prueba 3',5.00,'1','2024-04-13 00:45:35','2024-04-13 00:45:36'),
('erxyjd4wwlux710rr',1,'url video','contenido de prueba 2',7.00,'2','2024-04-12 21:41:44','2024-04-12 21:41:44'),
('erxyjd5dklux5sunx',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:07:24','2024-04-12 21:34:35'),
('erxyjd5h8lux5uxsl',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:09:01','2024-04-12 21:34:35'),
('erxyjd5zklux6vyr6',1,'url video','contenido de prueba 2',7.00,'2','2024-04-12 21:37:48','2024-04-12 21:41:44'),
('erxyjd5zklux6yfyi',1,'url video','contenido de prueba 2',7.00,'2','2024-04-12 21:39:44','2024-04-12 21:41:44'),
('erxyjd7qclux5yfm1',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:11:44','2024-04-12 21:34:35'),
('erxyjd7qclux5yuqx',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:12:04','2024-04-12 21:34:35'),
('erxyjd8n8lux61m6s',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:14:13','2024-04-12 21:34:35'),
('erxyjd8t0lux62o92',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:15:02','2024-04-12 21:34:35'),
('erxyjd8t0lux6rt3y',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:34:35','2024-04-12 21:34:35'),
('erxyjd8t0lux6u5sk',1,'url video','contenido de prueba 2',7.00,'2','2024-04-12 21:36:24','2024-04-12 21:41:44'),
('erxyjd984lux5vmb9',1,'url video','contenido de prueba 1',8.00,'ahyv5b8lubfeofn','2024-04-12 21:09:33','2024-04-12 21:34:35'),
('erxyjd9vsluxd0bzd',1,'url video','contenido de prueba 2',0.00,'2','2024-04-13 00:29:10','2024-04-13 00:29:10'),
('erxyjda6gluxdjf86',1,'url video','contenido de prueba 3',5.00,'1','2024-04-13 00:44:01','2024-04-13 00:45:36'),
('erxyjdrkluxdjq35',1,'url video','contenido de prueba 3',5.00,'1','2024-04-13 00:44:15','2024-04-13 00:45:36');

/*Table structure for table `cursos` */

DROP TABLE IF EXISTS `cursos`;

CREATE TABLE `cursos` (
  `Id_Cur` varchar(100) NOT NULL,
  `Nom_Cur` varchar(255) DEFAULT NULL,
  `Des_Cur` varchar(255) DEFAULT NULL,
  `Hor_Cont_Total` int(11) DEFAULT NULL,
  `Fech_Crea_Cur` date DEFAULT NULL,
  `Id_Cat_FK` varchar(100) DEFAULT NULL,
  `Fot_Cur` varchar(200) DEFAULT NULL,
  `Est_Cur` int(1) DEFAULT NULL COMMENT '1:CREADO, 2: PUBLICADO, 3:ELIMINADO',
  `Id_Inst` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Cur`),
  KEY `Id_Cat_FK` (`Id_Cat_FK`),
  KEY `Id_Inst` (`Id_Inst`),
  CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`Id_Cat_FK`) REFERENCES `categorias` (`Id_Cat`),
  CONSTRAINT `cursos_ibfk_2` FOREIGN KEY (`Id_Inst`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cursos` */

insert  into `cursos`(`Id_Cur`,`Nom_Cur`,`Des_Cur`,`Hor_Cont_Total`,`Fech_Crea_Cur`,`Id_Cat_FK`,`Fot_Cur`,`Est_Cur`,`Id_Inst`,`createdAt`,`updatedAt`) values 
('1','HTML CSS','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-07','1','https://ejemplo.com/imagen_curso.jpg',2,NULL,NULL,'2024-03-27 20:45:04'),
('2','Fundamentos del Diseño Gráfico','Domina los elementos esenciales del diseño gráfico',40,'2023-02-01','2',NULL,2,'ahyv8xwlu7cj900','2024-04-06 21:01:54','2024-04-06 21:01:56'),
('2fquk2aclt1pzzry','Curso de COSTURA','Este curso cubre temas avanzados de COSTURA.',100,'2024-02-07','4','https://ejemplo.com/imagen_curso.jpg',1,NULL,NULL,NULL),
('2fquk3a8lt1q1ddf','Curso de COSTURA','Este curso cubre temas avanzados de COSTURA.',100,'2024-02-07','4','https://ejemplo.com/imagen_curso.jpg',1,NULL,NULL,NULL),
('2fquk3eklt3iqtu1','edsfdsfdf','dsfsdfdsfdsfdf',10,'2024-02-07','1','fdsdfdsfdsfsdf',1,NULL,NULL,NULL),
('2fquk5t0lt1q0tbv','Curso de COSTURA','Este curso cubre temas avanzados de COSTURA.',100,'2024-02-07','4','https://ejemplo.com/imagen_curso.jpg',1,NULL,NULL,NULL),
('2fqukuklt1puwas','Curso de COSTURA','Este curso cubre temas avanzados de COSTURA.',100,'2024-02-07','4','https://ejemplo.com/imagen_curso.jpg',1,NULL,NULL,NULL),
('3','Estrategias de Marketing Digital','Explora estrategias efectivas de marketing digital',40,'2023-03-01','3',NULL,2,NULL,NULL,NULL),
('4','Inglés Intermedio','Desarrolla habilidades en el idioma inglés',15,'2023-04-01','4',NULL,2,NULL,NULL,NULL),
('5','Gestión Financiera Personal','Aprende a manejar tus finanzas personales',18,'2023-05-01','5',NULL,2,NULL,NULL,NULL),
('ahyv1eklua9rd6h','fasdsad','sdadsadsad',0,'2022-12-22','1','dfdsfdsfds',1,NULL,'2024-03-27 20:39:31','2024-03-27 20:39:31'),
('ahyv1eklua9t0gg','HTML CSS, JS','the best course around the world',44,'2022-12-22','1','foto.jpg',1,NULL,'2024-03-27 20:40:48','2024-03-27 20:40:48'),
('ahyv2bslt0x9d1j','Curso de Programación Avanzada','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-05','1','https://ejemplo.com/imagen_curso.jpg',1,NULL,NULL,NULL),
('ahyv5bolsxp9nxs','Costura Basica','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-05','1','https://ejemplo.com/imagen_curso.jpg',1,NULL,NULL,NULL),
('ahyv8bslsxtrcct','Costura Basica','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-05','1','https://ejemplo.com/imagen_curso.jpg',1,NULL,NULL,NULL),
('erxyjd84gluoukzlb','MAMAWEBOS','LOALSKLSDKLASFAFSD',44,'2022-12-22','1','foto.jpg',2,'ahyv45gluc483jo','2024-04-07 01:31:12','2024-04-07 01:31:12');

/*Table structure for table `evaluacions` */

DROP TABLE IF EXISTS `evaluacions`;

CREATE TABLE `evaluacions` (
  `Id_Eva` varchar(100) NOT NULL,
  `Tit_Eva` varchar(255) DEFAULT NULL,
  `Des_Eva` text DEFAULT NULL,
  `Fec_Crea` date DEFAULT NULL,
  `Fec_Cer` date DEFAULT NULL,
  `Id_Mod_Cur_FK` varchar(100) DEFAULT NULL,
  `Not_Min_Apr_Eva` decimal(5,2) DEFAULT NULL,
  `Estado_Eval` int(1) DEFAULT NULL COMMENT '0:programada, 1: Cerrada',
  `Intentos_Eval` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Eva`),
  KEY `Id_Mod_Cur_FK` (`Id_Mod_Cur_FK`),
  CONSTRAINT `evaluacions_ibfk_1` FOREIGN KEY (`Id_Mod_Cur_FK`) REFERENCES `modulocursos` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `evaluacions` */

insert  into `evaluacions`(`Id_Eva`,`Tit_Eva`,`Des_Eva`,`Fec_Crea`,`Fec_Cer`,`Id_Mod_Cur_FK`,`Not_Min_Apr_Eva`,`Estado_Eval`,`Intentos_Eval`,`createdAt`,`updatedAt`) values 
('1','sadsad','sadsadsad','2024-04-04','2024-04-04','ahyv5b8lubfeofn',3.50,1,3,'2024-04-04 16:36:56','2024-04-04 16:36:58'),
('2','mama','la mejor','2024-04-08','2024-04-08','1',4.00,1,1,'2024-04-08 18:59:05','2024-04-08 18:59:07'),
('ahyv4cwlulsj9sf','loala','mamawebo','2024-04-04','2024-02-02','ahyv5b8lubfeofn',3.50,0,2,'2024-04-04 22:10:34','2024-04-04 22:12:34');

/*Table structure for table `inscripciones` */

DROP TABLE IF EXISTS `inscripciones`;

CREATE TABLE `inscripciones` (
  `Id_User_FK` varchar(100) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  `Prog_Cur` decimal(5,2) DEFAULT NULL,
  `fecha_insc` date DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `inscripciones_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `inscripciones` */

insert  into `inscripciones`(`Id_User_FK`,`Id_Cur_FK`,`Prog_Cur`,`fecha_insc`,`createdAt`,`updatedAt`) values 
('ahyv8xwlu7cj900','1',0.00,'2024-03-28','2024-03-28 19:21:12','2024-03-28 19:21:14'),
('ahyv8xwlu7cj900','2',0.00,'2024-03-29','2024-03-29 02:35:32','2024-03-29 02:35:32'),
('ahyv8xwlu7cj900','5',0.00,'2024-03-29','2024-03-29 00:44:50','2024-03-29 00:52:04'),
('erxyjd4wglurlw09c','2',10.00,'2024-04-08','2024-04-08 23:55:46','2024-04-13 02:21:26');

/*Table structure for table `localizations` */

DROP TABLE IF EXISTS `localizations`;

CREATE TABLE `localizations` (
  `Id_Loc` int(11) NOT NULL AUTO_INCREMENT,
  `Dir_Ip` varchar(255) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Loc`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `localizations_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `localizations` */

insert  into `localizations`(`Id_Loc`,`Dir_Ip`,`Id_User_FK`,`createdAt`,`updatedAt`) values 
(45,'192.168.0.1','ahyv8xwlu7cj900','2024-03-25 19:33:52','2024-03-25 19:33:52'),
(46,'192.168.0.5','ahyv8xwlu7cj900','2024-03-25 19:42:45','2024-03-25 19:42:45'),
(47,'192.168.88.9','ahyv8xwlu7cj900','2024-03-26 13:33:17','2024-03-26 13:38:18'),
(48,'192.168.0.1','ahyv45gluc483jo','2024-03-29 03:40:06','2024-03-29 03:40:06'),
(49,'192.168.0.1','erxyjd4wglurlw09c','2024-04-08 23:51:08','2024-04-08 23:51:08');

/*Table structure for table `modulocursos` */

DROP TABLE IF EXISTS `modulocursos`;

CREATE TABLE `modulocursos` (
  `Id_Mod` varchar(100) NOT NULL,
  `Tit_Mod` varchar(255) DEFAULT NULL,
  `Est_Mod` int(1) DEFAULT NULL COMMENT '0: creado, 1:activo, 2: bloqueado',
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  `Porcentaje_Asig` decimal(5,2) DEFAULT NULL,
  `Horas_Cont_Mod` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Mod`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `modulocursos_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `modulocursos` */

insert  into `modulocursos`(`Id_Mod`,`Tit_Mod`,`Est_Mod`,`Id_Cur_FK`,`Porcentaje_Asig`,`Horas_Cont_Mod`,`createdAt`,`updatedAt`) values 
('1','modulo 1',0,'2',50.00,15,'2024-04-08 18:56:53','2024-04-13 00:45:20'),
('2','modulo2',0,'1',33.33,11,'2024-04-12 16:35:26','2024-04-13 00:23:08'),
('ahyv5b8lubfeofn','loalala',0,'1',33.33,20,'2024-03-28 16:05:23','2024-04-13 00:23:08'),
('erxyjd18wluxcsktb','Introduccion al curso',0,'1',33.33,50,'2024-04-13 00:23:08','2024-04-13 00:23:08'),
('erxyjd4soluxdl4co','Introduccion al curso 3',0,'2',50.00,50,'2024-04-13 00:45:20','2024-04-13 00:45:20');

/*Table structure for table `objetivos_cursos` */

DROP TABLE IF EXISTS `objetivos_cursos`;

CREATE TABLE `objetivos_cursos` (
  `Id_Objetivo` varchar(100) NOT NULL,
  `Desc_Objetivo` varchar(255) DEFAULT NULL,
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Objetivo`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `objetivos_cursos_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `objetivos_cursos` */

insert  into `objetivos_cursos`(`Id_Objetivo`,`Desc_Objetivo`,`Id_Cur_FK`,`createdAt`,`updatedAt`) values 
('ahyv3d0lubbtzyr','LOS MAMAWEBOS No','1','2024-03-28 14:25:19','2024-03-28 14:31:43'),
('fdsfdsf','dsffdsgsgg','1','2024-03-27 20:03:11','2024-03-27 20:03:13');

/*Table structure for table `opciones` */

DROP TABLE IF EXISTS `opciones`;

CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_opcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_opcion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `opciones` */

insert  into `opciones`(`id_opcion`,`nombre_opcion`,`createdAt`,`updatedAt`) values 
(1,'mamawebos',NULL,NULL),
(2,'lilala',NULL,NULL),
(3,'categorias',NULL,NULL),
(4,'paramount channel','2024-03-27 14:40:04','2024-03-27 14:42:09'),
(5,'paramount','2024-03-28 23:17:13','2024-03-28 23:17:13');

/*Table structure for table `preguntasevals` */

DROP TABLE IF EXISTS `preguntasevals`;

CREATE TABLE `preguntasevals` (
  `Id_Preg_Eval` varchar(100) NOT NULL,
  `Text_Preg_Eval` varchar(255) DEFAULT NULL,
  `Id_Eval_FK` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Preg_Eval`),
  KEY `Id_Eval_FK` (`Id_Eval_FK`),
  CONSTRAINT `preguntasevals_ibfk_1` FOREIGN KEY (`Id_Eval_FK`) REFERENCES `evaluacions` (`Id_Eva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `preguntasevals` */

insert  into `preguntasevals`(`Id_Preg_Eval`,`Text_Preg_Eval`,`Id_Eval_FK`,`createdAt`,`updatedAt`) values 
('1','mi primera cana','ahyv4cwlulsj9sf','2024-04-06 09:39:50','2024-04-06 14:50:52'),
('2','una hebra de cabello adorna mi cuerpo','1','2024-04-06 14:44:07','2024-04-06 14:44:07'),
('3','hay veeee','1','2024-04-14 17:02:53','2024-04-14 17:02:54'),
('4','noticias de mi vejez','1','2024-04-14 17:02:50','2024-04-14 17:02:56');

/*Table structure for table `respuestasevals` */

DROP TABLE IF EXISTS `respuestasevals`;

CREATE TABLE `respuestasevals` (
  `Id_Res_Eval` varchar(100) NOT NULL,
  `Text_Resp_Eval` varchar(255) DEFAULT NULL,
  `Resp_Correcta_Eval` int(1) DEFAULT NULL COMMENT '1: correcta, 2: incorrecta',
  `Id_Preg_Eval_FK` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Preg_Eval_FK` (`Id_Preg_Eval_FK`),
  CONSTRAINT `respuestasevals_ibfk_1` FOREIGN KEY (`Id_Preg_Eval_FK`) REFERENCES `preguntasevals` (`Id_Preg_Eval`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `respuestasevals` */

insert  into `respuestasevals`(`Id_Res_Eval`,`Text_Resp_Eval`,`Resp_Correcta_Eval`,`Id_Preg_Eval_FK`,`createdAt`,`updatedAt`) values 
('1','sdasdsd',1,'2','2024-04-06 10:30:01','2024-04-06 10:30:06'),
('2','DSD',0,'3','2024-04-14 14:57:31','2024-04-14 14:57:33'),
('3','soledad',0,'2','2024-04-14 17:34:02','2024-04-14 17:34:04'),
('4','carmen bolivar',0,'2','2024-04-14 17:34:20','2024-04-14 17:34:23'),
('erxyjd5tkluzy8ro0','malambo',1,'1','2024-04-14 19:59:08','2024-04-14 19:59:08'),
('erxyjd7jgluzygj9b','pivijay',0,'4','2024-04-14 20:05:10','2024-04-14 20:18:58');

/*Table structure for table `resultados_evaluaciones` */

DROP TABLE IF EXISTS `resultados_evaluaciones`;

CREATE TABLE `resultados_evaluaciones` (
  `Id_Res_Eval` varchar(50) NOT NULL,
  `Id_Eval_FK` varchar(100) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Puntuacion` decimal(5,2) DEFAULT NULL,
  `Fech_Real_Eval` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Eval_FK` (`Id_Eval_FK`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `resultados_evaluaciones_ibfk_2` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`),
  CONSTRAINT `resultados_evaluaciones_ibfk_3` FOREIGN KEY (`Id_Eval_FK`) REFERENCES `evaluacions` (`Id_Eva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `resultados_evaluaciones` */

insert  into `resultados_evaluaciones`(`Id_Res_Eval`,`Id_Eval_FK`,`Id_User_FK`,`Puntuacion`,`Fech_Real_Eval`,`createdAt`,`updatedAt`) values 
('erxyjd2k0lv0a78bv','2','erxyjd4wglurlw09c',7.00,'2024-04-15 01:33:51','2024-04-15 01:33:51','2024-04-15 22:45:46'),
('erxyjd2kklv1kbvkn','1','erxyjd4wglurlw09c',5.00,'2024-04-15 23:05:11','2024-04-15 23:05:11','2024-04-15 23:05:11'),
('erxyjd6x4lv09rguc','1','erxyjd4wglurlw09c',5.00,'2024-04-15 01:21:36','2024-04-15 01:21:36','2024-04-15 01:21:36'),
('erxyjd88olv1k9lim','1','erxyjd4wglurlw09c',5.00,'2024-04-15 23:03:24','2024-04-15 23:03:24','2024-04-15 23:03:24');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Rol` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`Id_Rol`,`Nom_Rol`,`createdAt`,`updatedAt`) values 
(1,'ESTUDIANTE',NULL,NULL),
(2,'ADMIN',NULL,NULL),
(3,'INSTRUCTOR',NULL,NULL),
(6,'VOCERO',NULL,NULL),
(7,'mamaweb0','2024-03-26 13:08:54','2024-03-26 13:11:14');

/*Table structure for table `roles_opciones` */

DROP TABLE IF EXISTS `roles_opciones`;

CREATE TABLE `roles_opciones` (
  `Id_Rol_fk` int(11) NOT NULL,
  `id_opcion_fk` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Rol_fk`,`id_opcion_fk`),
  KEY `id_opcion_fk` (`id_opcion_fk`),
  CONSTRAINT `roles_opciones_ibfk_2` FOREIGN KEY (`id_opcion_fk`) REFERENCES `opciones` (`id_opcion`),
  CONSTRAINT `roles_opciones_ibfk_3` FOREIGN KEY (`Id_Rol_fk`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles_opciones` */

insert  into `roles_opciones`(`Id_Rol_fk`,`id_opcion_fk`,`createdAt`,`updatedAt`) values 
(1,1,'2024-03-28 23:17:40','2024-03-28 23:17:40'),
(1,3,'2024-03-27 15:31:09','2024-03-27 15:41:26'),
(1,4,NULL,'2024-03-27 15:43:50'),
(2,1,NULL,NULL),
(2,2,NULL,NULL),
(2,3,NULL,NULL);

/*Table structure for table `tokens` */

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `Id_Token` int(11) NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) DEFAULT NULL,
  `Fec_Caducidad` varchar(100) DEFAULT NULL,
  `User_Id_FK` varchar(100) DEFAULT NULL,
  `Tipo_token` char(1) DEFAULT NULL COMMENT '1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña, 4: Verificar IP',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Token`),
  KEY `Usuario_Id` (`User_Id_FK`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`User_Id_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=348 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

insert  into `tokens`(`Id_Token`,`Token`,`Fec_Caducidad`,`User_Id_FK`,`Tipo_token`,`createdAt`,`updatedAt`) values 
(318,'212645','1711395832','ahyv8xwlu7cj900','2','2024-03-25 19:33:52','2024-03-25 19:33:52'),
(319,'639844','1711396246','ahyv8xwlu7cj900','4','2024-03-25 19:40:46','2024-03-25 19:40:46'),
(320,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6MX0sImlhdCI6MTcxMTM5NTc4MCwiZXhwIjoxNzExNDgyMTgwfQ.Nmk','1711482180','ahyv8xwlu7cj900','1','2024-03-25 19:43:00','2024-03-25 19:43:00'),
(321,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6MX0sImlhdCI6MTcxMTQ1NjcxOCwiZXhwIjoxNzExNTQzMTE4fQ.UIS','1711543118','ahyv8xwlu7cj900','1','2024-03-26 12:38:38','2024-03-26 12:38:38'),
(322,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTQ1Njc2OSwiZXhwIjoxNzExNTQzMTY5fQ.OH_','1711543169','ahyv8xwlu7cj900','1','2024-03-26 12:39:29','2024-03-26 12:39:29'),
(323,'kloallal','2024-01-22','ahyv8xwlu7cj900','1','2024-03-26 12:41:36','2024-03-26 12:47:13'),
(324,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTU1MDA5NiwiZXhwIjoxNzExNjM2NDk2fQ.VCD','1711636496','ahyv8xwlu7cj900','1','2024-03-27 14:34:56','2024-03-27 14:34:56'),
(325,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTU2OTA3NywiZXhwIjoxNzExNjU1NDc3fQ.Dr_','1711655477','ahyv8xwlu7cj900','1','2024-03-27 19:51:17','2024-03-27 19:51:17'),
(326,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTYzNTg3NCwiZXhwIjoxNzExNzIyMjc0fQ.JWI','1711722274','ahyv8xwlu7cj900','1','2024-03-28 14:24:34','2024-03-28 14:24:34'),
(327,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTY2NzgxNiwiZXhwIjoxNzExNzU0MjE2fQ.zd-','1711754216','ahyv8xwlu7cj900','1','2024-03-28 23:16:56','2024-03-28 23:16:56'),
(328,'669615','1711684206','ahyv45gluc483jo','2','2024-03-29 03:40:06','2024-03-29 03:40:06'),
(329,'293478','1711684399','ahyv45gluc483jo','4','2024-03-29 03:43:19','2024-03-29 03:43:19'),
(330,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNjgzODEwLCJleHAiOjE3MTE3NzAyMTB9.o','1711770210','ahyv45gluc483jo','1','2024-03-29 03:43:30','2024-03-29 03:43:30'),
(331,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNjgzOTM3LCJleHAiOjE3MTE3NzAzMzd9.R','1711770337','ahyv45gluc483jo','1','2024-03-29 03:45:37','2024-03-29 03:45:37'),
(332,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyMjY4MjM5LCJleHAiOjE3MTIzNTQ2Mzl9.H','1712354639','ahyv45gluc483jo','1','2024-04-04 22:03:59','2024-04-04 22:03:59'),
(333,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyMjY4NDc5LCJleHAiOjE3MTIzNTQ4Nzl9.t','1712354879','ahyv45gluc483jo','1','2024-04-04 22:07:59','2024-04-04 22:07:59'),
(334,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyNDE0MTgwLCJleHAiOjE3MTI1MDA1ODB9.P','1712500580','ahyv45gluc483jo','1','2024-04-06 14:36:20','2024-04-06 14:36:20'),
(335,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyNDUzNDIyLCJleHAiOjE3MTI1Mzk4MjJ9.z','1712539822','ahyv45gluc483jo','1','2024-04-07 01:30:22','2024-04-07 01:30:22'),
(336,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyNTkwMjkwLCJleHAiOjE3MTI2NzY2OTB9.z','1712676690','ahyv45gluc483jo','1','2024-04-08 15:31:30','2024-04-08 15:31:30'),
(337,'047174','1712620868','erxyjd4wglurlw09c','2','2024-04-08 23:51:08','2024-04-08 23:51:08'),
(338,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ0d2dsdXJsdzA5YyIsIk5vbV9Vc2VyIjoiS2lsaWFuIiwiQXBlX1VzZXIiOiJNYmJhcGUiLCJFbWFfVXNlciI6IktpbGlhbkVtYmFwcGVAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyNjIwNDg1LCJleHAiOjE3MTI3MDY4OD','1712706885','erxyjd4wglurlw09c','1','2024-04-08 23:54:45','2024-04-08 23:54:45'),
(339,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ0d2dsdXJsdzA5YyIsIk5vbV9Vc2VyIjoiS2lsaWFuIiwiQXBlX1VzZXIiOiJNYmJhcGUiLCJFbWFfVXNlciI6IktpbGlhbkVtYmFwcGVAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyNjk5NzQ1LCJleHAiOjE3MTI3ODYxND','1712786145','erxyjd4wglurlw09c','1','2024-04-09 21:55:45','2024-04-09 21:55:45'),
(340,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ0d2dsdXJsdzA5YyIsIk5vbV9Vc2VyIjoiS2lsaWFuIiwiQXBlX1VzZXIiOiJNYmJhcGUiLCJFbWFfVXNlciI6IktpbGlhbkVtYmFwcGVAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyODcyODM0LCJleHAiOjE3MTI5NTkyMz','1712959234','erxyjd4wglurlw09c','1','2024-04-11 22:00:34','2024-04-11 22:00:34'),
(341,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyODcyOTcxLCJleHAiOjE3MTI5NTkzNzF9.W','1712959371','ahyv45gluc483jo','1','2024-04-11 22:02:51','2024-04-11 22:02:51'),
(342,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyOTUyNzQwLCJleHAiOjE3MTMwMzkxNDB9.4','1713039140','ahyv45gluc483jo','1','2024-04-12 20:12:20','2024-04-12 20:12:20'),
(343,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ0d2dsdXJsdzA5YyIsIk5vbV9Vc2VyIjoiS2lsaWFuIiwiQXBlX1VzZXIiOiJNYmJhcGUiLCJFbWFfVXNlciI6IktpbGlhbkVtYmFwcGVAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyOTc0NDM0LCJleHAiOjE3MTMwNjA4Mz','1713060834','erxyjd4wglurlw09c','1','2024-04-13 02:13:54','2024-04-13 02:13:54'),
(344,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMDIyNDAyLCJleHAiOjE3MTMxMDg4MDJ9.7','1713108802','ahyv45gluc483jo','1','2024-04-13 15:33:22','2024-04-13 15:33:22'),
(345,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMDQ4MTIyLCJleHAiOjE3MTMxMzQ1MjJ9.6','1713134522','ahyv45gluc483jo','1','2024-04-13 22:42:02','2024-04-13 22:42:02'),
(346,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMTM0NjQxLCJleHAiOjE3MTMyMjEwNDF9.o','1713221041','ahyv45gluc483jo','1','2024-04-14 22:44:01','2024-04-14 22:44:01'),
(347,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMjIxMTE1LCJleHAiOjE3MTMzMDc1MTV9.y','1713307515','ahyv45gluc483jo','1','2024-04-15 22:45:15','2024-04-15 22:45:15');

/*Table structure for table `usuario_contenidos` */

DROP TABLE IF EXISTS `usuario_contenidos`;

CREATE TABLE `usuario_contenidos` (
  `Id_Vista` varchar(100) NOT NULL,
  `Id_Cont_Mod_FK` varchar(100) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Fech_Visualizacion` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Vista`),
  KEY `ewee` (`Id_Cont_Mod_FK`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `ewee` FOREIGN KEY (`Id_Cont_Mod_FK`) REFERENCES `contenido_modulos` (`Id_Cont`),
  CONSTRAINT `usuario_contenidos_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuario_contenidos` */

insert  into `usuario_contenidos`(`Id_Vista`,`Id_Cont_Mod_FK`,`Id_User_FK`,`Fech_Visualizacion`,`createdAt`,`updatedAt`) values 
('erxyjd5q4luxgn97t','erxyjd1l8lux60cfq','ahyv45gluc483jo','2025-01-22 00:00:00','2024-04-13 02:10:58','2024-04-13 02:10:58'),
('erxyjd7holuxh03rt','ahyva8slubjubdo','erxyjd4wglurlw09c','2027-01-22 00:00:00','2024-04-13 02:20:58','2024-04-13 22:52:44'),
('erxyjd7holuxh0p5m','3','erxyjd4wglurlw09c','2025-01-22 00:00:00','2024-04-13 02:21:25','2024-04-13 02:21:25'),
('erxyjd9dgluynyteh','4','erxyjd4wglurlw09c','2024-01-22 00:00:00','2024-04-13 22:23:41','2024-04-13 22:23:41');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `Id_User` varchar(100) NOT NULL,
  `Nom_User` varchar(255) DEFAULT NULL,
  `Ape_User` varchar(255) DEFAULT NULL,
  `Tel_User` varchar(20) DEFAULT NULL,
  `Ema_User` varchar(100) DEFAULT NULL,
  `Pass_User` varchar(255) DEFAULT NULL,
  `Id_Rol_FK` int(11) DEFAULT NULL,
  `Fot_User` varchar(255) DEFAULT NULL,
  `Est_Email_User` int(1) DEFAULT 0 COMMENT '0: No verificado, 1: verificado',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_User`),
  KEY `Id_Rol_FK` (`Id_Rol_FK`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_Rol_FK`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuarios` */

insert  into `usuarios`(`Id_User`,`Nom_User`,`Ape_User`,`Tel_User`,`Ema_User`,`Pass_User`,`Id_Rol_FK`,`Fot_User`,`Est_Email_User`,`createdAt`,`updatedAt`) values 
('ahyv45gluc483jo','yoiner','pertuz',NULL,'yoinerpertuz@gmail.com','$2b$10$MqGsaRb8ajQeWH88eTlD/utEzqu1TQxLAAeQkwl4Q.cJAPaR6AG76',2,NULL,1,'2024-03-29 03:40:06','2024-03-29 03:41:52'),
('ahyv8xwlu7cj900','Yonier','perez','3139839832','yoinerpertuyz@gmail.com','$2b$10$0TZRSwVDWhrvBBArqwp2w.YFj9q5CdEhDfTbEaNc2iAZ36/52Ad2y',2,'3139839832',1,'2024-03-25 19:33:52','2024-03-29 02:36:08'),
('erxyjd4wglurlw09c','Kilian','Mbbape',NULL,'KilianEmbappe@gmail.com','$2b$10$sVSQ3Ha.YBPyKFkzJeFYD.EE123Zb.kXyp/zcvyUQJCJvcwyqBIma',1,NULL,0,'2024-04-08 23:51:08','2024-04-08 23:51:08');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
