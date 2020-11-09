<template>
  <div class="home">
<!--     <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <homepageheader></homepageheader>
    <landingpage></landingpage>
    <cards></cards>
    <div class="undisplayable">
      <featuressection></featuressection>
    </div>
    <homepagefooter></homepagefooter>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import homepageheader from '@/components/homepage/homepageheader.vue';
import landingpage from '@/components/homepage/landingpage.vue';
import cards from '@/components/homepage/cards.vue';
import featuressection from '@/components/homepage/featuressection.vue';
import homepagefooter from '@/components/homepage/homepagefooter.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    homepageheader,
    landingpage,
    cards,
    featuressection,
    homepagefooter
  }
}
</script>
<style scoped>
  @media only screen and (max-width: 800px) {
    .undisplayable {
      display: none!important;
    }
  }
</style>