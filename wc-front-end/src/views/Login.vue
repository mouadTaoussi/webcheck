<template>
	<div class="login-page">
		<router-link to="/">
			<div class="brand"></div>
		</router-link>
		<div class="login local-card shadow local-p-4">
			<div width="100px"  height="50px" class="brand-small-sevices"></div>
			<h1 class="text-left local-mb-4">Log in</h1>
			<!-- Alert -->
			<alert 
				v-bind:style="'display:' + alertStatus.display" 
				v-bind:type="alertStatus.type" 
				v-bind:Message="alertStatus.message"
			></alert>
			<input 
				type="text" 
				name="email" 
				placeholder="Enter Your Email" 
				autofocus="true"
				class="form-control local-input my-2">
			<input 
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
	</div>
</template>

<script>
import alert from '.././components/alert.vue';

export default {

  name: 'Login',
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
	.login-page {
		padding-top: 20px;
		height: 100vh;
		background-image: url('../assets/login&registerBackground.svg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	.brand {
		background-image: url('.././assets/logo_light.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 270px;
		height: 120px;
		margin: 0 auto;
	}
	.brand-small-sevices {
		background-image: url('.././assets/logo_light.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 120px;
		height: 60px;
		display: none;
	}
	.login {
		width: 400px;
		margin: 100px auto;
	}
	@media only screen and (max-width: 600px) {
		.login-page {
			padding: 0;
		}
		.brand {
			display :none;
		}
		.login {
			width: 100%;
			height: 100vh; 
			margin: 0 auto;
		}	
		.brand-small-sevices {
			display: block;
		}


	}
</style>