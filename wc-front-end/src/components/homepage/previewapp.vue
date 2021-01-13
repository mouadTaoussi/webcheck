<template>
	<section>
		<div class="previewapp">
			<!-- <img class="previewapp-app" src="../.././assets/previewapp.png"> -->
			<h2>
				<strong class="title text-white">
					You can get a full report about your websites performance and speed
				</strong>
			</h2>
			<p class="text-white poppins">Get a graph that represents your websites speed over last 10 days!</p>
			<router-link to="/login">
				<button class="local-btn bg-light text-dark local-shadow local-m-2">Log in</button>
			</router-link>
			<router-link to="/register">
				<button class="local-btn bg-light text-dark local-shadow local-m-2">Register</button>
			</router-link>
			<div class="previewapp-image"></div>
		</div>
	</section>
</template>

<script>
export default {

  name: 'previewapp',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.previewapp {
		background-color: #00b894;
		width: 100%;
		height: auto;
		padding: 60px;
		margin: 30px 0 30px 0;
	}
/*	.previewapp-app {
		width: 80%;
		height: 470px;
	}*/
	.previewapp-image {
		background-image: url('../.././assets/previewapp2.jpeg');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		position: relative;
		width: 95%;
		height: 490px;
		margin: 40px auto;
		/*margin-left: auto;*/
		/*margin-right: auto;*/
	}
	.title {
		font-size: 40px;
	}
	@media only screen and (max-width: 600px) {
		.previewapp {
			height: auto;
			padding: 30px;
			margin: 30px 0 30px 0;
		}
		.previewapp-image {
			height: 490px;
			margin: 10px auto;
			/*margin-left: auto;*/
			/*margin-right: auto;*/
		}
	}
</style>