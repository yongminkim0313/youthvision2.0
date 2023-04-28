CREATE TABLE `T_CM_BANNER` (
  `banner_id` int(11) NOT NULL AUTO_INCREMENT,
  `banner_title` varchar(100) NOT NULL,
  `banner_contents` varchar(4000) NOT NULL,
  `banner_begin_de` varchar(8) NOT NULL,
  `banner_end_de` varchar(8) NOT NULL,
  `atchmnfl_id` int(11) DEFAULT NULL,
  `delyn` varchar(1) NOT NULL DEFAULT 'N',
  `rgst_dt` datetime NOT NULL,
  `rgst_id` varchar(30) NOT NULL,
  PRIMARY KEY (`banner_id`)
) 

select banner_id, banner_title, banner_contents, banner_begin_de, banner_end_de, atchmnfl_id, rgst_dt, rgst_id 
from T_CM_BANNER A
left outer join T_CM_ATCHMNFL B on A.atchmnfl_id = B.atchmnfl_id
where banner_id = #{bannerId}

insert into T_CM_BANNER
    banner_id, banner_title, banner_contents, banner_begin_de, banner_end_de, atchmnfl_id, rgst_dt, rgst_id 
values(
    #{bannerId}, #{bannerTitle}, #{bannerContents}, #{bannerBeginDe}, #{bannerEndDe}, #{atchmnflId}, now(), #{kakaoId} 
)

update T_CM_BANNER set
    banner_title = #{bannerTitle},
    banner_contents = #{bannerContents},
    banner_begin_de = #{bannerBeginDe},
    banner_end_de = #{bannerEndDe},
    atchmnfl_id = #{atchmnflId},
where banner_id = #{bannerId}