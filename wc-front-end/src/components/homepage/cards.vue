<template>
	<section>
		<!-- Will be a separate component -->
		<div class="cards mx-4">
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-reviewed"></div>
				<h3>
					<strong class="title">Monitor your websites every minute</strong>
				</h3>
				<p class="text poppins">
					Our platform is designed to monitor your websites and notify you whenever a problem occurs.
				</p>
			</div>
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-windows"></div>
				<h3>
					<strong class="title">Get logs about your <strong class="downtime-word-line">website downtime</strong>
				</strong>
				</h3>
				<p class="text poppins">
					Get logs about your website downtime to help you targeting the problem and find appropriate solution!
				</p>
			</div>
			<div class="local-card cards-card shadow local-p-4">
				<div class="svg-confirmation"></div>
				<h3>
					<strong class="title">
						Get notified about your <strong class="downtime-word-line">website downtime</strong>
					</strong>
				</h3>
				<p class="text poppins">
					You'll get notified whenever a website just went down, to fix it, instead of losing traffic!
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
		border-radius: 5px!important;
		text-align: left;
		/*border: var(--border);*/
	}
	.title {
		font-size: rgba(0,0,0,.9);
	}
	.text {
		color: rgba(0,0,0,.5);
		font-size: 18px;
	}
	.svg-reviewed {
		background-image: url('../.././assets/MonitorWebsitesCards.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 115px;
		height: 80px;
		margin-top: 40px;
		margin-bottom: 40px;

	}
	.svg-windows {
		background-image: url('../.././assets/WebsiteLogsCards.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 115px;
		height: 80px;
		margin-top: 40px;
		margin-bottom: 40px;

	}
	.svg-confirmation {
		background-image: url('../.././assets/WebsiteDownCards.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 115px;
		height: 80px;
		margin-top: 40px;
		margin-bottom: 40px;

	}
	.uptime-word-line {
		color: var(--primary-app);
	}
	.downtime-word-line {
		color: red;
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