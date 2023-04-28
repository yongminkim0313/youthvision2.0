drop table T_CM_VIDEO;


CREATE TABLE `T_CM_VIDEO` (
  `video_title` varchar(200) DEFAULT NULL,
  `video_sn` int(2) NOT NULL,
  `atchmnfl_id` int(11) NOT NULL,
  `rgst_dt` datetime NOT NULL,
  `rgst_id` varchar(30) NOT NULL,
  `use_yn`	boolean,
  PRIMARY KEY (`video_sn`)
)