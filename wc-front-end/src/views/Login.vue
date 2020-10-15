<template>
	<div>
		<div class="login local-card shadow border local-p-4">
			<h1 class="text-left local-mb-4">Log in</h1>
			<input 
				type="text" 
				name="email" 
				placeholder="Enter Your Email" 
				autofocus="true"
				class="form-control local-input my-2">
			<input 
				type="text" 
				name="password" 
				placeholder="Enter Your Password" 
				class="form-control local-input my-2">
			<button 
				style="background-color: var(--primary);width: 100%" 
				class="local-btn local-my-2 local-text-white"
			>Log in</button>
			<router-link 
				to='/register'
				tag="p" 
				style="display: inline; font-size: 12px;cursor:pointer;" 
				class="local-mr-4"
			>Forgot your password?</router-link>
			<router-link 
				to='/register'
				tag="p" 
				style="display: inline; font-size: 12px;cursor:pointer;" 
				class="local-ml-4"
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
	.login {
		width: 400px;
		margin: 100px auto;
	}
</style>