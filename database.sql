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
  PRIMARY KEY (`Id_Cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categorias` */

insert  into `categorias`(`Id_Cat`,`Nom_Cat`) values 
('1','Programación'),
('2','mamawebos'),
('2fquk70wlt28m5c0','desarrollo web'),
('2fquk70wlt28mn9b','diseño gráfico'),
('2fquk70wlt28muiz','marketing digital'),
('2fquk70wlt28n9fi','negocios y emprendimiento'),
('2fquk70wlt28nixt','ciencia de datos'),
('2fquk70wlt28np26','arte y creatividad'),
('2fquk70wlt28ogue','salud y bienestar'),
('2fquk70wlt28ors4','cocina y gastronomía'),
('2fquk73olt36rfar','petristas'),
('3','Marketing'),
('4','Idiomas'),
('5','SOFTWARE'),
('ahyv6j0lt7mmmac','lolala');

/*Table structure for table `certificados` */

DROP TABLE IF EXISTS `certificados`;

CREATE TABLE `certificados` (
  `Tit_Cert` varchar(255) DEFAULT NULL,
  `Descp_Cert` varchar(255) DEFAULT NULL,
  `Fec_Crea_Cert` date DEFAULT NULL,
  `Firm_Dig_Cert` blob DEFAULT NULL,
  `Id_User_FK` varchar(100) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
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
  PRIMARY KEY (`Id_Com`),
  KEY `Id_User_FK` (`Id_User_FK`),
  KEY `Id_Cursos_FK` (`Id_Cursos_FK`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`Id_Cursos_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `comentarios_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `comentarios` */

/*Table structure for table `contenido_modulo` */

DROP TABLE IF EXISTS `contenido_modulo`;

CREATE TABLE `contenido_modulo` (
  `Id_Cont` varchar(100) NOT NULL,
  `Tip_Cont` int(50) DEFAULT NULL COMMENT '1:audio, 2:video, 3: texto, 4:documento',
  `Url_Cont` varchar(255) DEFAULT NULL,
  `Tit_Cont` varchar(255) DEFAULT NULL,
  `Id_Mod_FK` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Cont`),
  KEY `Id_Mod_FK` (`Id_Mod_FK`),
  CONSTRAINT `contenido_modulo_ibfk_1` FOREIGN KEY (`Id_Mod_FK`) REFERENCES `modulocurso` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contenido_modulo` */

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
  PRIMARY KEY (`Id_Cur`),
  KEY `Id_Cat_FK` (`Id_Cat_FK`),
  CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`Id_Cat_FK`) REFERENCES `categorias` (`Id_Cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cursos` */

insert  into `cursos`(`Id_Cur`,`Nom_Cur`,`Des_Cur`,`Hor_Cont_Total`,`Fech_Crea_Cur`,`Id_Cat_FK`,`Fot_Cur`,`Est_Cur`) values 
('1','Curso de Programación Avanzada','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-07','1','https://ejemplo.com/imagen_curso.jpg',2),
('2','Fundamentos del Diseño Gráfico','Domina los elementos esenciales del diseño gráfico',40,'2023-02-01','2',NULL,2),
('2fquk2aclt1pzzry','Curso de COSTURA','Este curso cubre temas avanzados de COSTURA.',100,'2024-02-07','4','https://ejemplo.com/imagen_curso.jpg',1),
('2fquk3a8lt1q1ddf','Curso de COSTURA','Este curso cubre temas avanzados de COSTURA.',100,'2024-02-07','4','https://ejemplo.com/imagen_curso.jpg',1),
('2fquk3eklt3iqtu1','edsfdsfdf','dsfsdfdsfdsfdf',10,'2024-02-07','1','fdsdfdsfdsfsdf',1),
('2fquk5t0lt1q0tbv','Curso de COSTURA','Este curso cubre temas avanzados de COSTURA.',100,'2024-02-07','4','https://ejemplo.com/imagen_curso.jpg',1),
('2fqukuklt1puwas','Curso de COSTURA','Este curso cubre temas avanzados de COSTURA.',100,'2024-02-07','4','https://ejemplo.com/imagen_curso.jpg',1),
('3','Estrategias de Marketing Digital','Explora estrategias efectivas de marketing digital',40,'2023-03-01','3',NULL,2),
('4','Inglés Intermedio','Desarrolla habilidades en el idioma inglés',15,'2023-04-01','4',NULL,2),
('5','Gestión Financiera Personal','Aprende a manejar tus finanzas personales',18,'2023-05-01','5',NULL,2),
('ahyv2bslt0x9d1j','Curso de Programación Avanzada','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-05','1','https://ejemplo.com/imagen_curso.jpg',1),
('ahyv5bolsxp9nxs','Costura Basica','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-05','1','https://ejemplo.com/imagen_curso.jpg',1),
('ahyv8bslsxtrcct','Costura Basica','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-05','1','https://ejemplo.com/imagen_curso.jpg',1);

/*Table structure for table `evaluacion` */

DROP TABLE IF EXISTS `evaluacion`;

CREATE TABLE `evaluacion` (
  `Id_Eva` int(11) NOT NULL,
  `Tit_Eva` varchar(255) DEFAULT NULL,
  `Des_Eva` varchar(255) DEFAULT NULL,
  `Fec_Crea` date DEFAULT NULL,
  `Fec_Cer` date DEFAULT NULL,
  `Id_Mod_Cur_FK` varchar(100) DEFAULT NULL,
  `Not_Min_Apr_Eva` decimal(5,2) DEFAULT NULL,
  `Estado_Eval` varchar(50) DEFAULT NULL,
  `Intentos_Eval` int(11) DEFAULT NULL,
  `Tipo_Eval` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_Eva`),
  KEY `Id_Mod_Cur_FK` (`Id_Mod_Cur_FK`),
  CONSTRAINT `evaluacion_ibfk_1` FOREIGN KEY (`Id_Mod_Cur_FK`) REFERENCES `modulocurso` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `evaluacion` */

/*Table structure for table `inscripciones` */

DROP TABLE IF EXISTS `inscripciones`;

CREATE TABLE `inscripciones` (
  `Id_User_FK` varchar(100) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  `Est_Curso` varchar(50) DEFAULT NULL,
  `fecha_insc` date DEFAULT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `inscripciones_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `inscripciones` */

/*Table structure for table `localizacion` */

DROP TABLE IF EXISTS `localizacion`;

CREATE TABLE `localizacion` (
  `Id_Loc` int(11) NOT NULL AUTO_INCREMENT,
  `Dir_Ip` varchar(255) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Loc`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `localizacion_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `localizacion` */

insert  into `localizacion`(`Id_Loc`,`Dir_Ip`,`Id_User_FK`) values 
(41,'192.168.0.1','ahyv6wlt7qkine'),
(42,'192.168.1.6','ahyv6wlt7qkine'),
(43,'192.178.4.44','ahyv6wlt7qkine');

/*Table structure for table `modulocurso` */

DROP TABLE IF EXISTS `modulocurso`;

CREATE TABLE `modulocurso` (
  `Id_Mod` varchar(100) NOT NULL,
  `Tit_Mod` varchar(255) DEFAULT NULL,
  `Est_Mod` int(1) DEFAULT NULL COMMENT '0: creado, 1:activo, 2: bloqueado',
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  `Horas_Cont_Mod` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Mod`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `modulocurso_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `modulocurso` */

/*Table structure for table `objetivos_cursos` */

DROP TABLE IF EXISTS `objetivos_cursos`;

CREATE TABLE `objetivos_cursos` (
  `Id_Objetivo` varchar(100) NOT NULL,
  `Desc_Objetivo` varchar(255) DEFAULT NULL,
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
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
  PRIMARY KEY (`id_opcion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `opciones` */

insert  into `opciones`(`id_opcion`,`nombre_opcion`) values 
(1,'lolala'),
(2,'lilala');

/*Table structure for table `preguntaseval` */

DROP TABLE IF EXISTS `preguntaseval`;

CREATE TABLE `preguntaseval` (
  `Id_Preg_Eval` int(11) NOT NULL,
  `Text_Preg_Eval` varchar(255) DEFAULT NULL,
  `Id_Eval_FK` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Preg_Eval`),
  KEY `Id_Eval_FK` (`Id_Eval_FK`),
  CONSTRAINT `preguntaseval_ibfk_1` FOREIGN KEY (`Id_Eval_FK`) REFERENCES `evaluacion` (`Id_Eva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `preguntaseval` */

/*Table structure for table `respuestaseval` */

DROP TABLE IF EXISTS `respuestaseval`;

CREATE TABLE `respuestaseval` (
  `Id_Res_Eval` int(11) NOT NULL,
  `Text_Resp_Eval` varchar(255) DEFAULT NULL,
  `Resp_Correcta_Eval` tinyint(1) DEFAULT NULL,
  `Id_Preg_Eval_FK` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Preg_Eval_FK` (`Id_Preg_Eval_FK`),
  CONSTRAINT `respuestaseval_ibfk_1` FOREIGN KEY (`Id_Preg_Eval_FK`) REFERENCES `preguntaseval` (`Id_Preg_Eval`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `respuestaseval` */

/*Table structure for table `resultados_evaluacion` */

DROP TABLE IF EXISTS `resultados_evaluacion`;

CREATE TABLE `resultados_evaluacion` (
  `Id_Res_Eval` int(11) NOT NULL,
  `Id_Eval_FK` int(11) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Puntuacion` decimal(5,2) DEFAULT NULL,
  `Fech_Real_Eval` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Eval_FK` (`Id_Eval_FK`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `resultados_evaluacion_ibfk_1` FOREIGN KEY (`Id_Eval_FK`) REFERENCES `evaluacion` (`Id_Eva`),
  CONSTRAINT `resultados_evaluacion_ibfk_2` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `resultados_evaluacion` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Rol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`Id_Rol`,`Nom_Rol`) values 
(1,'ESTUDIANTE'),
(2,'ADMIN'),
(3,'INSTRUCTOR'),
(6,'VOCERO');

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
  `User_Id_FK` varchar(100) DEFAULT NULL,
  `Tipo_token` char(1) DEFAULT NULL COMMENT '1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña, 4: Verificar IP',
  PRIMARY KEY (`Id_Token`),
  KEY `Usuario_Id` (`User_Id_FK`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`User_Id_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

insert  into `tokens`(`Id_Token`,`Token`,`Fec_Caducidad`,`User_Id_FK`,`Tipo_token`) values 
(132,'207177','1709242624','ahyv6wlt7qkine','2'),
(133,'840892','1709243437','ahyv6wlt7qkine','4'),
(145,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NndsdDdxa2luZSIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcwOTM5NjY1MiwiZXhwIjoxNzA5NDExMDUyfQ.VroqlHRbwu8NEsf7R-1Mzw8Qq0aGgsHB1ubn_VtQd0c','1709411052','ahyv6wlt7qkine','1'),
(213,'xdfff','27-02-2023',NULL,'1'),
(214,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJhaHl2NndsdDdxa2luZSIsIkVtYV9Vc2VyIjoieW9pbmVycGVydHV6QGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6Mn0sImlhdCI6MTcwOTQ3NjcwNywiZXhwIjoxNzA5NDkxMTA3fQ._Di9L5L5dWYyJAo9w8DEXdkWH43I8Vlqm6xoo7RTOlM','1709491107','ahyv6wlt7qkine','1');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `Id_User` varchar(100) NOT NULL,
  `Nom_User` varchar(255) DEFAULT NULL,
  `Ape_User` varchar(255) DEFAULT NULL,
  `Tel_User` varchar(20) DEFAULT NULL,
  `Ema_User` varchar(255) DEFAULT NULL,
  `Pass_User` varchar(255) DEFAULT NULL,
  `Id_Rol_FK` int(11) DEFAULT NULL,
  `Fot_User` varchar(255) DEFAULT NULL,
  `Est_Email_User` int(1) DEFAULT 0 COMMENT '0: No verificado, 1: verificado',
  PRIMARY KEY (`Id_User`),
  KEY `Id_Rol_FK` (`Id_Rol_FK`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_Rol_FK`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuarios` */

insert  into `usuarios`(`Id_User`,`Nom_User`,`Ape_User`,`Tel_User`,`Ema_User`,`Pass_User`,`Id_Rol_FK`,`Fot_User`,`Est_Email_User`) values 
('ahyv6wlt7qkine','YOINER','PERTUZ',NULL,'yoinerpertuz@gmail.com','$2b$10$mHcGTUCOGvIge8euSLfGA.ydTVcxNO7neqEvtMCITOdMFWQeu4lGK',2,NULL,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
