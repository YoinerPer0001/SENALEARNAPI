/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.28-MariaDB : Database - senalearn
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

insert  into `categorias`(`Id_Cat`,`Nom_Cat`,`ESTADO_REGISTRO`,`updatedAt`,`createdAt`) values ('1','Programación',1,NULL,NULL),('A1B2C3D4','Programación',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('C3D4E5F6','Habilidades Blandas',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('E5F6G7H8','Desarrollo Web',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('G7H8I9J1','Gestión de Proyectos',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('I9J1K2L3','Ciencia de Datos',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('K2L3M4N5','Idiomas',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('M4N5O6P7','Inteligencia Artificial',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('Q8R9S1T2','Marketing Digital',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('U3V4W5X6','Diseño Gráfico',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('Y7Z8A1B2','Finanzas Personales',1,'2024-05-21 00:00:00','2024-05-21 00:00:00');

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

insert  into `contenido_modulos`(`Id_Cont`,`Indice_Cont`,`Tip_Cont`,`Url_Cont`,`Tit_Cont`,`Porcentaje_Asig`,`Id_Mod_FK`,`Duracion_Cont`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values ('bq8lwhuy35a',1,1,'','Resumen de seccion',5.00,'erxyjd888lwgs428z',1.00,1,'2024-05-22 13:26:24','2024-05-22 13:26:24'),('hle1ff9z8lwhwsh8t',2,1,'454355','Introduccion al curso',20.00,'erxyjd4rclwgs6nbk',30.00,1,'2024-05-22 14:18:02','2024-05-22 14:23:06');

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

insert  into `cursos`(`Id_Cur`,`Nom_Cur`,`Des_Cur`,`Hor_Cont_Total`,`Fech_Crea_Cur`,`Id_Cat_FK`,`Fot_Cur`,`Est_Cur`,`Id_Inst`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values ('B2C3D4E5','Habilidades Blandas en el Trabajo','Curso sobre habilidades interpersonales',0.00,'2024-05-21','C3D4E5F6',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('C1A2B3C4','Introducción a la Programación','Curso básico sobre programación',0.00,'2024-05-21','A1B2C3D4',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('D5E6F7G8','HTML y CSS','Curso de desarrollo web con HTML y CSS',0.00,'2024-05-21','E5F6G7H8',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('erxyjd888lwgs1y5q','HTML, CSS Y JAVASCRIPT','Aprenderas todo acerca de la programacion web',3.26,'2024-05-21','1',NULL,1,'erxyjd1d8lvk7jiru',1,'2024-05-21 19:17:39','2024-05-22 14:23:06'),('F6G7H8I9','Gestión de Proyectos Ágiles','Curso sobre gestión de proyectos utilizando metodologías ágiles',0.00,'2024-05-21','G7H8I9J1',NULL,1,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('H9I1J2K3','Introducción a la Ciencia de Datos','Conceptos básicos de ciencia de datos',0.00,'2024-05-21','I9J1K2L3',NULL,1,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('J1K2L3M4','Curso de Inglés Básico','Curso para aprender inglés desde cero',0.00,'2024-05-21','K2L3M4N5',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('L4M5N6O7','Fundamentos de Inteligencia Artificial','Curso introductorio sobre IA',0.00,'2024-05-21','M4N5O6P7',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('P8Q9R1S2','Estrategias de Marketing Digital','Curso sobre marketing digital',0.00,'2024-05-21','Q8R9S1T2',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('T3U4V5W6','Diseño Gráfico Básico','Fundamentos de diseño gráfico',0.00,'2024-05-21','U3V4W5X6',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00'),('X7Y8Z9A1','Finanzas Personales para Principiantes','Curso sobre manejo de finanzas personales',0.00,'2024-05-21','Y7Z8A1B2',NULL,2,'erxyjd1d8lvk7jiru',1,'2024-05-21 00:00:00','2024-05-21 00:00:00');

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
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Eva`),
  KEY `Id_Mod_Cur_FK` (`Id_Mod_Cur_FK`),
  CONSTRAINT `evaluacions_ibfk_1` FOREIGN KEY (`Id_Mod_Cur_FK`) REFERENCES `modulocursos` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `evaluacions` */

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

insert  into `inscripciones`(`Id_User_FK`,`Id_Cur_FK`,`Prog_Cur`,`fecha_insc`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values ('10oPqRs','C1A2B3C4',0.00,'2024-01-05',1,'2024-01-05 00:00:00','2024-01-05 00:00:00'),('10oPqRs','D5E6F7G8',0.00,'2023-05-20',1,'2023-05-20 00:00:00','2023-05-20 00:00:00'),('10oPqRs','L4M5N6O7',0.00,'2020-11-05',1,'2020-11-05 00:00:00','2020-11-05 00:00:00'),('10oPqRs','X7Y8Z9A1',0.00,'2022-02-05',1,'2022-02-05 00:00:00','2022-02-05 00:00:00'),('1aBcDe','J1K2L3M4',0.00,'2021-07-25',1,'2021-07-25 00:00:00','2021-07-25 00:00:00'),('1aBcDe','L4M5N6O7',0.00,'2020-04-05',1,'2020-04-05 00:00:00','2020-04-05 00:00:00'),('1aBcDe','P8Q9R1S2',0.00,'2022-10-05',1,'2022-10-05 00:00:00','2022-10-05 00:00:00'),('2dEfGh','B2C3D4E5',0.00,'2022-03-20',1,'2022-03-20 00:00:00','2022-03-20 00:00:00'),('2dEfGh','D5E6F7G8',0.00,'2020-12-20',1,'2020-12-20 00:00:00','2020-12-20 00:00:00'),('2dEfGh','H9I1J2K3',100.00,'2023-06-15',1,'2023-06-15 00:00:00','2023-06-15 00:00:00'),('3iJkLm','C1A2B3C4',0.00,'2021-08-10',1,'2021-08-10 00:00:00','2021-08-10 00:00:00'),('3iJkLm','P8Q9R1S2',0.00,'2020-05-25',1,'2020-05-25 00:00:00','2020-05-25 00:00:00'),('3iJkLm','T3U4V5W6',0.00,'2022-11-30',1,'2022-11-30 00:00:00','2022-11-30 00:00:00'),('4nOpQr','F6G7H8I9',0.00,'2022-04-15',1,'2022-04-15 00:00:00','2022-04-15 00:00:00'),('4nOpQr','H9I1J2K3',0.00,'2021-01-15',1,'2021-01-15 00:00:00','2021-01-15 00:00:00'),('4nOpQr','L4M5N6O7',0.00,'2023-07-10',1,'2023-07-10 00:00:00','2023-07-10 00:00:00'),('5sTuVw','D5E6F7G8',0.00,'2021-09-05',1,'2021-09-05 00:00:00','2021-09-05 00:00:00'),('5sTuVw','T3U4V5W6',0.00,'2020-06-30',1,'2020-06-30 00:00:00','2020-06-30 00:00:00'),('5sTuVw','X7Y8Z9A1',0.00,'2022-12-25',1,'2022-12-25 00:00:00','2022-12-25 00:00:00'),('6xYzAb','J1K2L3M4',0.00,'2022-05-10',1,'2022-05-10 00:00:00','2022-05-10 00:00:00'),('6xYzAb','L4M5N6O7',0.00,'2024-01-20',1,'2024-01-20 00:00:00','2024-01-20 00:00:00'),('6xYzAb','P8Q9R1S2',50.00,'2021-02-10',1,'2021-02-10 00:00:00','2021-02-10 00:00:00'),('7CdEfG','B2C3D4E5',0.00,'2023-01-20',1,'2023-01-20 00:00:00','2023-01-20 00:00:00'),('7CdEfG','H9I1J2K3',0.00,'2021-10-30',1,'2021-10-30 00:00:00','2021-10-30 00:00:00'),('7CdEfG','X7Y8Z9A1',0.00,'2020-07-15',1,'2020-07-15 00:00:00','2020-07-15 00:00:00'),('8HgHiJ','C1A2B3C4',0.00,'2022-06-25',1,'2022-06-25 00:00:00','2022-06-25 00:00:00'),('8HgHiJ','P8Q9R1S2',0.00,'2024-01-25',1,'2024-01-25 00:00:00','2024-01-25 00:00:00'),('8HgHiJ','T3U4V5W6',0.00,'2021-03-05',1,'2021-03-05 00:00:00','2021-03-05 00:00:00'),('9KlMnO','B2C3D4E5',0.00,'2020-08-20',1,'2020-08-20 00:00:00','2020-08-20 00:00:00'),('9KlMnO','F6G7H8I9',0.00,'2023-02-15',1,'2023-02-15 00:00:00','2023-02-15 00:00:00'),('9KlMnO','L4M5N6O7',0.00,'2021-11-20',1,'2021-11-20 00:00:00','2021-11-20 00:00:00'),('ahyv45gluc483jo','F6G7H8I9',0.00,'2020-09-25',1,'2020-09-25 00:00:00','2020-09-25 00:00:00'),('ahyv45gluc483jo','J1K2L3M4',0.00,'2023-03-05',1,'2023-03-05 00:00:00','2023-03-05 00:00:00'),('ahyv45gluc483jo','P8Q9R1S2',0.00,'2024-03-15',1,'2024-03-15 00:00:00','2024-03-15 00:00:00'),('ahyv8xwlu7cj900','C1A2B3C4',0.00,'2023-04-30',1,'2023-04-30 00:00:00','2023-04-30 00:00:00'),('ahyv8xwlu7cj900','J1K2L3M4',0.00,'2020-10-10',1,'2020-10-10 00:00:00','2020-10-10 00:00:00'),('ahyv8xwlu7cj900','T3U4V5W6',0.00,'2022-01-10',1,'2022-01-10 00:00:00','2022-01-10 00:00:00'),('erxyjd1d8lvk7jiru','C1A2B3C4',0.00,'2020-03-15',1,'2020-03-15 00:00:00','2020-03-15 00:00:00'),('erxyjd1d8lvk7jiru','D5E6F7G8',0.00,'2022-07-20',1,'2022-07-20 00:00:00','2022-07-20 00:00:00'),('erxyjd1d8lvk7jiru','X7Y8Z9A1',0.00,'2021-04-01',1,'2021-04-01 00:00:00','2021-04-01 00:00:00'),('erxyjd4wglurlw09c','B2C3D4E5',0.00,'2021-05-15',1,'2021-05-15 00:00:00','2021-05-15 00:00:00'),('erxyjd4wglurlw09c','D5E6F7G8',0.00,'2020-02-20',1,'2020-02-20 00:00:00','2020-02-20 00:00:00'),('erxyjd4wglurlw09c','H9I1J2K3',0.00,'2022-08-15',1,'2022-08-15 00:00:00','2022-08-15 00:00:00'),('user_001','F6G7H8I9',0.00,'2021-06-20',1,'2021-06-20 00:00:00','2021-06-20 00:00:00'),('user_001','H9I1J2K3',0.00,'2020-03-10',1,'2020-03-10 00:00:00','2020-03-10 00:00:00'),('user_001','L4M5N6O7',0.00,'2022-09-10',1,'2022-09-10 00:00:00','2022-09-10 00:00:00');

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

insert  into `localizations`(`Id_Loc`,`Dir_Ip`,`Id_User_FK`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values (45,'192.168.0.1','ahyv8xwlu7cj900',NULL,'2024-03-25 19:33:52','2024-03-25 19:33:52'),(46,'192.168.0.5','ahyv8xwlu7cj900',NULL,'2024-03-25 19:42:45','2024-03-25 19:42:45'),(47,'192.168.88.9','ahyv8xwlu7cj900',NULL,'2024-03-26 13:33:17','2024-03-26 13:38:18'),(48,'192.168.0.1','ahyv45gluc483jo',NULL,'2024-03-29 03:40:06','2024-03-29 03:40:06'),(49,'192.168.0.1','erxyjd4wglurlw09c',NULL,'2024-04-08 23:51:08','2024-04-08 23:51:08'),(50,'192.168.0.1','erxyjd1d8lvk7jiru',1,'2024-04-29 00:14:50','2024-04-29 00:14:50');

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

insert  into `modulocursos`(`Id_Mod`,`Indice_Mod`,`Tit_Mod`,`Est_Mod`,`Id_Cur_FK`,`Porcentaje_Asig`,`Horas_Cont_Mod`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values ('erxyjd4rclwgs6nbk',NULL,'Hola mundo',0,'erxyjd888lwgs1y5q',20.00,1.01,1,'2024-05-21 19:21:18','2024-05-22 14:23:06'),('erxyjd4rclwgs6uff',NULL,'Estructura basica HTML',0,'erxyjd888lwgs1y5q',20.00,0.00,1,'2024-05-21 19:21:28','2024-05-21 19:21:39'),('erxyjd4rclwgs7320',NULL,'Aplicando estilos CSS',0,'erxyjd888lwgs1y5q',20.00,0.00,1,'2024-05-21 19:21:39','2024-05-21 19:21:39'),('erxyjd888lwgs428z',NULL,'Introduccion',0,'erxyjd888lwgs1y5q',20.00,0.50,1,'2024-05-21 19:19:18','2024-05-21 20:04:27'),('erxyjd888lwgs5adg',NULL,'Recursos necesarios',0,'erxyjd888lwgs1y5q',20.00,0.00,1,'2024-05-21 19:20:15','2024-05-21 19:21:39');

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

insert  into `opciones`(`id_opcion`,`nombre_opcion`,`url`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values (1,'Panel','/admin/dashboard',1,'2024-05-20 14:59:07','2024-05-20 14:59:09'),(2,'Usuarios','/admin/users',1,'2024-05-20 14:59:01','2024-05-20 14:59:04'),(3,'Cursos','/admin/courses',1,'2024-05-20 14:58:58','2024-05-20 14:59:00'),(4,'Notificaciones','/admin/notifications',1,'2024-05-20 14:58:55','2024-05-20 14:58:57');

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

insert  into `roles`(`Id_Rol`,`Nom_Rol`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values (1,'ADMIN',NULL,NULL,NULL),(2,'INSTRUCTOR',NULL,NULL,NULL),(3,'USUARIO',NULL,NULL,NULL);

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

insert  into `roles_opciones`(`Id_Rol_fk`,`id_opcion_fk`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values (1,1,1,NULL,NULL),(1,2,1,NULL,NULL),(1,3,1,NULL,NULL),(1,4,1,'2024-05-20 15:17:42','2024-05-20 15:17:44');

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
) ENGINE=InnoDB AUTO_INCREMENT=447 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

insert  into `tokens`(`Id_Token`,`Token`,`Fec_Caducidad`,`User_Id_FK`,`Tipo_token`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values (318,'212645','1711395832','ahyv8xwlu7cj900','2',0,'2024-03-25 19:33:52','2024-03-25 19:33:52'),(319,'639844','1711396246','ahyv8xwlu7cj900','4',0,'2024-03-25 19:40:46','2024-03-25 19:40:46'),(320,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6MX0sImlhdCI6MTcxMTM5NTc4MCwiZXhwIjoxNzExNDgyMTgwfQ.Nmk','1711482180','ahyv8xwlu7cj900','1',0,'2024-03-25 19:43:00','2024-03-25 19:43:00'),(321,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6MX0sImlhdCI6MTcxMTQ1NjcxOCwiZXhwIjoxNzExNTQzMTE4fQ.UIS','1711543118','ahyv8xwlu7cj900','1',0,'2024-03-26 12:38:38','2024-03-26 12:38:38'),(322,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTQ1Njc2OSwiZXhwIjoxNzExNTQzMTY5fQ.OH_','1711543169','ahyv8xwlu7cj900','1',0,'2024-03-26 12:39:29','2024-03-26 12:39:29'),(323,'kloallal','2024-01-22','ahyv8xwlu7cj900','1',0,'2024-03-26 12:41:36','2024-03-26 12:47:13'),(324,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTU1MDA5NiwiZXhwIjoxNzExNjM2NDk2fQ.VCD','1711636496','ahyv8xwlu7cj900','1',0,'2024-03-27 14:34:56','2024-03-27 14:34:56'),(325,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTU2OTA3NywiZXhwIjoxNzExNjU1NDc3fQ.Dr_','1711655477','ahyv8xwlu7cj900','1',0,'2024-03-27 19:51:17','2024-03-27 19:51:17'),(326,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTYzNTg3NCwiZXhwIjoxNzExNzIyMjc0fQ.JWI','1711722274','ahyv8xwlu7cj900','1',0,'2024-03-28 14:24:34','2024-03-28 14:24:34'),(327,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2OHh3bHU3Y2o5MDAiLCJOb21fVXNlciI6InBldHJvIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcxMTY2NzgxNiwiZXhwIjoxNzExNzU0MjE2fQ.zd-','1711754216','ahyv8xwlu7cj900','1',0,'2024-03-28 23:16:56','2024-03-28 23:16:56'),(328,'669615','1711684206','ahyv45gluc483jo','2',0,'2024-03-29 03:40:06','2024-03-29 03:40:06'),(329,'293478','1711684399','ahyv45gluc483jo','4',0,'2024-03-29 03:43:19','2024-03-29 03:43:19'),(330,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNjgzODEwLCJleHAiOjE3MTE3NzAyMTB9.o','1711770210','ahyv45gluc483jo','1',0,'2024-03-29 03:43:30','2024-03-29 03:43:30'),(331,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNjgzOTM3LCJleHAiOjE3MTE3NzAzMzd9.R','1711770337','ahyv45gluc483jo','1',0,'2024-03-29 03:45:37','2024-03-29 03:45:37'),(332,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyMjY4MjM5LCJleHAiOjE3MTIzNTQ2Mzl9.H','1712354639','ahyv45gluc483jo','1',0,'2024-04-04 22:03:59','2024-04-04 22:03:59'),(333,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyMjY4NDc5LCJleHAiOjE3MTIzNTQ4Nzl9.t','1712354879','ahyv45gluc483jo','1',0,'2024-04-04 22:07:59','2024-04-04 22:07:59'),(334,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyNDE0MTgwLCJleHAiOjE3MTI1MDA1ODB9.P','1712500580','ahyv45gluc483jo','1',0,'2024-04-06 14:36:20','2024-04-06 14:36:20'),(335,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyNDUzNDIyLCJleHAiOjE3MTI1Mzk4MjJ9.z','1712539822','ahyv45gluc483jo','1',0,'2024-04-07 01:30:22','2024-04-07 01:30:22'),(336,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyNTkwMjkwLCJleHAiOjE3MTI2NzY2OTB9.z','1712676690','ahyv45gluc483jo','1',0,'2024-04-08 15:31:30','2024-04-08 15:31:30'),(337,'047174','1712620868','erxyjd4wglurlw09c','2',0,'2024-04-08 23:51:08','2024-04-08 23:51:08'),(338,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ0d2dsdXJsdzA5YyIsIk5vbV9Vc2VyIjoiS2lsaWFuIiwiQXBlX1VzZXIiOiJNYmJhcGUiLCJFbWFfVXNlciI6IktpbGlhbkVtYmFwcGVAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyNjIwNDg1LCJleHAiOjE3MTI3MDY4OD','1712706885','erxyjd4wglurlw09c','1',0,'2024-04-08 23:54:45','2024-04-08 23:54:45'),(339,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ0d2dsdXJsdzA5YyIsIk5vbV9Vc2VyIjoiS2lsaWFuIiwiQXBlX1VzZXIiOiJNYmJhcGUiLCJFbWFfVXNlciI6IktpbGlhbkVtYmFwcGVAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyNjk5NzQ1LCJleHAiOjE3MTI3ODYxND','1712786145','erxyjd4wglurlw09c','1',0,'2024-04-09 21:55:45','2024-04-09 21:55:45'),(340,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ0d2dsdXJsdzA5YyIsIk5vbV9Vc2VyIjoiS2lsaWFuIiwiQXBlX1VzZXIiOiJNYmJhcGUiLCJFbWFfVXNlciI6IktpbGlhbkVtYmFwcGVAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyODcyODM0LCJleHAiOjE3MTI5NTkyMz','1712959234','erxyjd4wglurlw09c','1',0,'2024-04-11 22:00:34','2024-04-11 22:00:34'),(341,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyODcyOTcxLCJleHAiOjE3MTI5NTkzNzF9.W','1712959371','ahyv45gluc483jo','1',0,'2024-04-11 22:02:51','2024-04-11 22:02:51'),(342,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEyOTUyNzQwLCJleHAiOjE3MTMwMzkxNDB9.4','1713039140','ahyv45gluc483jo','1',0,'2024-04-12 20:12:20','2024-04-12 20:12:20'),(343,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ0d2dsdXJsdzA5YyIsIk5vbV9Vc2VyIjoiS2lsaWFuIiwiQXBlX1VzZXIiOiJNYmJhcGUiLCJFbWFfVXNlciI6IktpbGlhbkVtYmFwcGVAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyOTc0NDM0LCJleHAiOjE3MTMwNjA4Mz','1713060834','erxyjd4wglurlw09c','1',0,'2024-04-13 02:13:54','2024-04-13 02:13:54'),(344,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMDIyNDAyLCJleHAiOjE3MTMxMDg4MDJ9.7','1713108802','ahyv45gluc483jo','1',0,'2024-04-13 15:33:22','2024-04-13 15:33:22'),(345,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMDQ4MTIyLCJleHAiOjE3MTMxMzQ1MjJ9.6','1713134522','ahyv45gluc483jo','1',0,'2024-04-13 22:42:02','2024-04-13 22:42:02'),(346,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMTM0NjQxLCJleHAiOjE3MTMyMjEwNDF9.o','1713221041','ahyv45gluc483jo','1',0,'2024-04-14 22:44:01','2024-04-14 22:44:01'),(347,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMjIxMTE1LCJleHAiOjE3MTMzMDc1MTV9.y','1713307515','ahyv45gluc483jo','1',0,'2024-04-15 22:45:15','2024-04-15 22:45:15'),(348,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzEzMzA3NjM2LCJleHAiOjE3MTMzOTQwMzZ9.x','1713394036','ahyv45gluc483jo','1',0,'2024-04-16 22:47:16','2024-04-16 22:47:16'),(349,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzE0MzMzNTI2LCJleHAiOjE3MTQ0MTk5MjZ9.H','1714419926','ahyv45gluc483jo','1',0,'2024-04-28 19:45:26','2024-04-28 19:45:26'),(350,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzE0MzQxMTQ4LCJleHAiOjE3MTQ0Mjc1NDh9.B','1714427548','ahyv45gluc483jo','2',0,'2024-04-28 21:52:28','2024-04-28 21:52:28'),(351,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6InlvaW5lciIsIkFwZV9Vc2VyIjoicGVydHV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoyfSwiaWF0IjoxNzE0MzQ4OTA1LCJleHAiOjE3MTQ0MzUzMDV9.Z','1714435305','ahyv45gluc483jo','2',1,'2024-04-29 00:01:45','2024-04-29 00:01:45'),(352,'851786','1714350290','erxyjd1d8lvk7jiru','1',1,'2024-04-29 00:14:50','2024-04-29 00:14:50'),(353,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MTQzNDk4MDcsImV4cCI6MTcxNDQzNjIwN30.or','1714436207','erxyjd1d8lvk7jiru','2',1,'2024-04-29 00:16:47','2024-04-29 00:16:47'),(354,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MTQzNTAwNzEsImV4cCI6MTcxNDQzNjQ3MX0.lb','1714436471','erxyjd1d8lvk7jiru','2',1,'2024-04-29 00:21:11','2024-04-29 00:21:11'),(355,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MTQzNTAyNzUsImV4cCI6MTcxNDQzNjY3NX0.Fkgd33htFuBlXkA_JmZTA0cpzdrI_86iBlfYRefp5VU','1714436675','erxyjd1d8lvk7jiru','2',1,'2024-04-29 00:24:35','2024-04-29 00:24:35'),(356,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTQzNTAzODcsImV4cCI6MTcxNDQzNjc4N30.5FCrgxh7ZCzMhWTw1ODwDekCpLZYVwh-S7vRLvmRSB0','1714436787','erxyjd1d8lvk7jiru','2',1,'2024-04-29 00:26:27','2024-04-29 00:26:27'),(357,'173476','1714351932','ahyv8xwlu7cj900','2',1,'2024-04-29 00:42:12','2024-04-29 00:42:12'),(358,'921951','1714352023','erxyjd1d8lvk7jiru','2',1,'2024-04-29 00:43:43','2024-04-29 00:43:43'),(359,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTUxMTU4NzQsImV4cCI6MTcxNTIwMjI3NH0.ijS_mJcguAkwB_SktLIu7jMA-izZWE4bbUVnmxQHudU','1715202274','erxyjd1d8lvk7jiru','2',1,'2024-05-07 21:04:34','2024-05-07 21:04:34'),(360,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTUxMjAyMzYsImV4cCI6MTcxNTIwNjYzNn0.CoqBUqII3F6GgKxYKPWUrLD7a_oJ-hIFj7a-IpHxPQY','1715206636','erxyjd1d8lvk7jiru','2',1,'2024-05-07 22:17:16','2024-05-07 22:17:16'),(361,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTUzOTkxODEsImV4cCI6MTcxNTQ4NTU4MX0.5WQp9j-ItpoxyBuHZB04znNZ8T7OMClgqQZujILLJt8','1715485581','erxyjd1d8lvk7jiru','2',1,'2024-05-11 03:46:21','2024-05-11 03:46:21'),(362,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTUzOTk1MTEsImV4cCI6MTcxNTQ4NTkxMX0.QJ_-ccXn49pcvkFJdeWLSDfCwL35eLmf1VtBEbSmJn4','1715485911','erxyjd1d8lvk7jiru','2',1,'2024-05-11 03:51:51','2024-05-11 03:51:51'),(363,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU0NTgwOTYsImV4cCI6MTcxNTU0NDQ5Nn0.wdEjM6LsaPSTM7whV4PXgx8qMdaEMMKuQ2LDNBqvXNk','1715544496','erxyjd1d8lvk7jiru','2',1,'2024-05-11 20:08:16','2024-05-11 20:08:16'),(364,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU0NTgxNTgsImV4cCI6MTcxNTU0NDU1OH0.e9doZjtMKYdXCOXaqE512vFeTXHBdsaOjtLn4Twn1aI','1715544558','erxyjd1d8lvk7jiru','2',1,'2024-05-11 20:09:18','2024-05-11 20:09:18'),(365,'722426','1715459127','erxyjd1d8lvk7jiru','3',1,'2024-05-11 20:15:27','2024-05-11 20:15:27'),(366,'444842','1715459130','erxyjd1d8lvk7jiru','3',1,'2024-05-11 20:15:30','2024-05-11 20:15:30'),(367,'668287','1715459150','erxyjd1d8lvk7jiru','3',1,'2024-05-11 20:15:50','2024-05-11 20:15:50'),(368,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU0NTg2NTMsImV4cCI6MTcxNTU0NTA1M30.NRDYyTXjYvH3G7MMhW_GcUE9rg9Pgk-U9-qrmpi_EsM','1715545053','erxyjd1d8lvk7jiru','2',1,'2024-05-11 20:17:33','2024-05-11 20:17:33'),(369,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU1MzQxMjIsImV4cCI6MTcxNTYyMDUyMn0.cpn7USptp7DzwbF74SIzODlotNhJCp1ZVw6N8fxUKB8','1715620522','erxyjd1d8lvk7jiru','2',1,'2024-05-12 17:15:22','2024-05-12 17:15:22'),(370,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU1Mzc4NTQsImV4cCI6MTcxNTYyNDI1NH0.8Y8dnCTiOaLcaoMoK3IIAqZldSHh9V_6CEnNJrHLhkg','1715624254','erxyjd1d8lvk7jiru','2',1,'2024-05-12 18:17:34','2024-05-12 18:17:34'),(371,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU1NDMxNzUsImV4cCI6MTcxNTYyOTU3NX0.b_JkI8f5icS0XzTpAWVdiCWeWglj5YMbfpUiWje-zGk','1715629575','erxyjd1d8lvk7jiru','2',1,'2024-05-12 19:46:15','2024-05-12 19:46:15'),(372,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU2MTE4NjIsImV4cCI6MTcxNTY5ODI2Mn0.5pTl6yKNlDXrHUblVi80isV6mzMA1eJo1aE3SWSLGHc','1715698262','erxyjd1d8lvk7jiru','2',1,'2024-05-13 14:51:02','2024-05-13 14:51:02'),(373,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU3MTI3NjAsImV4cCI6MTcxNTc5OTE2MH0.-h9R4plNmQLTKFb9edJFWGA2ox5h_-TuMYKHN0NNgTc','1715799160','erxyjd1d8lvk7jiru','2',1,'2024-05-14 18:52:40','2024-05-14 18:52:40'),(374,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU3Mjc0NDksImV4cCI6MTcxNTgxMzg0OX0.RFvoe5dhRzlTC9ovW6qFeURwYaUfOPP8xQp7cz6lcPo','1715813849','erxyjd1d8lvk7jiru','2',1,'2024-05-14 22:57:29','2024-05-14 22:57:29'),(375,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU3Mjc0NjAsImV4cCI6MTcxNTgxMzg2MH0.JHlQpm9VHl3UeAIpLyKb6fA-DA8Dafo13TGp8XvMxUM','1715813860','erxyjd1d8lvk7jiru','2',1,'2024-05-14 22:57:40','2024-05-14 22:57:40'),(376,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6IjIzMTMiLCJBcGVfVXNlciI6InBlcnR1eiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6eEBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTU3Mjc2MTQsImV4cCI6MTcxNTgxNDAxNH0.P9WjvQO5N35OvG8xYVAcxEcWpLKg_BlMs9ike_KWEt0','1715814014','ahyv45gluc483jo','2',1,'2024-05-14 23:00:14','2024-05-14 23:00:14'),(377,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6IjIzMTMiLCJBcGVfVXNlciI6InBlcnR1eiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6eEBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTU4Njc5NDUsImV4cCI6MTcxNTk1NDM0NX0.xM38RbWb85LM4EJz_SJWR4wf-csw8GKAwBTlPDyS3rU','1715954345','ahyv45gluc483jo','2',1,'2024-05-16 13:59:05','2024-05-16 13:59:05'),(378,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4NjgyMzYsImV4cCI6MTcxNTk1NDYzNn0.H6u1NNOjXH0C0OX1BRec1I4O1Z_6PeFsmKnZQh0o0yA','1715954636','erxyjd1d8lvk7jiru','2',1,'2024-05-16 14:03:56','2024-05-16 14:03:56'),(379,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4NjkxMDcsImV4cCI6MTcxNTk1NTUwN30.ooF7YeFEfnEwlrtl-uAkaxiFDqUufuqWLXRMIWOcHPw','1715955507','erxyjd1d8lvk7jiru','2',1,'2024-05-16 14:18:27','2024-05-16 14:18:27'),(380,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4NzI0OTMsImV4cCI6MTcxNTk1ODg5M30.HCAPSDj2YYbrtknafexGdvXEq8HMm4kYHHcz1DIDuzg','1715958893','erxyjd1d8lvk7jiru','2',1,'2024-05-16 15:14:53','2024-05-16 15:14:53'),(381,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4NzI1NTUsImV4cCI6MTcxNTk1ODk1NX0.eB9I79ty82jTpvbCDEmprsWD500tuCCmox6U0bqczZY','1715958955','erxyjd1d8lvk7jiru','2',1,'2024-05-16 15:15:55','2024-05-16 15:15:55'),(382,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4NzI4MzUsImV4cCI6MTcxNTk1OTIzNX0.EtlpzcFr7M23K8mD_1mpui6PEfbyO9iPnvm5JTvDVOY','1715959235','erxyjd1d8lvk7jiru','2',1,'2024-05-16 15:20:35','2024-05-16 15:20:35'),(383,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4NzI5NjIsImV4cCI6MTcxNTk1OTM2Mn0.ItFySNIY2yb5BvXl8Em4pNfbLbu2wgKaYmexoeUG9dM','1715959362','erxyjd1d8lvk7jiru','2',1,'2024-05-16 15:22:42','2024-05-16 15:22:42'),(384,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6IjIzMTMiLCJBcGVfVXNlciI6InBlcnR1eiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6eEBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTU4NzI5NzIsImV4cCI6MTcxNTk1OTM3Mn0.KymudZm0E4QwhSsSBJia1Khwm1TVWCI7proBkUBfcno','1715959372','ahyv45gluc483jo','2',1,'2024-05-16 15:22:52','2024-05-16 15:22:52'),(385,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4NzI5ODAsImV4cCI6MTcxNTk1OTM4MH0.f6HnNYaZWm7xrh0rtuFkLgGcwmTeBjnLGkF278lddBY','1715959380','erxyjd1d8lvk7jiru','2',1,'2024-05-16 15:23:00','2024-05-16 15:23:00'),(386,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4NzY4MjEsImV4cCI6MTcxNTk2MzIyMX0.ZekYAhcgJ3rawjQtpAm-BaXckdMKlgMZJ9OPK3fnQ-w','1715963221','erxyjd1d8lvk7jiru','2',1,'2024-05-16 16:27:01','2024-05-16 16:27:01'),(387,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4ODY4ODQsImV4cCI6MTcxNTk3MzI4NH0.VE4fEtg9mX2nQl3pDs6AZvPuT4gSlptirdQzlriONAA','1715973284','erxyjd1d8lvk7jiru','2',1,'2024-05-16 19:14:44','2024-05-16 19:14:44'),(388,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4ODc0NTIsImV4cCI6MTcxNTk3Mzg1Mn0.dB2HO47CpU-40Pxe-NO4WVYAklgVFG6eVbPEadkqFrk','1715973852','erxyjd1d8lvk7jiru','2',1,'2024-05-16 19:24:12','2024-05-16 19:24:12'),(389,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4ODc0ODYsImV4cCI6MTcxNTk3Mzg4Nn0.o4QpSpUpdA8ECNLWeeIvxbPgqwrxWKR8uo6E_jNB7l8','1715973886','erxyjd1d8lvk7jiru','2',1,'2024-05-16 19:24:46','2024-05-16 19:24:46'),(390,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTUzNzAsImV4cCI6MTcxNTk4MTc3MH0.ixVjpLCVTjVXxCI3_PSCI9FC3y5-xmGIyYtnSHeMsyk','1715981770','erxyjd1d8lvk7jiru','2',1,'2024-05-16 21:36:10','2024-05-16 21:36:10'),(391,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTgzNzgsImV4cCI6MTcxNTk4NDc3OH0.TSExlqq2fGQwOm8Lk_hjYiDhRNFN9JoFq7C3dWZ8Gzs','1715984778','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:26:18','2024-05-16 22:26:18'),(392,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTgzOTYsImV4cCI6MTcxNTk4NDc5Nn0.lZUo7MwLgAEPAj4lhBcYTCCGdyv8l7jkFcYGGCPznDs','1715984796','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:26:36','2024-05-16 22:26:36'),(393,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTkxOTQsImV4cCI6MTcxNTk4NTU5NH0.gbjlAQo-i3Su_Fwc_rtwx3O7hfxd-91gZfPBr80gjzs','1715985594','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:39:54','2024-05-16 22:39:54'),(394,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTkyMDUsImV4cCI6MTcxNTk4NTYwNX0.00gvCcmE8ZNV1G6lIoyK2J_BZ3xyHtcaYV1VHtZBLcg','1715985605','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:40:05','2024-05-16 22:40:05'),(395,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTk0NjQsImV4cCI6MTcxNTk4NTg2NH0.9XBWos5Mvyy6F-5cjwHJrWmvdElGV-mehU9Ynj-wq8Q','1715985864','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:44:24','2024-05-16 22:44:24'),(396,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTk1NTQsImV4cCI6MTcxNTk4NTk1NH0.DJG0EIXuR3yG3oDoOUrgrytuaDXm4lAl8L6R9LPXKuM','1715985954','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:45:54','2024-05-16 22:45:54'),(397,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTk3NDEsImV4cCI6MTcxNTk4NjE0MX0.sta341X2y51U5H3vYKhMGizet4xmc7IJy-dvyDm-47o','1715986141','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:49:01','2024-05-16 22:49:01'),(398,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTk4MDQsImV4cCI6MTcxNTk4NjIwNH0.zDUdqODA_wYS7hkxf5odbbxTr5l1rytdN5kCsXYRUY4','1715986204','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:50:04','2024-05-16 22:50:04'),(399,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU4OTk4ODQsImV4cCI6MTcxNTk4NjI4NH0.G6yxmKFuuKV2AYY52Sc0QON1ymT9yWdEE9xbgJx4rPA','1715986284','erxyjd1d8lvk7jiru','2',1,'2024-05-16 22:51:24','2024-05-16 22:51:24'),(400,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5MDQwMzgsImV4cCI6MTcxNTk5MDQzOH0.X0jb_MZ1_LDcQ2O64rJ8Qt4Sdr34qTAsGj2wTTprKnI','1715990438','erxyjd1d8lvk7jiru','2',1,'2024-05-17 00:00:38','2024-05-17 00:00:38'),(401,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5MDYxMzYsImV4cCI6MTcxNTk5MjUzNn0.0tpcyWnjheSKKGy-40-EOrZ015tBgYGwgo8mOdvTqlc','1715992536','erxyjd1d8lvk7jiru','2',1,'2024-05-17 00:35:36','2024-05-17 00:35:36'),(402,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5MTIzNDgsImV4cCI6MTcxNTk5ODc0OH0.4j6JVJPguCY2aStWlNjv_5EtPnix0xcbOVLdu64sJkA','1715998748','erxyjd1d8lvk7jiru','2',1,'2024-05-17 02:19:08','2024-05-17 02:19:08'),(403,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5MTIzNTEsImV4cCI6MTcxNTk5ODc1MX0.1zm9YT34uMLx3t3TiZQTgbeQ6I0uSod5vzpSesOM9YM','1715998751','erxyjd1d8lvk7jiru','2',1,'2024-05-17 02:19:11','2024-05-17 02:19:11'),(404,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5MTY3NTksImV4cCI6MTcxNjAwMzE1OX0.fc3RwClgIA0cU51Y4gKRcPCrAw-L3QQsj1Z0lJUyP48','1716003159','erxyjd1d8lvk7jiru','2',1,'2024-05-17 03:32:39','2024-05-17 03:32:39'),(405,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5MjE1ODksImV4cCI6MTcxNjAwNzk4OX0.FX7AnzN7OWOR7cmOm7mEVsrmBtc-ZBAjglVM-lz6Tt8','1716007989','erxyjd1d8lvk7jiru','2',1,'2024-05-17 04:53:09','2024-05-17 04:53:09'),(406,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5NjI3NDUsImV4cCI6MTcxNjA0OTE0NX0.d4mgG7pc78K5EEIbkH5Gx4Ut8q_lgGTquu5jIIZfAok','1716049145','erxyjd1d8lvk7jiru','2',1,'2024-05-17 16:19:05','2024-05-17 16:19:05'),(407,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5NjYzOTEsImV4cCI6MTcxNjA1Mjc5MX0._KOcRkvwtSxqDQ3U5ufOVOCPQys5fw0wvU8JXZDRYgw','1716052791','erxyjd1d8lvk7jiru','2',1,'2024-05-17 17:19:51','2024-05-17 17:19:51'),(408,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTI4OTMsImV4cCI6MTcxNjA3OTI5M30.s25QpmEaGXio3pQfZUv_YJ5A0_ZoR1q3uqkLX0stSfU','1716079293','erxyjd1d8lvk7jiru','2',1,'2024-05-18 00:41:33','2024-05-18 00:41:33'),(409,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTI4OTUsImV4cCI6MTcxNjA3OTI5NX0.gV7AAeSXtA2wF2oXznUyguWK8pTNnSpHMt5bzWZSgaQ','1716079295','erxyjd1d8lvk7jiru','2',1,'2024-05-18 00:41:35','2024-05-18 00:41:35'),(410,'169501','1715995761','erxyjd1d8lvk7jiru','3',1,'2024-05-18 01:19:21','2024-05-18 01:19:21'),(411,'813519','1715995764','erxyjd1d8lvk7jiru','3',1,'2024-05-18 01:19:24','2024-05-18 01:19:24'),(412,'531228','1715995766','erxyjd1d8lvk7jiru','3',1,'2024-05-18 01:19:26','2024-05-18 01:19:26'),(413,'003113','1715995766','erxyjd1d8lvk7jiru','3',1,'2024-05-18 01:19:26','2024-05-18 01:19:26'),(414,'533607','1715995766','erxyjd1d8lvk7jiru','3',1,'2024-05-18 01:19:26','2024-05-18 01:19:26'),(415,'969430','1715995783','erxyjd1d8lvk7jiru','3',1,'2024-05-18 01:19:43','2024-05-18 01:19:43'),(416,'904109','1715995801','erxyjd1d8lvk7jiru','3',1,'2024-05-18 01:20:01','2024-05-18 01:20:01'),(417,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTUyNDgsImV4cCI6MTcxNjA4MTY0OH0.yl2dhV_Gn7wnMrUvxp1bZf8Aep5V-ZcgRczOdFpJ2Bk','1716081648','erxyjd1d8lvk7jiru','2',1,'2024-05-18 01:20:48','2024-05-18 01:20:48'),(418,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTUyNTEsImV4cCI6MTcxNjA4MTY1MX0.FYbEdhugOxGkVVg6GlAjjSyplXleFYqcfH3kuVAKJvM','1716081651','erxyjd1d8lvk7jiru','2',1,'2024-05-18 01:20:51','2024-05-18 01:20:51'),(419,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTY0NjUsImV4cCI6MTcxNjA4Mjg2NX0.jLZOW1lR1PQoNYl7cfsJ5DqiZHlB9fYKGecC9cATFTo','1716082865','erxyjd1d8lvk7jiru','2',1,'2024-05-18 01:41:05','2024-05-18 01:41:05'),(420,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTc3MDIsImV4cCI6MTcxNjA4NDEwMn0.k8vUh5I66j2vNU9mop6A0rPgaoWpiLCOD_GQPAvSeYo','1716084102','erxyjd1d8lvk7jiru','2',1,'2024-05-18 02:01:42','2024-05-18 02:01:42'),(421,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTc3MDYsImV4cCI6MTcxNjA4NDEwNn0.WAOeXJu9KPs3kOto6h0MVxQbGNOB94zkZ6jwKpAW4p0','1716084106','erxyjd1d8lvk7jiru','2',1,'2024-05-18 02:01:46','2024-05-18 02:01:46'),(422,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTc3OTQsImV4cCI6MTcxNjA4NDE5NH0.cJAuD10djff-7HZacfDQZ2X97ZIXoC8GIvaF_bx1LzU','1716084194','erxyjd1d8lvk7jiru','2',1,'2024-05-18 02:03:14','2024-05-18 02:03:14'),(423,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTgwNDcsImV4cCI6MTcxNjA4NDQ0N30.wAyUTAUWhg5PoZgee9bwU_y-Zsv9MKSCCzq0BHnPQCw','1716084447','erxyjd1d8lvk7jiru','2',1,'2024-05-18 02:07:27','2024-05-18 02:07:27'),(424,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTg0MzQsImV4cCI6MTcxNjA4NDgzNH0.6cwvk8mu_Zo-iBZGFKtzPKRGM7GYzn9qjhQcsPMbTgo','1716084834','erxyjd1d8lvk7jiru','2',1,'2024-05-18 02:13:54','2024-05-18 02:13:54'),(425,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTg0ODMsImV4cCI6MTcxNjA4NDg4M30.x-xmnSObv4b4OoMsfiHd0YdE6SW35yxgXp6KQFA70Vk','1716084883','erxyjd1d8lvk7jiru','2',1,'2024-05-18 02:14:43','2024-05-18 02:14:43'),(426,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTg1NTUsImV4cCI6MTcxNjA4NDk1NX0.HjL_FKMDk7vNb5Fyzwu8RYznLIDtuKDRVAtDzAMFGkw','1716084955','erxyjd1d8lvk7jiru','2',1,'2024-05-18 02:15:55','2024-05-18 02:15:55'),(427,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6IjIzMTMiLCJBcGVfVXNlciI6InBlcnR1eiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6eEBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTU5OTkxNTQsImV4cCI6MTcxNjA4NTU1NH0.LMrkPJuievRRQ6gY8S8Lr1pwzJvuCUyYR3JOGU0dkxE','1716085554','ahyv45gluc483jo','2',1,'2024-05-18 02:25:54','2024-05-18 02:25:54'),(428,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6IjIzMTMiLCJBcGVfVXNlciI6InBlcnR1eiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6eEBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTU5OTkxNTgsImV4cCI6MTcxNjA4NTU1OH0.pW3IYQzodS3JSiOx0aYPxMqfFI0CIo5KthLM0e0bgVM','1716085558','ahyv45gluc483jo','2',1,'2024-05-18 02:25:58','2024-05-18 02:25:58'),(429,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTU5OTkxNzAsImV4cCI6MTcxNjA4NTU3MH0.salJLHIySr4agUHK3VLcmgWbS3VHH2CiZEE19GPlucU','1716085570','erxyjd1d8lvk7jiru','2',1,'2024-05-18 02:26:10','2024-05-18 02:26:10'),(430,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6IjIzMTMiLCJBcGVfVXNlciI6InBlcnR1eiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6eEBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTYwNDU5MTQsImV4cCI6MTcxNjEzMjMxNH0.mV80kRBShTDqSpWDLqp39SJ-S-WGjfNR5uyz9vWUAxw','1716132314','ahyv45gluc483jo','2',1,'2024-05-18 15:25:14','2024-05-18 15:25:14'),(431,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6IjIzMTMiLCJBcGVfVXNlciI6InBlcnR1eiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6eEBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTYwNDU5MTksImV4cCI6MTcxNjEzMjMxOX0.ptEuvh-e1jRwr_LsFuj3JoH0K-KhwZJ3969dzoWI4RM','1716132319','ahyv45gluc483jo','2',1,'2024-05-18 15:25:19','2024-05-18 15:25:19'),(432,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NDVnbHVjNDgzam8iLCJOb21fVXNlciI6IjIzMTMiLCJBcGVfVXNlciI6InBlcnR1eiIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6eEBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MTYwNDU5MjcsImV4cCI6MTcxNjEzMjMyN30.QeW1a1nntAB2pmdlPp7dStWQHEAryJkNz5To5ad49OI','1716132327','ahyv45gluc483jo','2',1,'2024-05-18 15:25:27','2024-05-18 15:25:27'),(433,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYwNDU5NzksImV4cCI6MTcxNjEzMjM3OX0.Zbw4LoUL3ze9-UMqiUFBUF1FAbI35rZVAxTzFP8nIgw','1716132379','erxyjd1d8lvk7jiru','2',1,'2024-05-18 15:26:19','2024-05-18 15:26:19'),(434,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYwNTAzODMsImV4cCI6MTcxNjEzNjc4M30.VPspfJkcIAQPjcQqlJ-MU69wVaEYX1idfDaMqQNz7J0','1716136783','erxyjd1d8lvk7jiru','2',1,'2024-05-18 16:39:43','2024-05-18 16:39:43'),(435,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYwODAzNzIsImV4cCI6MTcxNjE2Njc3Mn0.MBRv2O6E2g9Otqi4afegbwGlY3uXpIDj2-FtponL6KU','1716166772','erxyjd1d8lvk7jiru','2',1,'2024-05-19 00:59:32','2024-05-19 00:59:32'),(436,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYxMzE5NDYsImV4cCI6MTcxNjIxODM0Nn0.JquqCUfHOM0u4gmZP_VD90QZBV0jF34x_qJ6BwSvLzw','1716218346','erxyjd1d8lvk7jiru','2',1,'2024-05-19 15:19:06','2024-05-19 15:19:06'),(437,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYxMzI1MjQsImV4cCI6MTcxNjIxODkyNH0.sZb-IX0T4OKsouT35M8M_shqvRXMWgcqLQDxI_pf39k','1716218924','erxyjd1d8lvk7jiru','2',1,'2024-05-19 15:28:44','2024-05-19 15:28:44'),(438,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYyMTQ1ODYsImV4cCI6MTcxNjMwMDk4Nn0.5WMs3RabSEVHJ-6NsunKnaoQSlrkXGmARcCrmHm9ZVM','1716300986','erxyjd1d8lvk7jiru','2',1,'2024-05-20 14:16:26','2024-05-20 14:16:26'),(439,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYyNDU3MTIsImV4cCI6MTcxNjMzMjExMn0.5JVMAbulN9kkrPuL7-88SHXatc9LIAOJNCb83Hx4DCw','1716332112','erxyjd1d8lvk7jiru','2',1,'2024-05-20 22:55:12','2024-05-20 22:55:12'),(440,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYyNDU3MjgsImV4cCI6MTcxNjMzMjEyOH0.7C1x5HmlkJ-NozpnKtsA0UVpllgf-P0OKEpm2AtURas','1716332128','erxyjd1d8lvk7jiru','2',1,'2024-05-20 22:55:28','2024-05-20 22:55:28'),(441,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYyNDU3MzYsImV4cCI6MTcxNjMzMjEzNn0.7U2_hF6jToPCgDx3w3sPV5a8osE5UulykZmBGaf3Qw0','1716332136','erxyjd1d8lvk7jiru','2',1,'2024-05-20 22:55:36','2024-05-20 22:55:36'),(442,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYyNDg1OTYsImV4cCI6MTcxNjMzNDk5Nn0.VMBsrJtIwRlOLv6CI6F3x1ls9E0YsKdG5TASe0aSMPs','1716334996','erxyjd1d8lvk7jiru','2',1,'2024-05-20 23:43:16','2024-05-20 23:43:16'),(443,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYzMTgyNDEsImV4cCI6MTcxNjQwNDY0MX0.u1nNJnlBy_k-0cJdz2dDXVD3AEUPuNJvNGn8OzmAv_4','1716404641','erxyjd1d8lvk7jiru','2',1,'2024-05-21 19:04:01','2024-05-21 19:04:01'),(444,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYzMjM2MDcsImV4cCI6MTcxNjQxMDAwN30.WZrN7tHY50Zu-C8NL415y0Ip2wHLWa9uccRJ4-xryK0','1716410007','erxyjd1d8lvk7jiru','2',1,'2024-05-21 20:33:27','2024-05-21 20:33:27'),(445,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYzODEyODYsImV4cCI6MTcxNjQ2NzY4Nn0.3lfPDOOojctKIH6mQVCsOwYea9IgEHjegQPhw5J39Rc','1716467686','erxyjd1d8lvk7jiru','2',1,'2024-05-22 12:34:46','2024-05-22 12:34:46'),(446,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxZDhsdms3amlydSIsIk5vbV9Vc2VyIjoiV2lybyIsIkFwZV9Vc2VyIjoicGVyZXoiLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjF9LCJpYXQiOjE3MTYzODQxMDYsImV4cCI6MTcxNjQ3MDUwNn0.gpyZIqLbRolnXsP66UNEuix090AmlCLGxxvXQmfKP4E','1716470506','erxyjd1d8lvk7jiru','2',1,'2024-05-22 13:21:46','2024-05-22 13:21:46');

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

insert  into `usuarios`(`Id_User`,`Nom_User`,`Ape_User`,`Tel_User`,`Ema_User`,`Pass_User`,`Id_Rol_FK`,`Fot_User`,`Est_Email_User`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values ('10oPqRs','Valentina','Ruiz','+8887776665','valentina@example.com','valen456',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('1aBcDe','Juan','Pérez','+1234567890','juan@example.com','contraseña123',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('2dEfGh','María','González','+9876543210','maria@example.com','password456',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('3iJkLm','Carlos','López','+5551234567','carlos@example.com','qwerty789',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('4nOpQr','Laura','Martínez','+4449876543','laura@example.com','pass1234',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('5sTuVw','Pedro','Gómez','+6665554444','pedro@example.com','abcde567',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('6xYzAb','Ana','Fernández','+7774443332','ana@example.com','ana12345',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('7CdEfG','Luis','Rodríguez','+3332221111','luis@example.com','lucho567',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('8HgHiJ','Sofía','Hernández','+2221110000','sofia@example.com','sofia789',3,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('9KlMnO','Diego','Díaz','+9998887776','diego@example.com','diego123',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-05-19 13:55:31','2024-05-19 13:55:31'),('ahyv45gluc483jo','2313','pertuz','3012222222','yoinerpertuzx@gmail.com','$2b$10$MqGsaRb8ajQeWH88eTlD/utEzqu1TQxLAAeQkwl4Q.cJAPaR6AG76',2,NULL,1,1,'2024-03-29 03:40:06','2024-05-07 22:19:47'),('ahyv8xwlu7cj900','Yonier','perez','3139839832','yoinerpertuyz@gmail.com','$2b$10$0TZRSwVDWhrvBBArqwp2w.YFj9q5CdEhDfTbEaNc2iAZ36/52Ad2y',2,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-03-25 19:33:52','2024-03-29 02:36:08'),('erxyjd1d8lvk7jiru','Wiro','perez','9856464','yoinerpertuz@gmail.com','$2b$10$PHSzQdyuhAuJFfRSBw1q2u19UvL5oRYQoEj1t01Beqbk6RXc/qWji',1,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,1,'2024-04-29 00:14:50','2024-04-29 00:44:07'),('erxyjd4wglurlw09c','Kilian','Mbbape','561456484','KilianEmbappe@gmail.com','$2b$10$sVSQ3Ha.YBPyKFkzJeFYD.EE123Zb.kXyp/zcvyUQJCJvcwyqBIma',1,NULL,1,1,'2024-04-08 23:51:08','2024-04-08 23:51:08'),('user_001','John','Doe','1234567890','john.doe1@example.com','password123',1,'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',1,0,'2024-05-18 16:20:30','2024-05-18 16:20:30');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
