<template>
  <div id="app">
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
.news-iconarrow-left:before {
  content: "\ea38";
}
.news-iconarrow-left2:before {
  content: "\ea40";
}
.news-iconarrow-up-left2:before {
  content: "\ea39";
}
html{
  font-size: 100px;
}
body * {
  padding: 0;
  margin: 0;
  font-size: .16rem;
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
.news-item-pic{
  margin-right: 10px;
  position: relative;
  height: .66rem;
  width: 1rem;
}
.news-item-pic img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.nomore{
  font-size: .16rem;
  margin: 10px 0;
}
.news-item-content h4{
  line-height: .2rem;
  font-size: .17rem;
  word-break:break-all;
  text-align: justify;
}
.news-item-content{
  flex:1;
}
.news-item-source{
  font-size: .1rem;
  line-height: .2rem;
  color: #888;
  margin-top: 5px;
}
.news-author{
  float: left;
}

.news-comments{
  float: right;
}
.main-news-item{
  padding: .1rem 0;
  margin: 0 .1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
}
.navitem.select{
  border-bottom: 2px solid #fff!important;
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
