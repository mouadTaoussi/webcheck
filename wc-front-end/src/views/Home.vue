<template>
  <div class="home">
<!--     <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <homepageheader></homepageheader>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import homepageheader from '@/components/homepageheader.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    homepageheader
  }
}
</script>
