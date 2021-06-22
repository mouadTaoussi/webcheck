<template>
	<section>
		<!-- Will be a separate component -->
		<div class="cards local-container-4">
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-reviewed"></div>
				<h3>We'll check your websites every minute</h3>
				<p class="poppins">
					Our platform is designed to work for you to monitor your websites and notify you whenever a problem occurs.
				</p>
			</div>
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-windows"></div>
				<h3>You'll be able to monitor max of 3 websites</h3>
				<p class="poppins">
					You can monitor 3 websites at the same time instead of creating another account and put one website.
				</p>
			</div>
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-confirmation"></div>
				<h3>Get notifications and emails about your websites status</h3>
				<p class="poppins">
					You'll receive Notifications and emails whenever a website just got down, with the reason to help you target your problem and fix it at the right time, instead of losing traffic!
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
		border-radius: 5px;
		/*height: auto;*/
	}
	.cards-card {
		border: var(--border);
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