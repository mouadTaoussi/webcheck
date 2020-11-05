<template>
	<div class="login-page">
		<div class="brand"></div>
		<div class="login local-card shadow local-p-4">
			<h1 class="text-left local-mb-4">Log in</h1>
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
				tag="p" 
				style="display: inline-block; font-size: 12px;cursor:pointer;" 
				class="local-mr-4 text-left"
			>Forgot your password?</router-link>
			<router-link 
				to='/register'
				tag="p" 
				style="display: inline-block; font-size: 12px;cursor:pointer;" 
				class="local-ml-4 text-right"
			>Need an account?</router-link>
		</div>
	</div>
</template>

<script>
export default {

  name: 'Login',

  data () {
    return {

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
	.login {
		width: 400px;
		margin: 100px auto;
	}
</style>