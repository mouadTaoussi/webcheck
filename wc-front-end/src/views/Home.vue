<template>
  <div class="home">

<!--     <img alt="Vue logo" src./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <homepageheader></homepageheader>
    <landingpage></landingpage>
    <cards></cards>
    <featuressection></featuressection>
    <loginsection></loginsection>
    <redundent_section></redundent_section>
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
import loginsection from '@/components/homepage/loginsection.vue';
import redundent_section from '@/components/homepage/redundent-section.vue'
import homepagefooter from '@/components/homepage/homepagefooter.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    homepageheader,
    landingpage,
    cards,
    featuressection,
    loginsection,
    redundent_section,
    homepagefooter
  },
   created (){
    // If the user already logged in the we wont let him go to the dashboard
    if (window.localStorage.getItem('user_token')) {
      this.$router.push({ path: '/dashboard' });
    }
  },
}
</script>
<style scoped>
</style>