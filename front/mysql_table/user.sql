CREATE TABLE T_CM_USER(
kakao_id int(11),
nickname varchar(50),
thumbnail_image_url varchar(200),
email varchar(200),
gender varchar(10),
last_login_at datetime,
PRIMARY KEY (kakao_id)
)