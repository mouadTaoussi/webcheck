<template>
	<section>
		<div class="">
			<h1 class="text-left local-mb-4">Log in</h1>
			<!-- Alert -->
			<alert 
				v-bind:style="'display:' + alertStatus.display" 
				v-bind:type="alertStatus.type" 
				v-bind:Message="alertStatus.message"
			></alert>
			<input 
				id="email"
				type="text" 
				name="email" 
				placeholder="Enter Your Email" 
				autofocus="true"
				class="form-control local-input my-2">
			<input 
				id="password"
				type="password" 
				name="password" 
				placeholder="Enter Your Password" 
				class="form-control local-input my-2">
			<button 
				style="background-color: var(--primary-app);width: 100%" 
				class="local-btn local-my-2 local-text-white"
			>Log in</button>
			<router-link 
				to='/register'
				tag="a" 
				style="display: inline-block; font-size: 12px;cursor:pointer;" 
				class="local-mr-4 text-left"
			>Forgot your password?</router-link>
			<router-link 
				to='/register'
				tag="a" 
				style="display: inline-block; font-size: 12px;cursor:pointer;" 
				class="local-ml-4 text-right"
			>Need an account?</router-link>
		</div>
	</section>
</template>

<script>
import alert from './alert.vue';

export default {

  name: 'logincomponent',

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