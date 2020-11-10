<template>
	<section>
		<!-- Will be a separate component -->
		<div class="cards local-container-8">
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-reviewed"></div>
				<h3>We'll check your websites</h3>
				<p class="poppins">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				</p>
			</div>
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-windows"></div>
				<h3>You'll be able to put max of 3 websites</h3>
				<p class="poppins">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				</p>
			</div>
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-confirmation"></div>
				<h3>Get notifications about your websites status</h3>
				<p class="poppins">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {

  name: 'cards',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	section {
		height: 600px;
	}
	.cards {
		margin: -100px auto;
		display: grid;
		grid-template-columns: 2fr 2fr 2fr;
		grid-gap: 10px;
		/*height: auto;*/
	}
	.cards-card {
		border: .2px solid rgba(0,0,0,.2);
	}
	.svg-reviewed {
		background-image: url('../.././assets/undraw_Reviewed_docs_re_9lmr.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 100%;
		height: 150px;
		margin-top: 40px;
		margin-bottom: 40px;

	}
	.svg-windows {
		background-image: url('../.././assets/undraw_windows_q9m0.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 100%;
		height: 150px;
		margin-top: 40px;
		margin-bottom: 40px;

	}
	.svg-confirmation {
		background-image: url('../.././assets/undraw_Confirmation_re_b6q5.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 100%;
		height: 150px;
		margin-top: 40px;
		margin-bottom: 40px;

	}
	@media only screen and (max-width: 800px) {
		section {
			height: auto;
		}
		.cards {
			margin: 50px auto;
			display: grid;
			grid-template-columns: 2fr;
			grid-gap: 10px;
		}
	}
</style>