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
				<h1 class="title poppins ">
					Get notified whether<br> your websites are down or not!
				</h1>
				<p class="poppins ">
					You can get notified that your website just got down! to avoid losing traffic
				</p>
				<router-link to="/login">
					<button class="cta local-btn local-btn-success local-mr-2 shadow">Get Started</button>
				</router-link>
				<router-link to="">
					<button class="cta local-btn local-btn-dark shadow">Learn more</button>
				</router-link>
				<!-- brs -->
				<br>
				<br>
				<br>
				<!-- brs -->
				<p id="features-title" class="poppins">
					Here is some of our features down below!
				</p>
				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
				</svg>
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
		/*background-image: url('../.././assets/backgroundLandingPage.jpg');*/
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		background-color: #f2f5fa;/*#f9f9f9 rgba(0,0,0,.1)*/
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
		/*color: white;*/
		/*opacity: .8;*/
		font-weight: bold;
		font-size: 50px;
	}
	.cta {
		padding: 10px 30px 10px 30px;
		font-size: 20px;
	}
	#features-title {
		font-size: 12px;
	}
	@media only screen and (max-width: 600px) {
		.title {
			font-size: 30px;
		}
	}
</style>