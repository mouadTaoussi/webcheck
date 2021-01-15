<template>
	<section>
		<div class="previewapp">
			<!-- <img class="previewapp-app" src="../.././assets/previewapp.png"> -->
			<h2>
				<strong class="title text-white">
					You Can Get a Full Report About Your Websites Performance And Speed
				</strong>
			</h2>
			<p class="text-white poppins">Get a Graph That Represents Your Websites Speed Over Last 10 Days!</p>
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
		background-image: url('../.././assets/PreviewappBackground.svg');
		background-color: #00b894;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
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
		background-image: url('../.././assets/DashboardPreview.svg');
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