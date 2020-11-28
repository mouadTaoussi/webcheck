<template>
	<section>
		<div class="landingpage shadow">
			<!-- Alert -->
			<div class="local-container-8 landingpage-alert">
				<alert 
					style="display: none;" 
					type="info" 
					Message="If you stuck know how to take decisions to your audience ! you can try out surveyapp"
					link="https://surveyapp1.herokuapp.com"
				></alert>
			</div>
			<div class="landingpage-content">
				<h1 class="title poppins">
					Get notified whether<br> your websites are down or not!
				</h1>
				<p class="poppins text-white">
					You can get notified that your website just got down! to avoid losing traffic
				</p>
				<router-link to="/login">
					<button class="cta local-btn local-btn-success local-mr-2 shadow">Get Started</button>
				</router-link>
				<router-link to="">
					<button class="cta local-btn local-btn-dark shadow">Learn more</button>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script>
import alert from '../alert.vue';
export default {

  name: 'landingpage',
  components: {
  	alert
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="css" scoped>
	.landingpage {
		background-image: url('../.././assets/backgroundLandingPage.jpg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		/*background-color: rgba(0,255,150,.2);/*#f9f9f9 rgba(0,0,0,.1)*/
		height: 550px;
		border-top: var(--border);
		border-bottom: var(--border);
	}
	.landingpage-alert {
		/*position: sticky;*/
		/*top: 0;*/
		padding-top: 30px;
	}
	.landingpage-content {

		padding-top: 80px;
	}
	.title {
		color: white;
		/*opacity: .8;*/
		font-weight: bold;
		font-size: 50px;
	}
	.cta {
		padding: 10px 30px 10px 30px;
		font-size: 20px;
	}
	@media only screen and (max-width: 600px) {
	
	}
</style>