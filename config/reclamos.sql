-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-10-2024 a las 04:25:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reclamos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficina`
--

CREATE TABLE `oficina` (
  `idOficina` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `oficina`
--

INSERT INTO `oficina` (`idOficina`, `nombre`, `idReclamoTipo`, `activo`) VALUES
(1, 'Dpto. de Taller y Servicio Técnico', 1, 1),
(2, 'Dpto. de Garantías', 4, 1),
(3, 'Dpto. de Repuestos y Partes', 6, 1),
(4, 'Dpto. de Facturación', 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamo`
--

CREATE TABLE `reclamo` (
  `idReclamo` int(11) NOT NULL,
  `asunto` varchar(256) NOT NULL,
  `descripcion` varchar(256) DEFAULT NULL,
  `fechaCreado` datetime NOT NULL,
  `fechaFinalizado` datetime DEFAULT NULL,
  `fechaCancelado` datetime DEFAULT NULL,
  `idReclamoEstado` int(11) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `idUsuarioCreador` int(11) NOT NULL,
  `idUsuarioFinalizador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamo`
--

INSERT INTO `reclamo` (`idReclamo`, `asunto`, `descripcion`, `fechaCreado`, `fechaFinalizado`, `fechaCancelado`, `idReclamoEstado`, `idReclamoTipo`, `idUsuarioCreador`, `idUsuarioFinalizador`) VALUES
(5, 'ruido en motor', NULL, '2024-08-19 06:00:00', NULL, NULL, 1, 1, 9, NULL),
(6, 'rotura de  motor ', NULL, '2024-08-19 07:00:00', NULL, NULL, 4, 1, 8, NULL),
(7, 'no frena', NULL, '2024-08-15 07:15:00', NULL, NULL, 1, 2, 8, NULL),
(8, 'ruidos extraños', NULL, '2024-08-15 08:00:00', NULL, NULL, 1, 3, 7, NULL),
(9, 'cristales rayados', NULL, '2024-08-15 09:30:00', NULL, NULL, 1, 4, 7, NULL),
(10, 'matafuego vencido', NULL, '2024-08-15 09:00:00', NULL, NULL, 2, 4, 7, NULL),
(15, 'falla tren delantero', 'empece a notar ruidos molesto', '2024-08-28 19:26:12', NULL, NULL, 1, 1, 12, NULL),
(16, 'Problema en la transmisión', 'El auto tiene fallas al cambiar de marcha.', '2024-10-09 14:30:00', NULL, NULL, 1, 2, 3, NULL),
(17, 'Problema en las bujias', 'El auto tiene fallas.PRUEBA!!', '2024-10-09 14:30:00', NULL, NULL, 1, 2, 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamo_estado`
--

CREATE TABLE `reclamo_estado` (
  `idReclamoEstado` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamo_estado`
--

INSERT INTO `reclamo_estado` (`idReclamoEstado`, `descripcion`, `activo`) VALUES
(1, 'Creado', 1),
(2, 'En Proceso', 1),
(3, 'Cancelado', 1),
(4, 'Finalizado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamo_tipo`
--

CREATE TABLE `reclamo_tipo` (
  `idReclamoTipo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamo_tipo`
--

INSERT INTO `reclamo_tipo` (`idReclamoTipo`, `descripcion`, `activo`) VALUES
(1, 'Falla de motor', 1),
(2, 'Falla de frenos', 1),
(3, 'Falla de suspensión', 1),
(4, 'Aprobación de cobertura', 1),
(5, 'Verificación de términos', 1),
(6, 'Reemplazo de piezas', 1),
(7, 'Reinstalación correcta', 0),
(9, 'Reembolso', 1),
(14, 'tipo reclamos creado en clase', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `apellido` varchar(256) NOT NULL,
  `correoElectronico` varchar(256) NOT NULL,
  `contrasenia` varchar(256) NOT NULL,
  `idTipoUsuario` int(11) NOT NULL,
  `imagen` varchar(256) DEFAULT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `correoElectronico`, `contrasenia`, `idTipoUsuario`, `imagen`, `activo`) VALUES
(1, 'Daenerys', 'Targaryen', 'daetar@correo.com', 'b2803ace294160fd87aa85f826fa8df0c39e77282e0217af680198cef8d9edc3', 1, NULL, 1),
(2, 'Jon', 'Snow', 'jonsno@gmail.com', 'd98e05719dd7fa45547fbc3409eb36881bb8afe963268f7e8f6c2e24e80e58f5', 1, NULL, 1),
(3, 'Tyrion', 'Lannister', 'tyrlan@correo.com', '9f9e51def43bc759ac35cd56ce8514a2c4dd0fbc9bfbb5bc97ce691f65bf5bb9', 2, NULL, 1),
(4, 'Margaery', 'Tyrell', 'martyr@correo.com', 'ad872b4820b164b7a25695ff77d0f6e5df812c6f9944d1d21461f57f099bce57', 2, NULL, 1),
(5, 'Samwell', 'Tarly', 'samtar@correo.com', 'a8487f98ab106b0ed2129a5446610b5ccba6b4bf7a937ef5194ce2f2a4c11bde', 2, NULL, 1),
(6, 'Jeor', 'Mormont', 'jeomor@correo.com', 'ef0b04a6eba2d3cde7b32f53b2c13b509d198189cb9da2080c7259948cbc63ca', 2, NULL, 1),
(7, 'Khal', 'Drogo', 'khadro@gmail.com', '84507cc9012d1c900abb65663e3b62633cb14073aa6569b60efa2b75cf431b37', 3, NULL, 1),
(8, 'Catelyn', 'Stark', 'catsta@correo.com', '229e7f7177d0e221f889eb8d3e2b422eae42adc403412fb25718b84fe5fff4d7', 3, NULL, 1),
(9, 'Yara', 'Greyjoy', 'yargre@correo.com', '097c61d6a3ee77e4f4a9d2c6b6fb284ee927a0c315f30172f685e4659a4f621b', 3, NULL, 1),
(12, 'Jose', 'Battaglia', 'josbat@gmail.com', 'c30d798692466db470eafebfb04c272b359c80f2ebbac6f51f6e9ff9b6e3177b', 3, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_oficina`
--

CREATE TABLE `usuario_oficina` (
  `idUsuarioOficina` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idOficina` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario_oficina`
--

INSERT INTO `usuario_oficina` (`idUsuarioOficina`, `idUsuario`, `idOficina`, `activo`) VALUES
(1, 3, 1, 1),
(2, 4, 2, 1),
(3, 8, 3, 1),
(4, 9, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_tipo`
--

CREATE TABLE `usuario_tipo` (
  `idUsuarioTipo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario_tipo`
--

INSERT INTO `usuario_tipo` (`idUsuarioTipo`, `descripcion`, `activo`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Cliente', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `oficina`
--
ALTER TABLE `oficina`
  ADD PRIMARY KEY (`idOficina`),
  ADD UNIQUE KEY `idOficina` (`idOficina`),
  ADD KEY `oficina_fk2` (`idReclamoTipo`);

--
-- Indices de la tabla `reclamo`
--
ALTER TABLE `reclamo`
  ADD PRIMARY KEY (`idReclamo`),
  ADD UNIQUE KEY `idReclamo` (`idReclamo`),
  ADD KEY `reclamo_fk6` (`idReclamoEstado`),
  ADD KEY `reclamo_fk7` (`idReclamoTipo`),
  ADD KEY `reclamo_fk8` (`idUsuarioCreador`),
  ADD KEY `reclamo_fk9` (`idUsuarioFinalizador`);

--
-- Indices de la tabla `reclamo_estado`
--
ALTER TABLE `reclamo_estado`
  ADD PRIMARY KEY (`idReclamoEstado`),
  ADD UNIQUE KEY `idReclamoEstado` (`idReclamoEstado`);

--
-- Indices de la tabla `reclamo_tipo`
--
ALTER TABLE `reclamo_tipo`
  ADD PRIMARY KEY (`idReclamoTipo`),
  ADD UNIQUE KEY `idReclamoTipo` (`idReclamoTipo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`),
  ADD KEY `usuario_fk5` (`idTipoUsuario`);

--
-- Indices de la tabla `usuario_oficina`
--
ALTER TABLE `usuario_oficina`
  ADD PRIMARY KEY (`idUsuarioOficina`),
  ADD UNIQUE KEY `idUsuarioOficina` (`idUsuarioOficina`),
  ADD KEY `usuariosOficina_fk1` (`idUsuario`),
  ADD KEY `usuariosOficina_fk2` (`idOficina`);

--
-- Indices de la tabla `usuario_tipo`
--
ALTER TABLE `usuario_tipo`
  ADD PRIMARY KEY (`idUsuarioTipo`),
  ADD UNIQUE KEY `idUsuarioTipo` (`idUsuarioTipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `oficina`
--
ALTER TABLE `oficina`
  MODIFY `idOficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reclamo`
--
ALTER TABLE `reclamo`
  MODIFY `idReclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `reclamo_estado`
--
ALTER TABLE `reclamo_estado`
  MODIFY `idReclamoEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reclamo_tipo`
--
ALTER TABLE `reclamo_tipo`
  MODIFY `idReclamoTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuario_oficina`
--
ALTER TABLE `usuario_oficina`
  MODIFY `idUsuarioOficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario_tipo`
--
ALTER TABLE `usuario_tipo`
  MODIFY `idUsuarioTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `oficina`
--
ALTER TABLE `oficina`
  ADD CONSTRAINT `oficina_fk2` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamo_tipo` (`idReclamoTipo`);

--
-- Filtros para la tabla `reclamo`
--
ALTER TABLE `reclamo`
  ADD CONSTRAINT `reclamo_fk6` FOREIGN KEY (`idReclamoEstado`) REFERENCES `reclamo_estado` (`idReclamoEstado`),
  ADD CONSTRAINT `reclamo_fk7` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamo_tipo` (`idReclamoTipo`),
  ADD CONSTRAINT `reclamo_fk8` FOREIGN KEY (`idUsuarioCreador`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `reclamo_fk9` FOREIGN KEY (`idUsuarioFinalizador`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_fk5` FOREIGN KEY (`idTipoUsuario`) REFERENCES `usuario_tipo` (`idUsuarioTipo`);

--
-- Filtros para la tabla `usuario_oficina`
--
ALTER TABLE `usuario_oficina`
  ADD CONSTRAINT `usuarioOficina_fk1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `usuarioOficina_fk2` FOREIGN KEY (`idOficina`) REFERENCES `oficina` (`idOficina`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
