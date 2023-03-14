CREATE TABLE `T_CM_BBS` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `upp_idx` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `contents` varchar(4000) NOT NULL,
  `click_cnt` decimal(10,0) NOT NULL,
  `delyn` varchar(1) NOT NULL DEFAULT 'N',
  `rgst_dt` date NOT NULL,
  `rgst_id` varchar(30) NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;