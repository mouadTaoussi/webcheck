<template>
	<section class="local-container-8">
		<section class="section">
			<center>
				<h1 class="title text-white poppins">Still can't find what you're looking for?</h1>
				<button class="local-btn local-btn-success">Create Account</button>
			</center>
		</section>
	</section>
</template>

<script>
export default {

  name: 'redundent_section',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.section {
		background-image: url('../.././assets/ImageBackground.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		width: 100%;
		height: 350px;
		margin-top: 40px;
		margin-bottom: 40px;
		padding-top: 130px;
	}
	.title {
		font-size: 40px;
	}
	@media only screen and (max-width: 600px) {
		.local-container-8 {
			width: 100%;
		}
		.title {
			font-size: 40px;
		}	
	}
</style>