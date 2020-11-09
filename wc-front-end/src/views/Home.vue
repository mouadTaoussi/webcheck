<template>
  <div class="home">
<!--     <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <homepageheader></homepageheader>
    <landingpage></landingpage>
    <cards></cards>
    <featuressection></featuressection>
    <footer></footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import homepageheader from '@/components/homepage/homepageheader.vue';
import landingpage from '@/components/homepage/landingpage.vue';
import cards from '@/components/homepage/cards.vue';
import featuressection from '@/components/homepage/featuressection.vue';
import footer from '@/components/homepage/footer.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    homepageheader,
    landingpage,
    cards,
    featuressection,
    footer
  }
}
</script>
