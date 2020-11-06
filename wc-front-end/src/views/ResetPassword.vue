<template>
	<section>
		<div>Reset Password</div>
		<!-- Alert -->
		<alert 
			v-bind:style="'display:' + alertStatus.display" 
			v-bind:type="alertStatus.type" 
			v-bind:Message="alertStatus.message"
		></alert>
	</section>
</template>

<script>
	import alert from '.././components/alert.vue';

	export default {

	  name: 'ResetPassword',
	  components: {
	  	alert
	  },

	  data () {
	    return {
	    	alertStatus : {
		    	message: "Fuck you boi!!",
		    	type : "info",
		    	display : "none"
	    	},
	    	userInfo : {

	    	}
	    }
	  }
	}
</script>

<style lang="css" scoped>
</style>