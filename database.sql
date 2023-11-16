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

/*Table structure for table `localizacion` */

DROP TABLE IF EXISTS `localizacion`;

CREATE TABLE `localizacion` (
  `Id_Loc` int(11) NOT NULL AUTO_INCREMENT,
  `Dir_Ip` varchar(255) DEFAULT NULL,
  `Id_User_FK` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Loc`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `localizacion_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `localizacion` */

insert  into `localizacion`(`Id_Loc`,`Dir_Ip`,`Id_User_FK`) values (9,'192.168.0.3',30);

/*Table structure for table `opciones` */

DROP TABLE IF EXISTS `opciones`;

CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL,
  `nombre_opcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_opcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `opciones` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Rol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`Id_Rol`,`Nom_Rol`) values (1,'ESTUDIANTE'),(2,'ADMIN');

/*Table structure for table `roles_opciones` */

DROP TABLE IF EXISTS `roles_opciones`;

CREATE TABLE `roles_opciones` (
  `Id_Rol_fk` int(11) NOT NULL,
  `id_opcion_fk` int(11) NOT NULL,
  PRIMARY KEY (`Id_Rol_fk`,`id_opcion_fk`),
  KEY `id_opcion_fk` (`id_opcion_fk`),
  CONSTRAINT `roles_opciones_ibfk_2` FOREIGN KEY (`id_opcion_fk`) REFERENCES `opciones` (`id_opcion`),
  CONSTRAINT `roles_opciones_ibfk_3` FOREIGN KEY (`Id_Rol_fk`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles_opciones` */

/*Table structure for table `tokens` */

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `Id_Token` int(11) NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) DEFAULT NULL,
  `Fec_Caducidad` varchar(100) DEFAULT NULL,
  `User_Id_FK` int(11) DEFAULT NULL,
  `Tipo_token` char(1) DEFAULT NULL COMMENT '1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña',
  PRIMARY KEY (`Id_Token`),
  KEY `Usuario_Id` (`User_Id_FK`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`User_Id_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

insert  into `tokens`(`Id_Token`,`Token`,`Fec_Caducidad`,`User_Id_FK`,`Tipo_token`) values (4,'22d380b1-34b7-439f-bd22-3b49b80d92df','1700095486',30,'2');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `Id_User` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_User` varchar(255) DEFAULT NULL,
  `Ape_User` varchar(255) DEFAULT NULL,
  `Tel_User` varchar(20) DEFAULT NULL,
  `Ema_User` varchar(255) DEFAULT NULL,
  `Pass_User` varchar(255) DEFAULT NULL,
  `Id_Rol_FK` int(11) DEFAULT NULL,
  `Fot_User` varchar(255) DEFAULT NULL,
  `Est_Email_User` int(1) DEFAULT 0,
  PRIMARY KEY (`Id_User`),
  KEY `Id_Rol_FK` (`Id_Rol_FK`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_Rol_FK`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuarios` */

insert  into `usuarios`(`Id_User`,`Nom_User`,`Ape_User`,`Tel_User`,`Ema_User`,`Pass_User`,`Id_Rol_FK`,`Fot_User`,`Est_Email_User`) values (30,'YOINER','PERTUZ','3187650354','yoinerpertuz@gmail.com','$2b$10$xOeG/CDmPWOdsZLVPg6P7OIfIlq6EmrS.4Qv2m84mNng4HKeqJ3R2',2,NULL,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
