/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.32-MariaDB : Database - senalearn
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

insert  into `categorias`(`Id_Cat`,`Nom_Cat`) values ('1','Programación'),('2','Diseño'),('3','Marketing'),('4','Idiomas'),('5','SOFTWARE');

/*Table structure for table `certificados` */

DROP TABLE IF EXISTS `certificados`;

CREATE TABLE `certificados` (
  `Tit_Cert` varchar(255) DEFAULT NULL,
  `Descp_Cert` varchar(255) DEFAULT NULL,
  `Fec_Crea_Cert` date DEFAULT NULL,
  `Firm_Dig_Cert` blob DEFAULT NULL,
  `Id_User_FK` int(11) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `certificados_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`),
  CONSTRAINT `certificados_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `certificados` */

/*Table structure for table `comentarios` */

DROP TABLE IF EXISTS `comentarios`;

CREATE TABLE `comentarios` (
  `Id_Com` int(255) NOT NULL,
  `Id_User_FK` int(11) DEFAULT NULL,
  `Id_Cursos_FK` varchar(100) DEFAULT NULL,
  `Fecha_Pub_Com` date DEFAULT NULL,
  `Desc_Comentario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Com`),
  KEY `Id_User_FK` (`Id_User_FK`),
  KEY `Id_Cursos_FK` (`Id_Cursos_FK`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`Id_Cursos_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `comentarios` */

insert  into `comentarios`(`Id_Com`,`Id_User_FK`,`Id_Cursos_FK`,`Fecha_Pub_Com`,`Desc_Comentario`) values (1,1,'1','2023-01-03','¡Excelente curso!'),(2,2,'2','2023-02-04','Me encantaron las lecciones de diseño.'),(3,3,'3','2023-03-05','Muy informativo. Recomiendo este curso.'),(4,4,'4','2023-04-06','Aprendí mucho sobre vocabulario en inglés.'),(5,5,'5','2023-05-07','Este curso me ayudó a mejorar mis finanzas.');

/*Table structure for table `contenido_modulo` */

DROP TABLE IF EXISTS `contenido_modulo`;

CREATE TABLE `contenido_modulo` (
  `Id_Cont` int(11) NOT NULL,
  `Tip_Cont` varchar(50) DEFAULT NULL,
  `Url_Cont` varchar(255) DEFAULT NULL,
  `Tit_Cont` varchar(255) DEFAULT NULL,
  `Id_Mod_FK` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Cont`),
  KEY `Id_Mod_FK` (`Id_Mod_FK`),
  CONSTRAINT `contenido_modulo_ibfk_1` FOREIGN KEY (`Id_Mod_FK`) REFERENCES `modulocurso` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contenido_modulo` */

insert  into `contenido_modulo`(`Id_Cont`,`Tip_Cont`,`Url_Cont`,`Tit_Cont`,`Id_Mod_FK`) values (1,'Video','https://example.com/video1.mp4','Variables en Programación',1),(2,'Texto',NULL,'Psicología del Color',1),(3,'PDF','https://example.com/marketing-guide.pdf','Análisis de Campañas de Marketing',1),(4,'Audio','https://example.com/english-vocabulary.mp3','Vocabulario Importante',1),(5,'Presentación','https://example.com/financial-planning.ppt','Introducción a la Planificación Financiera',1);

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

insert  into `cursos`(`Id_Cur`,`Nom_Cur`,`Des_Cur`,`Hor_Cont_Total`,`Fech_Crea_Cur`,`Id_Cat_FK`,`Fot_Cur`,`Est_Cur`) values ('1','Curso de Programación Avanzada','Este curso cubre temas avanzados de programación en varios lenguajes.',40,'2024-02-07','1','https://ejemplo.com/imagen_curso.jpg',2),('2','Fundamentos del Diseño Gráfico','Domina los elementos esenciales del diseño gráfico',20,'2023-02-01','2',NULL,2),('3','Estrategias de Marketing Digital','Explora estrategias efectivas de marketing digital',25,'2023-03-01','3',NULL,2),('4','Inglés Intermedio','Desarrolla habilidades en el idioma inglés',15,'2023-04-01','4',NULL,2),('5','Gestión Financiera Personal','Aprende a manejar tus finanzas personales',18,'2023-05-01','5',NULL,2);

/*Table structure for table `evaluacion` */

DROP TABLE IF EXISTS `evaluacion`;

CREATE TABLE `evaluacion` (
  `Id_Eva` int(11) NOT NULL,
  `Tit_Eva` varchar(255) DEFAULT NULL,
  `Des_Eva` varchar(255) DEFAULT NULL,
  `Fec_Crea` date DEFAULT NULL,
  `Fec_Cer` date DEFAULT NULL,
  `Id_Mod_Cur_FK` int(11) DEFAULT NULL,
  `Not_Min_Apr_Eva` decimal(5,2) DEFAULT NULL,
  `Estado_Eval` varchar(50) DEFAULT NULL,
  `Intentos_Eval` int(11) DEFAULT NULL,
  `Tipo_Eval` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_Eva`),
  KEY `Id_Mod_Cur_FK` (`Id_Mod_Cur_FK`),
  CONSTRAINT `evaluacion_ibfk_1` FOREIGN KEY (`Id_Mod_Cur_FK`) REFERENCES `modulocurso` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `evaluacion` */

insert  into `evaluacion`(`Id_Eva`,`Tit_Eva`,`Des_Eva`,`Fec_Crea`,`Fec_Cer`,`Id_Mod_Cur_FK`,`Not_Min_Apr_Eva`,`Estado_Eval`,`Intentos_Eval`,`Tipo_Eval`) values (1,'Examen de Programación','Evalúa tus conocimientos en programación','2023-01-10','2023-01-20',1,70.00,'Activo',3,'Examen'),(2,'Prueba de Diseño Gráfico','Evalúa tus habilidades en diseño gráfico','2023-02-15','2023-02-25',2,75.00,'Activo',2,'Quiz'),(3,'Evaluación de Marketing Digital','Evalúa tu comprensión de estrategias de marketing digital','2023-03-20','2023-03-30',3,80.00,'Activo',3,'Examen');

/*Table structure for table `inscripciones` */

DROP TABLE IF EXISTS `inscripciones`;

CREATE TABLE `inscripciones` (
  `Id_User_FK` int(11) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  `Est_Curso` varchar(50) DEFAULT NULL,
  `fecha_insc` date DEFAULT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `inscripciones` */

insert  into `inscripciones`(`Id_User_FK`,`Id_Cur_FK`,`Est_Curso`,`fecha_insc`) values (1,'1','Inscrito','2023-01-02'),(2,'2','Inscrito','2023-02-03'),(3,'3','Inscrito','2023-03-04'),(4,'4','Inscrito','2023-04-05'),(5,'5','Inscrito','2023-05-06');

/*Table structure for table `localizacion` */

DROP TABLE IF EXISTS `localizacion`;

CREATE TABLE `localizacion` (
  `Id_Loc` int(11) NOT NULL AUTO_INCREMENT,
  `Dir_Ip` varchar(255) DEFAULT NULL,
  `Id_User_FK` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Loc`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `localizacion_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `localizacion` */

insert  into `localizacion`(`Id_Loc`,`Dir_Ip`,`Id_User_FK`) values (1,'192.168.0.1',30),(2,'192.168.0.2',30),(3,'192.168.0.3',30),(4,'192.168.0.4',30),(5,'192.168.0.5',30),(9,'192.168.0.3',30),(10,'192.168.9.1',30);

/*Table structure for table `modulocurso` */

DROP TABLE IF EXISTS `modulocurso`;

CREATE TABLE `modulocurso` (
  `Id_Mod` int(11) NOT NULL,
  `Tit_Mod` varchar(255) DEFAULT NULL,
  `Est_Mod` varchar(50) DEFAULT NULL,
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  `Horas_Cont_Mod` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Mod`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `modulocurso_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `modulocurso` */

insert  into `modulocurso`(`Id_Mod`,`Tit_Mod`,`Est_Mod`,`Id_Cur_FK`,`Horas_Cont_Mod`) values (1,'Conceptos Básicos de Programación','Activo','1',10),(2,'Color y Composición en Diseño','Activo','2',8),(3,'Publicidad en Redes Sociales','Activo','3',12),(4,'Vocabulario en Inglés','Activo','4',6),(5,'Planificación Financiera','Activo','5',9);

/*Table structure for table `objetivos_cursos` */

DROP TABLE IF EXISTS `objetivos_cursos`;

CREATE TABLE `objetivos_cursos` (
  `Id_Objetivo` int(11) NOT NULL,
  `Desc_Objetivo` varchar(255) DEFAULT NULL,
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Objetivo`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `objetivos_cursos_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `objetivos_cursos` */

insert  into `objetivos_cursos`(`Id_Objetivo`,`Desc_Objetivo`,`Id_Cur_FK`) values (1,'Comprender los fundamentos de la programación','1'),(2,'Aplicar principios de diseño en proyectos gráficos','2'),(3,'Implementar estrategias efectivas de marketing digital','3'),(4,'Mejorar habilidades de comunicación en inglés','4'),(5,'Lograr estabilidad financiera personal','5');

/*Table structure for table `opciones` */

DROP TABLE IF EXISTS `opciones`;

CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL,
  `nombre_opcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_opcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `opciones` */

insert  into `opciones`(`id_opcion`,`nombre_opcion`) values (1,'Opción 1'),(2,'Opción 2'),(3,'Opción 3'),(4,'Opción 4'),(5,'Opción 5');

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

insert  into `preguntaseval`(`Id_Preg_Eval`,`Text_Preg_Eval`,`Id_Eval_FK`) values (1,'¿Qué es una variable en programación?',1),(2,'Explique el uso del color en el diseño gráfico.',2),(3,'¿Cuál es el objetivo principal de una campaña de marketing digital?',3),(4,'¿Cómo se dice \"hello\" en inglés?',1),(5,'¿Por qué es importante la planificación financiera personal?',3),(6,'Nueva pregunta 1',1),(7,'Nueva pregunta 2',2),(8,'Nueva pregunta 3',3),(9,'Nueva pregunta 4',1),(10,'Nueva pregunta 5',2);

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

insert  into `respuestaseval`(`Id_Res_Eval`,`Text_Resp_Eval`,`Resp_Correcta_Eval`,`Id_Preg_Eval_FK`) values (1,'Es un espacio de almacenamiento para datos.',1,1),(2,'El color puede transmitir emociones y destacar elementos clave en el diseño.',0,1),(3,'Generar leads y aumentar la visibilidad de la marca.',0,1),(4,'Hola',0,1),(5,'Ayuda a alcanzar metas financieras y garantiza seguridad económica.',1,1);

/*Table structure for table `resultados_evaluacion` */

DROP TABLE IF EXISTS `resultados_evaluacion`;

CREATE TABLE `resultados_evaluacion` (
  `Id_Res_Eval` int(11) NOT NULL,
  `Id_Eval_FK` int(11) DEFAULT NULL,
  `Id_User_FK` int(11) DEFAULT NULL,
  `Puntuacion` decimal(5,2) DEFAULT NULL,
  `Fech_Real_Eval` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Eval_FK` (`Id_Eval_FK`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `resultados_evaluacion_ibfk_1` FOREIGN KEY (`Id_Eval_FK`) REFERENCES `evaluacion` (`Id_Eva`),
  CONSTRAINT `resultados_evaluacion_ibfk_2` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `resultados_evaluacion` */

insert  into `resultados_evaluacion`(`Id_Res_Eval`,`Id_Eval_FK`,`Id_User_FK`,`Puntuacion`,`Fech_Real_Eval`) values (1,1,1,85.00,'2023-01-15 00:00:00'),(2,2,2,90.00,'2023-02-20 00:00:00'),(3,3,3,78.00,'2023-03-25 00:00:00'),(4,1,4,65.00,'2023-04-10 00:00:00'),(5,3,5,92.00,'2023-05-15 00:00:00');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Rol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`Id_Rol`,`Nom_Rol`) values (1,'ESTUDIANTE'),(2,'ADMIN'),(3,'INSTRUCTOR');

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

insert  into `roles_opciones`(`Id_Rol_fk`,`id_opcion_fk`) values (1,1),(1,2),(1,3),(1,4),(2,5);

/*Table structure for table `tokens` */

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `Id_Token` int(11) NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) DEFAULT NULL,
  `Fec_Caducidad` varchar(100) DEFAULT NULL,
  `User_Id_FK` int(11) DEFAULT NULL,
  `Tipo_token` char(1) DEFAULT NULL COMMENT '1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña, 4: Verificar IP',
  PRIMARY KEY (`Id_Token`),
  KEY `Usuario_Id` (`User_Id_FK`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`User_Id_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

insert  into `tokens`(`Id_Token`,`Token`,`Fec_Caducidad`,`User_Id_FK`,`Tipo_token`) values (45,'09ee5bba-ee0d-446a-a31b-8236283a35b9','1700504424',30,'4'),(46,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOjMwLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MDc2NjU5ODMsImV4cCI6MTcwNzY4MDM4M30.oYo3faNo6A-cQgAK1QpPZROJawXxOdEJjmVaxHYYzC4','1707680383',30,'1'),(47,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOjMwLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MDc2Njg2OTQsImV4cCI6MTcwNzY4MzA5NH0.ZyxbG1pz3OdXLl8QfOU0xjhOJ5FY_wMsXjSJzbKm99Q','1707683094',30,'1'),(48,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOjMwLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MDc3NTAwMDIsImV4cCI6MTcwNzc2NDQwMn0.BrRZ6j5wiMJAEl1z4HVta7K-uI8Jf8rOaiZWOGYUldg','1707764402',30,'1'),(49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOjMwLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MDc3NTAyNzgsImV4cCI6MTcwNzc2NDY3OH0.NzqWdioLbOaMUpSczJwYu3cgCwSJAn1aTCmFkWNzkAA','1707764678',30,'1'),(50,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOjMwLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MDc3NTI0NzksImV4cCI6MTcwNzc2Njg3OX0.H_HOM_5GBIdxX-f0crao8KWnrgaWpGWQL8HoXEL3Leo','1707766879',30,'1'),(51,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOjMwLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MDc4NTYzNTAsImV4cCI6MTcwNzg3MDc1MH0.VtUrisMDkjFxLV5pN3isp-40LVqIQIbUz42vNu8b_-g','1707870750',30,'1'),(52,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOjMwLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MDgwMzUzMjEsImV4cCI6MTcwODA0OTcyMX0.2L7LGbdDXRbQvDc4i09JuZtQs5b0qkP3yAYAKKD61nA','1708049721',30,'1'),(53,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOjMwLCJFbWFfVXNlciI6InlvaW5lcnBlcnR1ekBnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjJ9LCJpYXQiOjE3MDgwMzYzOTAsImV4cCI6MTcwODA1MDc5MH0.pUiQeFHEavptrmmVzmFm_3fYIrXUiu0LS1oyxjZCmAk','1708050790',30,'1');

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

insert  into `usuarios`(`Id_User`,`Nom_User`,`Ape_User`,`Tel_User`,`Ema_User`,`Pass_User`,`Id_Rol_FK`,`Fot_User`,`Est_Email_User`) values (1,'Juan','Pérez','123456789','juan@example.com','$2b$10$xOeG/CDmPWOdsZLVPg6P7OIfIlq6EmrS.4Qv2m84mNng4HKeqJ3R2',1,'juan.jpg',1),(2,'María','Gómez','987654321','maria@example.com','$2b$10$xOeG/CDmPWOdsZLVPg6P7OIfIlq6EmrS.4Qv2m84mNng4HKeqJ3R2',1,'maria.jpg',1),(3,'Admin','Admin','999999999','admin@example.com','$2b$10$xOeG/CDmPWOdsZLVPg6P7OIfIlq6EmrS.4Qv2m84mNng4HKeqJ3R2',2,'admin.jpg',1),(4,'Carlos','López','555555555','carlos@example.com','$2b$10$xOeG/CDmPWOdsZLVPg6P7OIfIlq6EmrS.4Qv2m84mNng4HKeqJ3R2',1,'carlos.jpg',1),(5,'Laura','Martínez','666666666','laura@example.com','$2b$10$xOeG/CDmPWOdsZLVPg6P7OIfIlq6EmrS.4Qv2m84mNng4HKeqJ3R2',1,'laura.jpg',1),(30,'YOINER','PERTUZ','3187650354','yoinerpertuz@gmail.com','$2b$10$xOeG/CDmPWOdsZLVPg6P7OIfIlq6EmrS.4Qv2m84mNng4HKeqJ3R2',2,NULL,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
