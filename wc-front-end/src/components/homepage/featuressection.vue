<template>
	<section class="local-container-10">
		<!-- <h1 class="text-center title poppins">With us you can ...</h1> -->
		<div class="features">
			<!-- Feature one -->
			<div>
				<div class="rectangle-above-title"></div>
				<h1 class="feature-title poppins text-left">Get Notified to your website <strong class="downtime-word">downtime</strong></h1>
				<p class="text-left poppins">
					if one of your websites just goes down, then you'll get notified<br> as soon as possible! to fix the problem 
				</p>
				<router-link to="/login">
					<button class="cta float-left local-btn local-mr-2 shadow">Get Started</button>
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
				<h1 class="feature-title poppins text-left">See your <strong class="uptime-word">websites logs</strong></h1>
				<p class="text-left poppins">
					You can get logs about your websites downtime logs, to see what's wrong<br> with your them!
					and fix that problem. 
				</p>
				<router-link to="/login">
					<button class="cta float-left local-btn local-mr-2 shadow">Get Started</button>
				</router-link>
				<router-link to="">
					<button class="float-left local-btn local-btn-dark shadow">Learn more</button>
				</router-link>
			</div>
			<!-- Feature three -->
			<div>
				<div class="rectangle-above-title"></div>
				<h1 class="feature-title poppins text-left">See your websites logs</h1>
				<p class="text-left poppins">
					You can get logs about your websites downtime logs, to see what's wrong with your them!
					and fix that problem. 
				</p>
				<router-link to="/login">
					<button class="cta float-left local-btn local-mr-2 shadow">Get Started</button>
				</router-link>
				<router-link to="">
					<button class="float-left local-btn local-btn-dark shadow">Learn more</button>
				</router-link>
			</div>
			<div>
				<div class="websitesStatus"></div>
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
.local-container-10 {
	width: 90%;
	margin: 0 auto;
}
.feature-title {
	/*margin-top: 100px;*/
	font-weight: bolder;
	font-size: 50px;
}
.features {
	display: grid;
	grid-template-columns: 50% 50%;
	grid-gap: 20px;
	grid-row-gap: 20px; 
}
.websitesStatus {
	background-image: url('../.././assets/WebsitesLogs.svg');
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
	height: 500px;
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
.cta {
	background-color: var(--primary-app-darker);
	color: white;
}
.uptime-word {
	color: white;
	background-color: var(--primary-app-darker);
}
.downtime-word {
	color: white;
	background-color: red;
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