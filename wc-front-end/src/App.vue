<template>
  <div id="app">
 
    <router-view/>
  </div>
</template>

<style>
:root {
  --primary-app : #008272;
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
</style>
