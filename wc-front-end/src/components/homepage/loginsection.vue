<template>
	<section class="loginsection">
		<div class="loginsection-grid local-container-4">
			<div class="row-text">
				<h1 class="text-white text-left">
					Log in now and try our <strong class="text-white">Service</strong>
				</h1>
				<p class="text-white text-left poppins">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<button 
				style="background-color: var(--primary-app)" 
				class="local-btn float-left local-mr-2 text-white shadow"
				>Get Started</button>
				<button class="local-btn local-btn-dark float-left shadow">Learn more</button>
			</div>
			<div class="row-login local-card shadow local-p-4">
				<div class="login">
					<logincomponent></logincomponent>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import logincomponent from '.././login.vue';

	export default {

	  name: 'loginsection',

	  components: {
	  	logincomponent
	  },

	  data () {
	    return {

	    }
	  }
	}
</script>

<style lang="css" scoped>
.loginsection {
	background-image: url('../.././assets/loginHomePageBackground.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	width: 100%;
	height: 650px;
	margin-top: 40px;
	margin-bottom: 40px;
	padding-top: 150px;
}
.loginsection-grid {
	display: grid;
	grid-template-columns: 50% 50%;
	grid-gap: 20px;
}
/*.loginsection-grid {
	margin-top: 150px;
}*/
.row-text {
	margin-top: 30px;
}
@media only screen and (max-width: 800px) {
	.loginsection {
		background-color: var(--primary-app);
		background-image: url();
		height: auto;
		padding-top: 50px;
		padding-bottom: 50px;

	}
	.loginsection-grid {
		display: grid;
		grid-template-columns: 100%;
	}
}
</style>