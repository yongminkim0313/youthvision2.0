CREATE TABLE `T_CM_CONECT_LOG` (
  `conect_sn` int(11) NOT NULL AUTO_INCREMENT COMMENT '접속 순번',
  `conect_url` varchar(1000) NOT NULL DEFAULT '' COMMENT '접속 URL',
  `conect_dt` datetime DEFAULT NULL COMMENT '접속 일시',
  `menu_nm` varchar(10) DEFAULT NULL COMMENT '메뉴 명',
  `os_knd` varchar(100) DEFAULT NULL COMMENT 'OS 종류',
  `os_nm` varchar(200) DEFAULT NULL COMMENT 'OS 명',
  `browser_nm` varchar(200) DEFAULT NULL COMMENT '브라우저 명',
  `ip_adres` varchar(100) DEFAULT NULL COMMENT 'IP 주소',
  `ref_url` varchar(2000) DEFAULT NULL COMMENT '참조 URL',
  `prmanent_cookie` varchar(100) DEFAULT NULL COMMENT '영구 쿠키',
  `tmpr_cookie` varchar(100) DEFAULT NULL COMMENT '임시 쿠키',
  PRIMARY KEY (`conect_sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;