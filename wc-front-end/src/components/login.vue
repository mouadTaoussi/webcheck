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
				v-model="userInfo.email"
				autofocus="true"
				class="form-control local-input my-2">
			<input 
				id="password"
				type="password" 
				name="password" 
				placeholder="Enter Your Password" 
				v-model="userInfo.password"
				class="form-control local-input my-2">
			<button 
				v-on:click="loginUser()"
				style="background-color: var(--primary-app);width: 100%" 
				class="local-btn local-my-2 local-text-white"
			>Log in</button>
			<router-link 
				to='/resetpassword'
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
    		email : null,
    		password : null
    	}
    }
  },
   methods : {
  	loginUser : function(){
  		// check if the inputs are empty
  		if (this.userInfo.email == null  || this.userInfo.password == null){
  			this.alertStatus.message = "Fill the inputs!";
  			this.alertStatus.type    = "info";
  			this.alertStatus.display = "block";
  		}
  		else {

	  		this.$http({
				method : "POST",
				url    : "http://localhost:8000/auth/login",
				data   : { email : this.userInfo.email, password:this.userInfo.password }
			})
			.then((response)=>{
				// Save that token in the localstorage
				window.localStorage.setItem('user_token',response.data.user_token);
				// Redirect the user to the dashboard
				this.$router.push({ path: '/dashboard' });
			})
			.catch((error)=>{
				if (error.message == "Request failed with status code 404") {
					this.alertStatus.message = "Incorrect credentials!";
					this.alertStatus.type = "danger";
					this.alertStatus.display = "block";
				} else {
					this.alertStatus.message = "Something went wrong!";
					this.alertStatus.type = "danger";
					this.alertStatus.display = "block";
				}
			})
  		}
  	}
  }

}
</script>

<style lang="css" scoped>
</style>