<template>
	<section class="local-container-10">
		<!-- <h1 class="text-center title poppins">With us you can ...</h1> -->
		<div class="features">
			<!-- Feature one -->
			<div class="m-4">
				<div class="rectangle-above-title"></div>
				<h1 class="feature-title poppins text-left">Get Notified to your website's <strong class="downtime-word">downtime</strong></h1>
				<p class="text-left poppins">
					if one of your websites just went down, you'll get notified<br> to fix the problem that caused the issue.
				</p>
				<router-link to="/login">
					<button class="cta float-left local-btn local-mr-2 shadow">Get Started</button>
				</router-link>
			</div>
			<div>
				<div class="Notifications"></div>
			</div>
			<!-- Feature two -->
			<div>
				<div class="websitesLogs"></div>
			</div>
			<div  class="m-4">
				<div class="rectangle-above-title"></div>
				<h1 class="feature-title poppins text-left">See your <strong class="uptime-word">websites logs</strong></h1>
				<p class="text-left poppins">
					Get logs about your website's downtime, in order see what's wrong<br> with it!
				</p>
				<router-link to="/login">
					<button class="cta float-left local-btn local-mr-2 shadow">Get Started</button>
				</router-link>
			</div>
			<!-- Feature three -->
			<div  class="m-4">
				<div class="rectangle-above-title"></div>
				<h1 class="feature-title poppins text-left">Track the <strong class="uptime-word">response time</strong> for your websites!</h1>
				<p class="text-left poppins">
					Track the response time of your websites everyday. to see a big image of each of your website's performance.
				</p>
				<router-link to="/login">
					<button class="cta float-left local-btn local-mr-2 shadow">Get Started</button>
				</router-link>
			</div>
			<div>
				<div class="WebsiteResponseTime"></div>
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
	/*width: 90%;*/
	/*margin: 0 auto;*/
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
.websitesLogs {
	background-image: url('../.././assets/WebsitesLogs.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	width: 100%;
	height: 400px;
	margin-top: 40px;
	margin-bottom: 40px;
}
.WebsiteResponseTime {
	background-image: url('../.././assets/ResponseTimeGraph.svg');
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
	.Notifications, .websitesLogs {
		display: none	
	}

}
</style>