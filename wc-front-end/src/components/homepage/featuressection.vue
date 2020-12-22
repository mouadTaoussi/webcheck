<template>
	<section class="local-container-4">
		<!-- <h1 class="text-center title poppins">With us you can ...</h1> -->
		<div class="features">
			<!-- Feature one -->
			<div>
				<div class="rectangle-above-title"></div>
				<h1 class="feature-title poppins text-left">Tired of losing traffic to your websites?</h1>
				<p class="text-left poppins">
					if one of your websites just goes down, then you'll get notified as soon as possible! to fix the problem 
				</p>
				<router-link to="/login">
					<button class="float-left local-btn local-btn-success local-mr-2 shadow">Get Started</button>
				</router-link>
				<router-link to="">
					<button class="float-left local-btn local-btn-dark shadow">Learn more</button>
				</router-link>
			</div>
			<div>
				<div class="Notifications"></div>
			</div>
			<!-- Feature two -->
			<div>
				<div class="websitesStatus"></div>
			</div>
			<div>
				<div class="rectangle-above-title"></div>
				<h1 class="feature-title poppins text-left">See your websites logs</h1>
				<p class="text-left poppins">
					You can get logs about your websites downtime logs, to see what's wrong with your them!
					and fix that problem. 
				</p>
				<router-link to="/login">
					<button class="float-left local-btn local-btn-success local-mr-2 shadow">Get Started</button>
				</router-link>
				<router-link to="">
					<button class="float-left local-btn local-btn-dark shadow">Learn more</button>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script>
export default {

  name: 'featuressection',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.feature-title {
	/*margin-top: 100px;*/
}
.features {
	display: grid;
	grid-template-columns: 50% 50%;
	grid-gap: 20px;
	grid-row-gap: 100px; 
}
.websitesStatus {
	background-image: url('../.././assets/websitesStatus.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	width: 100%;
	height: 400px;
	margin-top: 40px;
	margin-bottom: 40px;
}
.Notifications {
	background-image: url('../.././assets/Notifications.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	width: 100%;
	height: 400px;
	margin-top: 40px;
	margin-bottom: 40px;
}
.rectangle-above-title {
	width: 120px;
	height: 8px;
	background-color: transparent/*var(--rectangle-above-title)*/;
	margin-bottom: 10px;
	margin-top: 100px;
}
@media only screen and (max-width: 800px) {
	.features {
		margin-top: 150px;
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 20px;
		grid-row-gap: 20px; 
	}	
	.feature-title {
		margin-top: 10px;
	}
	.Notifications, .websitesStatus {
		display: none	
	}

}
</style>