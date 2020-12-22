<template>
	<section class="section">
		<h1 class="title local-text-dark text-center poppins">Ready to Get started with us?</h1>
		<p class="text-dark text-center poppins">Never mind about payment! it's free!</p>
		<router-link to="/login">
			<button class="cta local-btn local-btn-success local-mr-2 shadow">Get Started</button>
		</router-link>
	</section>
</template>

<script>
export default {

  name: 'conclusion',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.section {
		padding: 100px 0 100px 0;
	}
	.title  {
		font-size: 50px;
		font-weight: bolder;
	}
	.cta {
		padding: 10px 30px 10px 30px;
		font-size: 20px;
	}
</style>