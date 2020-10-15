<template>
	<div class="">
		<div class="brand">
			<router-link to='/' tag="p">Hello World</router-link>
		</div>
		<div class="list">
			<router-link to="/login">Log in</router-link> |
	    	<router-link to="/register">Register</router-link>
	    	<router-link to="/about">About</router-link>
		</div>
	</div>
</template>

<script>
export default {

  name: 'homepageheader',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>