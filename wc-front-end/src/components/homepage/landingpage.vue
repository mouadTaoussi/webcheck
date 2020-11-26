<template>
	<section>
		<div class="landingpage shadow">
			<h1 class="title poppins">
				Get notified whether<br> your websites are down!
			</h1>
			<p class="poppins">
				You can get notified that your website just got down! to avoid losing traffic
			</p>
			<router-link to="/login">
				<button class="cta local-btn local-btn-success local-mr-2 shadow">Get Started</button>
			</router-link>
			<router-link to="">
				<button class="cta local-btn local-btn-dark shadow">Learn more</button>
			</router-link>
		</div>
	</section>
</template>

<script>
export default {

  name: 'landingpage',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.landingpage {
		background-color: #f9f9f9;/*#f9f9f9 rgba(0,0,0,.1)*/
		height: 550px;
		padding-top: 170px;
		border-top: var(--border);
		border-bottom: var(--border);
	}
	.title {
		color: black;
		/*opacity: .8;*/
		font-weight: bold;
		font-size: 50px;
	}
	.cta {
		padding: 10px 30px 10px 30px;
		font-size: 20px;
	}
</style>