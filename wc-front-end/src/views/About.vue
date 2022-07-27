<template>
	<section>
		<homepageheader></homepageheader>
		<div class="local-container-4">
	      <!-- brs -->
	      <br>
	      <br>
	      <!-- brs -->
		  <h1 class="text-left">About</h1>
	      <!-- brs -->
	      <br>
	      <br>
	      <br>
	      <!-- brs -->
	      <h4 class="text-left">Who am i?</h4>
	      <p class="text-left">
	        This SaaS was created by a passionate software developer who want to improve the experience while using it, and he handle the technical issues. 
	        The Project is fully open source and anyone can contribute to it, so he can add the feature he want the most, to bring the project into prefessional.

	      </p>
	      <!-- brs -->
	      <br>
	      <br>
	       <!-- brs -->
	      <h4 class="text-left">Contact</h4>
	      <p class="text-left">
	        Email: <a href="mailto:mouadtaoussi0@gmail.com">mouadtaoussi0@gmail.com</a>
	      </p>
	      <div class="float-left">
	      	<a target="_blank" href='https://github.com/mouadTaoussi/'>
				<i class="fab fa-github fa-2x text-dark p-2"></i>
			</a>
			<a target="_blank" href='https://www.instagram.com/mouadtaoussi_/'>
				<i class="fab fa-instagram fa-2x text-dark p-2"></i>
			</a>
			<a target="_blank" href='https://twitter.com/mouadTaoussi2'>
				<i class="fab fa-twitter fa-2x text-dark p-2"></i>
			</a>
		  </div>
	      <!-- brs -->
	      <br>
	      <br>
	      <br>
	      <br>
	      <!-- brs -->
	  </div>
    <homepagefooter></homepagefooter>
	</section>
</template>

<script>
import homepageheader from '@/components/homepage/homepageheader.vue';
import homepagefooter from '@/components/homepage/homepagefooter.vue';
export default {

  name: 'About',
  components: {
  	homepageheader,
    homepagefooter
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>