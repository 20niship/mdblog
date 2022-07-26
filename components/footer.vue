<template>
<footer>
  <ul class="footer-menu">
      <li><a href="/">home</a></li>
      <li><a href="/about">about</a></li>
      <li><a href="/content">contact</a></li>
      <li><a href="/follow">follow</a></li>
  </ul>
  <p class="footer-copyright">&copy;all rights reserved by webcampnavi.</p>
</footer>
</template>

<style scoped>
footer {
  margin: 0;
  padding: 5px;
  background-color: #000;
  color: #000;
  text-align: center;
  width: 100%;
  height: 100px;
}

footer *{ color:#fff; }

ul.footer-menu li a {
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: none;
  color: #fff;
  padding: 8px 8px;
  border-right: none;
}

ul.footer-menu li {
  display: block;
}

.footer-copyright{
  font-size: 0.9rem;
}

@media screen and (min-width: 670px) {
    footer {
        margin: 0;
        padding: 5px;
        width: 100%;
        text-align: center;
    }
    ul.footer-menu li a {
        font-size: 15px;
        margin: 0px;
        border-right: solid 1px #000;
        border-left: solid 1px #000;
    }
    ul.footer-menu li {
        display: inline;
    }
}

</style>
