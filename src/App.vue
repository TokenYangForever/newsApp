<template>
  <div id="app">
    <div class="headnav">
      <div class="topItems">
        <span class="topnav-search"><i class='news-iconsearch'></i></span>
        <span class="topnav-menu"><i class="news-iconmenu"></i></span>
      </div>
      <div class="flexbox navul">
        <div class="flex1 navitem">推荐</div>
        <div class="flex1 navitem">国际</div>
        <div class="flex1 navitem">国内</div>
        <div class="flex1 navitem">社会</div>
        <div class="flex1 navitem">军事</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@font-face {
  font-family: 'icomoon';
  src:  url('fonts/icomoon.eot?5cra4k');
  src:  url('fonts/icomoon.eot?5cra4k#iefix') format('embedded-opentype'),
        url('fonts/icomoon.ttf?5cra4k') format('truetype'),
        url('fonts/icomoon.woff?5cra4k') format('woff'),
        url('fonts/icomoon.svg?5cra4k#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

i {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.news-iconsearch:before {
  content: "\e986";
}
.news-iconmenu:before {
  content: "\e9bd";
}
.news-iconsmile:before {
  content: "\e9e1";
}
html{
  font-size: 100px;
}
@media screen and (max-width: 360px){
  html {
    font-size: 90px;
  }
}
*{
  margin: 0;
  padding: 0;
}
div{
  box-sizing: border-box;
}
.topnav-search{
  padding: 7px;
  top: 7px;
  right: .45rem;
  font-size: .2rem;
  position: absolute;
}
.topnav-menu{
  padding: 7px;
  top: 5px;
  right: 5px;
  font-size: .24rem;
  position: absolute;
}
.topItems{
  position: relative;
  border-bottom: 1px solid #5dabf0;
  height: 49px;
}
.navul{
  height: 40px;
  line-height: 40px;
}
.headnav {
  position: fixed;
  top: 0;
  width: 100%;
  color: #c2daf8;
  text-align: center;
  background-color: #3e98f0;
  z-index: 11
}
.navitem{
  height: inherit;
  font-size: .16rem
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.flexbox{
  display: flex;
}
.flex1{
  flex:1;
  -webkit-box-flex: 1;
}

</style>
