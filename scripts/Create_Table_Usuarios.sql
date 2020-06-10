CREATE TABLE `controlApp`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `perfil` VARCHAR(1) NOT NULL,
  `habilitado` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`id`));
