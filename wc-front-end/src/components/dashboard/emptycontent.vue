<template>
	<main>
		<div class="svg"></div>
		<p class="text-center">No content to show</p>
	</main>
</template>

<script>
export default {

  name: 'emptycontent',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.svg {
		background-image: url('../../assets/undraw_empty_street_sfxm.svg');
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		height: 300px;
		width: 400px;
		margin: 0 auto!important;
	}
</style>