<template>
	<div>
		<div class="register local-card shadow border local-p-4">
			<h1 class="text-left local-mb-4">Register</h1>
			<input 
				type="text" 
				name="name" 
				placeholder="Enter Your Name" 
				autofocus="true" 
				class="form-control local-input my-2">
			<input 
				type="text" 
				name="email" 
				placeholder="Enter Your Email" 
				class="form-control local-input my-2">
			<input 
				type="text" 
				name="password" 
				placeholder="Enter Your Password" 
				class="form-control local-input my-2">
			<input 
				type="text" 
				name="password" 
				placeholder="Confirm Your Password" 
				class="form-control local-input my-2">
			<button 
				style="background-color: var(--primary);width: 100%" 
				class="local-btn local-my-2 local-text-white"
			>Register</button>
			<router-link 
				to='/login'
				tag="p" 
				style="display: inline; font-size: 12px;cursor:pointer;" 
				class="local-mr-4 text-center"
			>Have an account?</router-link>
		</div>
	</div>
</template>

<script>
export default {

  name: 'Register',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.register {
		width: 400px;
		margin: 100px auto;
	}
</style>