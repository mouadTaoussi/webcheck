<template>
  <div id="app">
 
    <router-view/>
    <a class="product-hunt-featured" href="https://www.producthunt.com/posts/webcheck?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-webcheck" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=278060&theme=dark" alt="WebCheck - Get notified whenever some of your websites are down | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
  </div>
</template>

<style>
:root {
  --primary-app : #008272;
  --primary-app-darker : #05544a;
  /*--primary-app : #d83b01;*/
  --border      : .2px solid rgba(0,0,0,.1);
  --rectangle-above-title : red;
  --side-menu-width : 300px;
  /*--primary-app : #da3b01;*/
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.product-hunt-featured {
  position: absolute;
  bottom: 10px;
  right: 10px;
  position: fixed;
}
.darkmode-toggle, .darkmode-layer {
  position: absolute!important;
  bottom: 10px!important;
  right: 10px!important;
  position: fixed!important;
}
.darkmode-toggle {
    z-index: 999;
}
@media only screen and (max-width: 800px) {
  .product-hunt-featured {
    display: none;
  }
}
</style>
