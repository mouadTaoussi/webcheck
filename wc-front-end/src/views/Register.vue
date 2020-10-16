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
				v-on:click='nextStep()'
			>Next step</button>
			<router-link 
				to='/login'
				tag="p" 
				style="display: inline; font-size: 12px;cursor:pointer;" 
				class="local-mr-4 text-center"
			>Have an account?</router-link>
		</div>

		<div class="register local-card shadow border local-p-4">
			<h1 class="text-left local-mb-4">Add your fist Website</h1>
			<input 
				type="text" 
				name="name" 
				placeholder="Enter Your Website Name" 
				autofocus="true" 
				class="form-control local-input my-2">
			<textarea
				type="text" 
				name="description" 
				placeholder="A little description" 
				class="form-control local-input my-2">A little description</textarea>
			<input 
				type="text" 
				name="website_url" 
				placeholder="Provide your website Url" 
				class="form-control local-input my-2">
			<button 
				style="width: 100%" 
				class="local-btn local-btn-dark local-my-2 local-text-white"
				v-on:click='goBack()'
			>Go Back</button>
			<button 
				style="background-color: var(--primary);width: 100%" 
				class="local-btn local-my-2 local-text-white"
				v-on:click='registerUser()'
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