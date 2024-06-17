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
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categorias` */

insert  into `categorias`(`Id_Cat`,`Nom_Cat`,`ESTADO_REGISTRO`,`updatedAt`,`createdAt`) values 
('1','Programación',1,NULL,NULL),
('A1B2C3D4','Programación',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('C3D4E5F6','Habilidades Blandas',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('E5F6G7H8','Desarrollo Web',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('G7H8I9J1','Gestión de Proyectos',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('I9J1K2L3','Ciencia de Datos',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('K2L3M4N5','Idiomas',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('M4N5O6P7','Inteligencia Artificial',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('Q8R9S1T2','Marketing Digital',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('U3V4W5X6','Diseño Gráfico',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('Y7Z8A1B2','Finanzas Personales',1,'2024-05-21 00:00:00','2024-05-21 00:00:00');

/*Table structure for table `certificados` */

DROP TABLE IF EXISTS `certificados`;

CREATE TABLE `certificados` (
  `Tit_Cert` varchar(255) DEFAULT NULL,
  `Descp_Cert` text DEFAULT NULL,
  `Fec_Crea_Cert` date DEFAULT NULL,
  `Firm_Dig_Cert` varchar(255) DEFAULT NULL,
  `Id_User_FK` varchar(100) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `certificados_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `certificados_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `certificados` */

insert  into `certificados`(`Tit_Cert`,`Descp_Cert`,`Fec_Crea_Cert`,`Firm_Dig_Cert`,`Id_User_FK`,`Id_Cur_FK`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('dsfsdf','dsfdsfdfs','2024-05-23','dsfdsfdsf','10oPqRs','L4M5N6O7',1,'2024-05-23 18:11:46','2024-05-23 18:11:48'),
('45345','435435','2024-05-23','32erewr','10oPqRs','X7Y8Z9A1',1,'2024-05-23 18:34:45','2024-05-23 18:34:47');

/*Table structure for table `comentarios` */

DROP TABLE IF EXISTS `comentarios`;

CREATE TABLE `comentarios` (
  `Id_Com` int(255) NOT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Id_Cursos_FK` varchar(100) DEFAULT NULL,
  `Fecha_Pub_Com` date DEFAULT NULL,
  `Desc_Comentario` varchar(255) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
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
  `Indice_Cont` int(100) DEFAULT NULL,
  `Tip_Cont` int(50) DEFAULT NULL COMMENT '1:audio, 2:video, 3: texto, 4:documento',
  `Url_Cont` varchar(255) DEFAULT NULL,
  `Tit_Cont` varchar(255) DEFAULT NULL,
  `Porcentaje_Asig` decimal(5,2) DEFAULT NULL,
  `Id_Mod_FK` varchar(100) DEFAULT NULL,
  `Duracion_Cont` decimal(10,2) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Cont`),
  KEY `Id_Mod_FK` (`Id_Mod_FK`),
  CONSTRAINT `contenido_modulos_ibfk_1` FOREIGN KEY (`Id_Mod_FK`) REFERENCES `modulocursos` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contenido_modulos` */

insert  into `contenido_modulos`(`Id_Cont`,`Indice_Cont`,`Tip_Cont`,`Url_Cont`,`Tit_Cont`,`Porcentaje_Asig`,`Id_Mod_FK`,`Duracion_Cont`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd9iwlwm8ihme',1,2,'url','Requisitos previos',12.50,'erxyjdbwlwm5sy4i',20.00,1,'2024-05-25 14:57:16','2024-05-25 21:17:21'),
('erxyjd9iwlwm8jdhr',2,2,'','Instalaciones requeridas',12.50,'erxyjdbwlwm5sy4i',1.00,1,'2024-05-25 14:57:57','2024-05-25 14:58:47'),
('erxyjd9iwlwm8jtvj',3,2,'','Hola mundo HTML',12.50,'erxyjdbwlwm5sy4i',1.00,1,'2024-05-25 14:58:18','2024-05-25 14:58:47'),
('erxyjd9iwlwm8kg6b',4,2,'','Etiquetas',12.50,'erxyjdbwlwm5sy4i',1.00,1,'2024-05-25 14:58:47','2024-05-25 14:58:47'),
('erxyjd9iwlwm8l8fu',1,2,'','Tipos de datos',12.50,'erxyjdbwlwm5wqw4',1.00,1,'2024-05-25 14:59:24','2024-05-25 15:00:33'),
('erxyjd9iwlwm8m22p',2,2,'','variables, condicionales, ciclos',12.50,'erxyjdbwlwm5wqw4',1.00,1,'2024-05-25 15:00:02','2024-05-25 15:00:33'),
('erxyjd9iwlwm8mkgr',3,2,'','arrays, objetos',12.50,'erxyjdbwlwm5wqw4',1.00,1,'2024-05-25 15:00:26','2024-05-25 15:00:33'),
('erxyjd9iwlwm8mq33',4,2,'','Eventos',12.50,'erxyjdbwlwm5wqw4',1.00,1,'2024-05-25 15:00:33','2024-05-25 15:00:33');

/*Table structure for table `cursos` */

DROP TABLE IF EXISTS `cursos`;

CREATE TABLE `cursos` (
  `Id_Cur` varchar(100) NOT NULL,
  `Nom_Cur` varchar(255) NOT NULL,
  `Des_Cur` varchar(255) NOT NULL,
  `Hor_Cont_Total` decimal(10,2) DEFAULT NULL,
  `Fech_Crea_Cur` date NOT NULL,
  `Id_Cat_FK` varchar(100) NOT NULL,
  `Fot_Cur` varchar(200) DEFAULT NULL,
  `Est_Cur` int(1) NOT NULL COMMENT '1:CREADO, 2: PUBLICADO, 3:ELIMINADO',
  `Id_Inst` varchar(100) NOT NULL,
  `ESTADO_REGISTRO` int(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Id_Cur`),
  KEY `Id_Cat_FK` (`Id_Cat_FK`),
  KEY `Id_Inst` (`Id_Inst`),
  CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`Id_Cat_FK`) REFERENCES `categorias` (`Id_Cat`),
  CONSTRAINT `cursos_ibfk_2` FOREIGN KEY (`Id_Inst`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cursos` */

insert  into `cursos`(`Id_Cur`,`Nom_Cur`,`Des_Cur`,`Hor_Cont_Total`,`Fech_Crea_Cur`,`Id_Cat_FK`,`Fot_Cur`,`Est_Cur`,`Id_Inst`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('B2C3D4E5','Habilidades Blandas en el Trabajo','Curso sobre habilidades interpersonales',0.00,'2024-05-21','C3D4E5F6',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('C1A2B3C4','Introducción a la Programación','Curso básico sobre programación',0.00,'2024-05-21','A1B2C3D4',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('D5E6F7G8','HTML y CSS','Curso de desarrollo web con HTML y CSS',0.00,'2024-05-21','E5F6G7H8',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('erxyjd888lwgs1y5q','HTML, CSS Y JAVASCRIPT','Aprenderas todo acerca de la programacion web',0.33,'2024-05-21','1',NULL,1,'erxyjd1d8lvk7jiru',1,'2024-05-21 19:17:39','2024-05-25 21:17:21'),
('F6G7H8I9','Gestión de Proyectos Ágiles','Curso sobre gestión de proyectos utilizando metodologías ágiles',0.00,'2024-05-21','G7H8I9J1',NULL,1,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('H9I1J2K3','Introducción a la Ciencia de Datos','Conceptos básicos de ciencia de datos',0.00,'2024-05-21','I9J1K2L3',NULL,1,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('J1K2L3M4','Curso de Inglés Básico','Curso para aprender inglés desde cero',0.00,'2024-05-21','K2L3M4N5',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('L4M5N6O7','Fundamentos de Inteligencia Artificial','Curso introductorio sobre IA',0.00,'2024-05-21','M4N5O6P7',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('P8Q9R1S2','Estrategias de Marketing Digital','Curso sobre marketing digital',0.00,'2024-05-21','Q8R9S1T2',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('T3U4V5W6','Diseño Gráfico Básico','Fundamentos de diseño gráfico',0.00,'2024-05-21','U3V4W5X6',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),
('X7Y8Z9A1','Finanzas Personales para Principiantes','Curso sobre manejo de finanzas personales',0.00,'2024-05-21','Y7Z8A1B2',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00');

/*Table structure for table `evaluacions` */

DROP TABLE IF EXISTS `evaluacions`;

CREATE TABLE `evaluacions` (
  `Id_Eva` varchar(100) NOT NULL,
  `Tit_Eva` varchar(255) DEFAULT NULL,
  `Des_Eva` text DEFAULT NULL,
  `Fec_Crea` date DEFAULT NULL,
  `Id_Mod_Cur_FK` varchar(100) DEFAULT NULL,
  `Not_Min_Apr_Eva` decimal(5,2) DEFAULT NULL,
  `Estado_Eval` int(1) DEFAULT NULL COMMENT '0:programada, 1: Cerrada',
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Eva`),
  KEY `Id_Mod_Cur_FK` (`Id_Mod_Cur_FK`),
  CONSTRAINT `evaluacions_ibfk_1` FOREIGN KEY (`Id_Mod_Cur_FK`) REFERENCES `modulocursos` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `evaluacions` */

insert  into `evaluacions`(`Id_Eva`,`Tit_Eva`,`Des_Eva`,`Fec_Crea`,`Id_Mod_Cur_FK`,`Not_Min_Apr_Eva`,`Estado_Eval`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd1twlxj8fjcf','prueba eval 1','prueba','2024-06-17','erxyjdbwlwm5sy4i',3.50,0,1,'2024-06-17 17:11:22','2024-06-17 17:11:22');

/*Table structure for table `inscripciones` */

DROP TABLE IF EXISTS `inscripciones`;

CREATE TABLE `inscripciones` (
  `Id_User_FK` varchar(100) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  `Prog_Cur` decimal(5,2) DEFAULT NULL,
  `fecha_insc` date DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `inscripciones_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `inscripciones` */

insert  into `inscripciones`(`Id_User_FK`,`Id_Cur_FK`,`Prog_Cur`,`fecha_insc`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('10oPqRs','C1A2B3C4',0.00,'2024-01-05',1,'2024-01-05 00:00:00','2024-01-05 00:00:00'),
('10oPqRs','D5E6F7G8',50.00,'2023-05-20',1,'2023-05-20 00:00:00','2023-05-20 00:00:00'),
('10oPqRs','L4M5N6O7',100.00,'2020-11-05',1,'2020-11-05 00:00:00','2020-11-05 00:00:00'),
('10oPqRs','X7Y8Z9A1',100.00,'2022-02-05',1,'2022-02-05 00:00:00','2022-02-05 00:00:00'),
('1aBcDe','J1K2L3M4',0.00,'2021-07-25',1,'2021-07-25 00:00:00','2021-07-25 00:00:00'),
('1aBcDe','L4M5N6O7',0.00,'2020-04-05',1,'2020-04-05 00:00:00','2020-04-05 00:00:00'),
('1aBcDe','P8Q9R1S2',0.00,'2022-10-05',1,'2022-10-05 00:00:00','2022-10-05 00:00:00'),
('2dEfGh','B2C3D4E5',0.00,'2022-03-20',1,'2022-03-20 00:00:00','2022-03-20 00:00:00'),
('2dEfGh','D5E6F7G8',0.00,'2020-12-20',1,'2020-12-20 00:00:00','2020-12-20 00:00:00'),
('2dEfGh','H9I1J2K3',100.00,'2023-06-15',1,'2023-06-15 00:00:00','2023-06-15 00:00:00'),
('3iJkLm','C1A2B3C4',0.00,'2021-08-10',1,'2021-08-10 00:00:00','2021-08-10 00:00:00'),
('3iJkLm','P8Q9R1S2',0.00,'2020-05-25',1,'2020-05-25 00:00:00','2020-05-25 00:00:00'),
('3iJkLm','T3U4V5W6',0.00,'2022-11-30',1,'2022-11-30 00:00:00','2022-11-30 00:00:00'),
('4nOpQr','F6G7H8I9',0.00,'2022-04-15',1,'2022-04-15 00:00:00','2022-04-15 00:00:00'),
('4nOpQr','H9I1J2K3',0.00,'2021-01-15',1,'2021-01-15 00:00:00','2021-01-15 00:00:00'),
('4nOpQr','L4M5N6O7',0.00,'2023-07-10',1,'2023-07-10 00:00:00','2023-07-10 00:00:00'),
('5sTuVw','D5E6F7G8',0.00,'2021-09-05',1,'2021-09-05 00:00:00','2021-09-05 00:00:00'),
('5sTuVw','T3U4V5W6',0.00,'2020-06-30',1,'2020-06-30 00:00:00','2020-06-30 00:00:00'),
('5sTuVw','X7Y8Z9A1',0.00,'2022-12-25',1,'2022-12-25 00:00:00','2022-12-25 00:00:00'),
('6xYzAb','J1K2L3M4',0.00,'2022-05-10',1,'2022-05-10 00:00:00','2022-05-10 00:00:00'),
('6xYzAb','L4M5N6O7',0.00,'2024-01-20',1,'2024-01-20 00:00:00','2024-01-20 00:00:00'),
('6xYzAb','P8Q9R1S2',50.00,'2021-02-10',1,'2021-02-10 00:00:00','2021-02-10 00:00:00'),
('7CdEfG','B2C3D4E5',0.00,'2023-01-20',1,'2023-01-20 00:00:00','2023-01-20 00:00:00'),
('7CdEfG','H9I1J2K3',0.00,'2021-10-30',1,'2021-10-30 00:00:00','2021-10-30 00:00:00'),
('7CdEfG','X7Y8Z9A1',0.00,'2020-07-15',1,'2020-07-15 00:00:00','2020-07-15 00:00:00'),
('8HgHiJ','C1A2B3C4',0.00,'2022-06-25',1,'2022-06-25 00:00:00','2022-06-25 00:00:00'),
('8HgHiJ','P8Q9R1S2',0.00,'2024-01-25',1,'2024-01-25 00:00:00','2024-01-25 00:00:00'),
('8HgHiJ','T3U4V5W6',0.00,'2021-03-05',1,'2021-03-05 00:00:00','2021-03-05 00:00:00'),
('9KlMnO','B2C3D4E5',0.00,'2020-08-20',1,'2020-08-20 00:00:00','2020-08-20 00:00:00'),
('9KlMnO','F6G7H8I9',0.00,'2023-02-15',1,'2023-02-15 00:00:00','2023-02-15 00:00:00'),
('9KlMnO','L4M5N6O7',0.00,'2021-11-20',1,'2021-11-20 00:00:00','2021-11-20 00:00:00'),
('ahyv45gluc483jo','F6G7H8I9',0.00,'2020-09-25',1,'2020-09-25 00:00:00','2020-09-25 00:00:00'),
('ahyv45gluc483jo','J1K2L3M4',0.00,'2023-03-05',1,'2023-03-05 00:00:00','2023-03-05 00:00:00'),
('ahyv45gluc483jo','P8Q9R1S2',0.00,'2024-03-15',1,'2024-03-15 00:00:00','2024-03-15 00:00:00'),
('ahyv8xwlu7cj900','C1A2B3C4',0.00,'2023-04-30',1,'2023-04-30 00:00:00','2023-04-30 00:00:00'),
('ahyv8xwlu7cj900','J1K2L3M4',0.00,'2020-10-10',1,'2020-10-10 00:00:00','2020-10-10 00:00:00'),
('ahyv8xwlu7cj900','T3U4V5W6',0.00,'2022-01-10',1,'2022-01-10 00:00:00','2022-01-10 00:00:00'),
('erxyjd1d8lvk7jiru','C1A2B3C4',0.00,'2020-03-15',1,'2020-03-15 00:00:00','2020-03-15 00:00:00'),
('erxyjd1d8lvk7jiru','D5E6F7G8',69.44,'2022-07-20',1,'2022-07-20 00:00:00','2024-05-25 00:10:37'),
('erxyjd1d8lvk7jiru','erxyjd888lwgs1y5q',100.00,'2024-05-25',1,'2024-05-25 14:02:35','2024-05-25 12:59:05'),
('erxyjd1d8lvk7jiru','X7Y8Z9A1',0.00,'2021-04-01',1,'2021-04-01 00:00:00','2021-04-01 00:00:00'),
('erxyjd4wglurlw09c','B2C3D4E5',0.00,'2021-05-15',1,'2021-05-15 00:00:00','2021-05-15 00:00:00'),
('erxyjd4wglurlw09c','D5E6F7G8',0.00,'2020-02-20',1,'2020-02-20 00:00:00','2020-02-20 00:00:00'),
('erxyjd4wglurlw09c','H9I1J2K3',0.00,'2022-08-15',1,'2022-08-15 00:00:00','2022-08-15 00:00:00'),
('user_001','F6G7H8I9',0.00,'2021-06-20',1,'2021-06-20 00:00:00','2021-06-20 00:00:00'),
('user_001','H9I1J2K3',0.00,'2020-03-10',1,'2020-03-10 00:00:00','2020-03-10 00:00:00'),
('user_001','L4M5N6O7',0.00,'2022-09-10',1,'2022-09-10 00:00:00','2022-09-10 00:00:00');

/*Table structure for table `localizations` */

DROP TABLE IF EXISTS `localizations`;

CREATE TABLE `localizations` (
  `Id_Loc` int(11) NOT NULL AUTO_INCREMENT,
  `Dir_Ip` varchar(255) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Loc`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `localizations_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `localizations` */

insert  into `localizations`(`Id_Loc`,`Dir_Ip`,`Id_User_FK`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
(45,'192.168.0.1','ahyv8xwlu7cj900',NULL,'2024-03-25 19:33:52','2024-03-25 19:33:52'),
(46,'192.168.0.5','ahyv8xwlu7cj900',NULL,'2024-03-25 19:42:45','2024-03-25 19:42:45'),
(47,'192.168.88.9','ahyv8xwlu7cj900',NULL,'2024-03-26 13:33:17','2024-03-26 13:38:18'),
(48,'192.168.0.1','ahyv45gluc483jo',NULL,'2024-03-29 03:40:06','2024-03-29 03:40:06'),
(49,'192.168.0.1','erxyjd4wglurlw09c',NULL,'2024-04-08 23:51:08','2024-04-08 23:51:08'),
(50,'192.168.0.1','erxyjd1d8lvk7jiru',1,'2024-04-29 00:14:50','2024-04-29 00:14:50');

/*Table structure for table `modulocursos` */

DROP TABLE IF EXISTS `modulocursos`;

CREATE TABLE `modulocursos` (
  `Id_Mod` varchar(100) NOT NULL,
  `Indice_Mod` int(255) DEFAULT NULL,
  `Tit_Mod` varchar(255) DEFAULT NULL,
  `Est_Mod` int(1) DEFAULT NULL COMMENT '0: creado, 1:activo, 2: bloqueado',
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  `Porcentaje_Asig` decimal(5,2) DEFAULT NULL,
  `Horas_Cont_Mod` decimal(10,2) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Mod`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `modulocursos_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `modulocursos` */

insert  into `modulocursos`(`Id_Mod`,`Indice_Mod`,`Tit_Mod`,`Est_Mod`,`Id_Cur_FK`,`Porcentaje_Asig`,`Horas_Cont_Mod`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjdbwlwm5sy4i',NULL,'Introduccion al curso',0,'erxyjd888lwgs1y5q',50.00,0.66,1,'2024-05-25 13:41:25','2024-05-25 21:17:21'),
('erxyjdbwlwm5wqw4',NULL,'Dinamismo JS',0,'erxyjd888lwgs1y5q',50.00,0.00,1,'2024-05-25 13:44:22','2024-05-25 13:44:22');

/*Table structure for table `notificaciones` */

DROP TABLE IF EXISTS `notificaciones`;

CREATE TABLE `notificaciones` (
  `Id_Not` varchar(100) NOT NULL,
  `Not_Tit` varchar(255) NOT NULL,
  `Not_Mens` text NOT NULL,
  `Not_Fec_Cre` datetime NOT NULL,
  `ESTADO_REGISTRO` int(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Id_Not`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `notificaciones` */

insert  into `notificaciones`(`Id_Not`,`Not_Tit`,`Not_Mens`,`Not_Fec_Cre`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd128lwsq5vud','35435','5435435','2024-05-30 03:57:58',1,'2024-05-30 03:57:58','2024-05-30 03:57:58'),
('erxyjd128lwsq83dv','56636636','fvgfbvdsfg','2024-05-30 03:59:41',1,'2024-05-30 03:59:41','2024-05-30 03:59:41'),
('erxyjd128lwsqeps6','45543','43545','2024-05-30 04:04:50',1,'2024-05-30 04:04:50','2024-05-30 04:04:50'),
('erxyjd43olwspw3tm','prueba cursos','primera prueba','2024-05-30 03:50:22',1,'2024-05-30 03:50:22','2024-05-30 03:50:22');

/*Table structure for table `notificaciones_usuarios` */

DROP TABLE IF EXISTS `notificaciones_usuarios`;

CREATE TABLE `notificaciones_usuarios` (
  `Id_Not_Usu` varchar(100) NOT NULL,
  `Id_Not_FK` varchar(100) NOT NULL,
  `Id_User_FK` varchar(100) NOT NULL,
  `leida` tinyint(1) NOT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Not_Usu`),
  KEY `Id_User_FK` (`Id_User_FK`),
  KEY `Id_Not_FK` (`Id_Not_FK`),
  CONSTRAINT `notificaciones_usuarios_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`),
  CONSTRAINT `notificaciones_usuarios_ibfk_2` FOREIGN KEY (`Id_Not_FK`) REFERENCES `notificaciones` (`Id_Not`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `notificaciones_usuarios` */

insert  into `notificaciones_usuarios`(`Id_Not_Usu`,`Id_Not_FK`,`Id_User_FK`,`leida`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd128lwsqvll6','erxyjd128lwsqeps6','10oPqRs',0,1,'2024-05-30 04:17:58','2024-05-30 04:17:58');

/*Table structure for table `objetivos_cursos` */

DROP TABLE IF EXISTS `objetivos_cursos`;

CREATE TABLE `objetivos_cursos` (
  `Id_Objetivo` varchar(100) NOT NULL,
  `Desc_Objetivo` varchar(255) DEFAULT NULL,
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Objetivo`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `objetivos_cursos_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `objetivos_cursos` */

/*Table structure for table `opciones` */

DROP TABLE IF EXISTS `opciones`;

CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_opcion` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_opcion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `opciones` */

insert  into `opciones`(`id_opcion`,`nombre_opcion`,`url`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
(1,'Panel','/admin/dashboard',1,'2024-05-20 14:59:07','2024-05-20 14:59:09'),
(2,'Usuarios','/admin/users',1,'2024-05-20 14:59:01','2024-05-20 14:59:04'),
(3,'Cursos','/admin/courses',1,'2024-05-20 14:58:58','2024-05-20 14:59:00'),
(4,'Notificaciones','/admin/notifications',1,'2024-05-20 14:58:55','2024-05-20 14:58:57');

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

/*Table structure for table `requisitos_previos` */

DROP TABLE IF EXISTS `requisitos_previos`;

CREATE TABLE `requisitos_previos` (
  `Id_Req` varchar(100) NOT NULL,
  `Desc_Req` text DEFAULT NULL,
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Req`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `requisitos_previos_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `requisitos_previos` */

/*Table structure for table `respuestasevals` */

DROP TABLE IF EXISTS `respuestasevals`;

CREATE TABLE `respuestasevals` (
  `Id_Res_Eval` varchar(100) NOT NULL,
  `Text_Resp_Eval` varchar(255) DEFAULT NULL,
  `Resp_Correcta_Eval` int(1) DEFAULT NULL COMMENT '1: correcta, 2: incorrecta',
  `Id_Preg_Eval_FK` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Preg_Eval_FK` (`Id_Preg_Eval_FK`),
  CONSTRAINT `respuestasevals_ibfk_1` FOREIGN KEY (`Id_Preg_Eval_FK`) REFERENCES `preguntasevals` (`Id_Preg_Eval`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `respuestasevals` */

/*Table structure for table `resultados_evaluaciones` */

DROP TABLE IF EXISTS `resultados_evaluaciones`;

CREATE TABLE `resultados_evaluaciones` (
  `Id_Res_Eval` varchar(50) NOT NULL,
  `Id_Eval_FK` varchar(100) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Puntuacion` decimal(5,2) DEFAULT NULL,
  `Fech_Real_Eval` datetime DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Eval_FK` (`Id_Eval_FK`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `resultados_evaluaciones_ibfk_2` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`),
  CONSTRAINT `resultados_evaluaciones_ibfk_3` FOREIGN KEY (`Id_Eval_FK`) REFERENCES `evaluacions` (`Id_Eva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `resultados_evaluaciones` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Rol` varchar(255) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`Id_Rol`,`Nom_Rol`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
(1,'ADMIN',1,NULL,NULL),
(2,'INSTRUCTOR',1,NULL,NULL),
(3,'USUARIO',1,NULL,NULL);

/*Table structure for table `roles_opciones` */

DROP TABLE IF EXISTS `roles_opciones`;

CREATE TABLE `roles_opciones` (
  `Id_Rol_fk` int(11) NOT NULL,
  `id_opcion_fk` int(11) NOT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Rol_fk`,`id_opcion_fk`),
  KEY `id_opcion_fk` (`id_opcion_fk`),
  CONSTRAINT `roles_opciones_ibfk_2` FOREIGN KEY (`id_opcion_fk`) REFERENCES `opciones` (`id_opcion`),
  CONSTRAINT `roles_opciones_ibfk_3` FOREIGN KEY (`Id_Rol_fk`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles_opciones` */

insert  into `roles_opciones`(`Id_Rol_fk`,`id_opcion_fk`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
(1,1,1,NULL,NULL),
(1,2,1,NULL,NULL),
(1,3,1,NULL,NULL),
(1,4,1,'2024-05-20 15:17:42','2024-05-20 15:17:44');

/*Table structure for table `tokens` */

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `Id_Token` int(11) NOT NULL AUTO_INCREMENT,
  `Token` text NOT NULL,
  `Fec_Caducidad` varchar(100) NOT NULL,
  `User_Id_FK` varchar(100) NOT NULL,
  `Tipo_token` char(1) NOT NULL COMMENT '1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña, 4: Verificar IP',
  `ESTADO_REGISTRO` int(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Token`),
  KEY `Usuario_Id` (`User_Id_FK`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`User_Id_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=512 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

insert  into `tokens`(`Id_Token`,`Token`,`Fec_Caducidad`,`User_Id_FK`,`Tipo_token`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
(488,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY1NzgyNDIsImV4cCI6MTcxNjY2NDY0Mn0.Gd_BYpS9ouWe9nuhd8C3fe7RXH0Ynwod4uhrDZ9M4yA','1716664642','erxyjd1d8lvk7jiru','2',0,'2024-05-24 19:17:22','2024-05-24 19:39:37'),
(489,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY1Nzk1OTEsImV4cCI6MTcxNjY2NTk5MX0.ukt3Q4u_SDA1aPz52KGunI7anzoHMpvU31idxXXzxdE','1716665991','erxyjd1d8lvk7jiru','2',0,'2024-05-24 19:39:51','2024-05-24 19:43:34'),
(490,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY1Nzk4MzIsImV4cCI6MTcxNjY2NjIzMn0.9pGBE2fwGJ7OqERiARljNLiehyFa-d4-UPLt3Gyghxg','1716666232','erxyjd1d8lvk7jiru','2',1,'2024-05-24 19:43:52','2024-05-24 19:43:52'),
(491,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY1Nzk4ODQsImV4cCI6MTcxNjY2NjI4NH0.VsajA7budCCYhgODFJXBLO_758t2J0lThnrZrbFNrnE','1716666284','erxyjd1d8lvk7jiru','2',1,'2024-05-24 19:44:44','2024-05-24 19:44:44'),
(492,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY1ODU1ODcsImV4cCI6MTcxNjY3MTk4N30.hPpbswo5_kqRPexHCRVcOcjXAwDrp_iCoUJ9gTs3QnU','1716671987','erxyjd1d8lvk7jiru','2',1,'2024-05-24 21:19:47','2024-05-24 21:19:47'),
(493,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY1OTMxMDUsImV4cCI6MTcxNjY3OTUwNX0.KTIyTCfXgHFXXcVtCf7sswdY916QmejXyD_IWnvwHs4','1716679505','erxyjd1d8lvk7jiru','2',1,'2024-05-24 23:25:05','2024-05-24 23:25:05'),
(494,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY2MDc0NjUsImV4cCI6MTcxNjY5Mzg2NX0.Z_sMWn3IKPQJLrfg7_zHDsaq6383qzQu2YJv-Ko8rk8','1716693865','erxyjd1d8lvk7jiru','2',1,'2024-05-25 03:24:25','2024-05-25 03:24:25'),
(495,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY2NDM5NjYsImV4cCI6MTcxNjczMDM2Nn0.qh8_QtsTcC1pbGL6gLi0WgKmrRx07w_zQ7pLQ76upoQ','1716730366','erxyjd1d8lvk7jiru','2',0,'2024-05-25 13:32:46','2024-05-25 15:13:25'),
(496,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY2NDU3NDQsImV4cCI6MTcxNjczMjE0NH0.GYBQ3J1rKzKMHXdZm_yCwGzmIIJi_EHjK0qtFIHwAW0','1716732144','erxyjd1d8lvk7jiru','2',1,'2024-05-25 14:02:24','2024-05-25 14:02:24'),
(497,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY2NTAwMDYsImV4cCI6MTcxNjczNjQwNn0.b46ywqKwV69UtgbDTtOEgb_J9pQwGxKvpbUab128uc8','1716736406','erxyjd1d8lvk7jiru','2',1,'2024-05-25 15:13:26','2024-05-25 15:13:26'),
(498,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY2NjU2OTYsImV4cCI6MTcxNjc1MjA5Nn0.-Za2l29YCOTSyn-dEZ4HkE8QiM7KNA7uIdKcVchMBDE','1716752096','erxyjd1d8lvk7jiru','2',1,'2024-05-25 19:34:56','2024-05-25 19:34:56'),
(499,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY3NDkyNTMsImV4cCI6MTcxNjgzNTY1M30.qZ2SwepYfYFbe1pdtEp8NUYb8H3yP3RTlFCPQWNj1Xs','1716835653','erxyjd1d8lvk7jiru','2',1,'2024-05-26 18:47:33','2024-05-26 18:47:33'),
(500,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY4MDgwMzQsImV4cCI6MTcxNjg5NDQzNH0.cqMn3yFyX3jp8w0F6mwjQ4J2pOi8GZXi--MHudPBSQQ','1716894434','erxyjd1d8lvk7jiru','2',1,'2024-05-27 11:07:14','2024-05-27 11:07:14'),
(501,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY4MTk1MzEsImV4cCI6MTcxNjkwNTkzMX0.EuB5NxwPHJgOerCDBHxcp9qWXRy_8TN476UlSeq6NJQ','1716905931','erxyjd1d8lvk7jiru','2',1,'2024-05-27 14:18:51','2024-05-27 14:18:51'),
(502,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY4MjYwMDYsImV4cCI6MTcxNjkxMjQwNn0.Wnmz5IM7XvJlUGxuCfdMNvqAzZ6kE2nPnI7panA86eM','1716912406','erxyjd1d8lvk7jiru','2',1,'2024-05-27 16:06:46','2024-05-27 16:06:46'),
(503,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY4Mzc5NDcsImV4cCI6MTcxNjkyNDM0N30.cB5WQFdqQ1cOSqmielT0LWJI3kKKMaa6oQ4gbUUrBaE','1716924347','erxyjd1d8lvk7jiru','2',1,'2024-05-27 19:25:47','2024-05-27 19:25:47'),
(504,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY5MDQxNTMsImV4cCI6MTcxNjk5MDU1M30.5cUg2RkCKPitUD1Jiv7qlAb6z2mLQAKZCUVWwLSrX74','1716990553','erxyjd1d8lvk7jiru','2',1,'2024-05-28 13:49:13','2024-05-28 13:49:13'),
(505,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTY5MDkzNjQsImV4cCI6MTcxNjk5NTc2NH0.D3roRYNQcv_LNWrwZgqmyhLs5S6b5halko1aGQrtH54','1716995764','erxyjd1d8lvk7jiru','2',1,'2024-05-28 15:16:04','2024-05-28 15:16:04'),
(506,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTcwMDk3NTgsImV4cCI6MTcxNzA5NjE1OH0.uR9T9xJccBeUQVQHek58SbgrQCDeayfjN0r4PCG-Ut4','1717096158','erxyjd1d8lvk7jiru','2',1,'2024-05-29 19:09:18','2024-05-29 19:09:18'),
(507,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTcwMTM3NTksImV4cCI6MTcxNzEwMDE1OX0.whNtasR91DEm72Jgf1W3iBWRbGguq1zFterKw8iKZIs','1717100159','erxyjd1d8lvk7jiru','2',1,'2024-05-29 20:15:59','2024-05-29 20:15:59'),
(508,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTcwMzY0MjAsImV4cCI6MTcxNzEyMjgyMH0.lsRJv1tJj5FHy2-h5-HKJ1v7-QMVE5HEyRonOdKifc4','1717122820','erxyjd1d8lvk7jiru','2',1,'2024-05-30 02:33:40','2024-05-30 02:33:40'),
(509,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTcwNDExMTEsImV4cCI6MTcxNzEyNzUxMX0.QwRfdSJCMM9MF5VNRyhVEGYlBSZSrch24ySossTa3iA','1717127511','erxyjd1d8lvk7jiru','2',1,'2024-05-30 03:51:51','2024-05-30 03:51:51'),
(510,'396464','1718644813','erxyjd1d8lvk7jiru','3',1,'2024-06-17 17:10:15','2024-06-17 17:10:15'),
(511,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJGb3RfVXNlciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQyOTA5MTY4LTgyYzNlN2ZkY2E1Yz9peGxpYj1yYi00LjAuMyZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTI4JnE9ODAiLCJFc3RfRW1haWxfVXNlciI6MSwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzE4NjQ0MjQyLCJleHAiOjE3MTg3MzA2NDJ9.snyBxcAiuLxNoCwKL3qh8ySkLCRL3sjRHJ_K35I5wX8','1718730642','erxyjd1d8lvk7jiru','2',1,'2024-06-17 17:10:42','2024-06-17 17:10:42');

/*Table structure for table `usuario_contenidos` */

DROP TABLE IF EXISTS `usuario_contenidos`;

CREATE TABLE `usuario_contenidos` (
  `Id_Vista` varchar(100) NOT NULL,
  `Id_Cont_Mod_FK` varchar(100) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Fech_Visualizacion` datetime DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Vista`),
  KEY `ewee` (`Id_Cont_Mod_FK`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `ewee` FOREIGN KEY (`Id_Cont_Mod_FK`) REFERENCES `contenido_modulos` (`Id_Cont`),
  CONSTRAINT `usuario_contenidos_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuario_contenidos` */

insert  into `usuario_contenidos`(`Id_Vista`,`Id_Cont_Mod_FK`,`Id_User_FK`,`Fech_Visualizacion`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd7cclwm90mx2','erxyjd9iwlwm8ihme','erxyjd1d8lvk7jiru','2024-05-01 15:11:22',1,'2024-05-25 15:11:22','2024-05-25 15:11:22'),
('erxyjd7cclwm90qbv','erxyjd9iwlwm8jdhr','erxyjd1d8lvk7jiru','2024-05-05 15:11:27',1,'2024-05-25 15:11:27','2024-05-25 15:11:27'),
('erxyjd7cclwm90ty8','erxyjd9iwlwm8jtvj','erxyjd1d8lvk7jiru','2024-05-05 15:11:32',1,'2024-05-25 15:11:32','2024-05-25 15:11:32'),
('erxyjd7cclwm90x1j','erxyjd9iwlwm8kg6b','erxyjd1d8lvk7jiru','2024-05-05 15:12:05',1,'2024-05-25 15:11:36','2024-05-25 15:12:05'),
('erxyjd7cclwm91xgw','erxyjd9iwlwm8l8fu','erxyjd1d8lvk7jiru','2024-05-10 15:12:23',1,'2024-05-25 15:12:23','2024-05-25 15:12:23'),
('erxyjd7cclwm920re','erxyjd9iwlwm8m22p','erxyjd1d8lvk7jiru','2024-05-17 15:12:27',1,'2024-05-25 15:12:27','2024-05-25 15:12:27'),
('erxyjd7cclwm923oe','erxyjd9iwlwm8mkgr','erxyjd1d8lvk7jiru','2024-05-17 15:12:31',1,'2024-05-25 15:12:31','2024-05-25 15:12:31'),
('erxyjd7cclwm927rv','erxyjd9iwlwm8mq33','erxyjd1d8lvk7jiru','2024-05-25 15:12:36',1,'2024-05-25 15:12:36','2024-05-25 15:12:36');

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
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_User`),
  KEY `Id_Rol_FK` (`Id_Rol_FK`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_Rol_FK`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuarios` */

insert  into `usuarios`(`Id_User`,`Nom_User`,`Ape_User`,`Tel_User`,`Ema_User`,`Pass_User`,`Id_Rol_FK`,`Fot_User`,`Est_Email_User`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('10oPqRs','Valentina','Ruiz','+8887776665','valentina@example.com','valen456',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('1aBcDe','Juan','Pérez','+1234567890','juan@example.com','contraseña123',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('2dEfGh','María','González','+9876543210','maria@example.com','password456',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('3iJkLm','Carlos','López','+5551234567','carlos@example.com','qwerty789',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('4nOpQr','Laura','Martínez','+4449876543','laura@example.com','pass1234',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('5sTuVw','Pedro','Gómez','+6665554444','pedro@example.com','abcde567',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('6xYzAb','Ana','Fernández','+7774443332','ana@example.com','ana12345',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('7CdEfG','Luis','Rodríguez','+3332221111','luis@example.com','lucho567',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('8HgHiJ','Sofía','Hernández','+2221110000','sofia@example.com','sofia789',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('9KlMnO','Diego','Díaz','+9998887776','diego@example.com','diego123',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),
('ahyv45gluc483jo','2313','pertuz','3012222222','yoinerpertuzx@gmail.com','$2b$10$MqGsaRb8ajQeWH88eTlD/utEzqu1TQxLAAeQkwl4Q.cJAPaR6AG76',2,NULL,1,1,'2024-03-29 03:40:06','2024-05-07 22:19:47'),
('ahyv8xwlu7cj900','Yonier','perez','3139839832','yoinerpertuyz@gmail.com','$2b$10$0TZRSwVDWhrvBBArqwp2w.YFj9q5CdEhDfTbEaNc2iAZ36/52Ad2y',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-03-25 19:33:52','2024-03-29 02:36:08'),
('erxyjd1d8lvk7jiru','Wiro','perez','9856464','yoinerpertuz@gmail.com','$2b$10$X6aX6xxpN/NWp5WPETM79OgiaTUm67A7Yxl/CB4fg82vQSTdH.djC',1,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-04-29 00:14:50','2024-06-17 17:10:30'),
('erxyjd4wglurlw09c','Kilian','Mbbape','561456484','KilianEmbappe@gmail.com','$2b$10$sVSQ3Ha.YBPyKFkzJeFYD.EE123Zb.kXyp/zcvyUQJCJvcwyqBIma',1,NULL,1,1,'2024-04-08 23:51:08','2024-04-08 23:51:08'),
('user_001','John','Doe','1234567890','john.doe1@example.com','password123',1,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,0,'2024-05-18 16:20:30','2024-05-18 16:20:30');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
