<template>
<div class="about">
<link rel ="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<img width=100 src="https://deliver.commons.nicovideo.jp/thumbnail/nc52154?size=l">
<p>This is about page</p>
<p>contact : <a href="github">/aaa</a></p>
<ul class="socialEffect__box">
<li><a class="socialEffect__link icon-instagram" href="#"><i class="fas fa-thumbs-up"></i></a></li>
<li><a class="socialEffect__link icon-facebook" href="#"><i class="fab fa-github"></i></a></li>
<li><a class="socialEffect__link icon-twitter" href="#"><i class="fab fa-twitter"></i></a></li>
<li><a class="socialEffect__link icon-twitter" href="#"><i class="fab fa-twitter"></i></a></li>
</ul>
</div>
</template>

<style>
.about{ padding:12px;}

/* 共通のアイコンエフェクト */
.socialEffect__link {
  margin: 7px;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  transition: transform ease-out 0.2s;
}

.socialEffect__link i{
  color: #fff;
  font-size: 20px;
}

.socialEffect__box { margin:0; padding:0; }
.socialEffect__box li {
  display: inline-block;
}


/* インスタ用アイコン設定 */
.icon-instagram::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: -1;
  transform: scale(0.9);
}
.fab.fa-instagram {
  display: inline-block;
  color: #fff;
}
.icon-instagram:hover {
  background-color:rgb(235, 65, 65) ;
  transform: scale(0.9);
}

/* フェイスブック用アイコン設定 */
.icon-facebook::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: -1;
  transform: scale(0.9);
}
.fab.fa-facebook-f {
  display: inline-block;
  color: #fff;
}
.icon-facebook:hover {
  background: #3b5998;
  transform: scale(0.9);
}

/* ツイッター用アイコン設定 */
.icon-twitter::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: -1;
  transform: scale(0.9);
}
.fab.fa-twitter {
  display: inline-block;
  color: #fff;
}
.icon-twitter:hover {
  background: #00b0ed;
  transform: scale(0.9);
}
</style>
