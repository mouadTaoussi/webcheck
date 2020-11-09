<template>
	<section class="local-container-8">
		<h1 class="text-center title poppins">With us you can ...</h1>
		<div class="features">
			<!-- Feature one -->
			<div>
				<h1 class="feature-title poppins text-left">You'll be able to see your websites activity</h1>
				<p class="text-left">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
				<h1 class="feature-title poppins text-left">You'll be able to see your websites activity</h1>
				<p class="text-left">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
	margin-top: 100px;
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

</style>