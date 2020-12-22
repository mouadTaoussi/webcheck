<template>
	<div class="register-page">
		<router-link to="/">
			<div class="brand"></div>
		</router-link>
		<div class="steps-area">
			<div class="steps local-mb-4">
				<div v-on:click='backToRegisterForm()' class="step-one current-step">1</div>
				<div v-on:click='nextToAddWebsite()' class="step-two">2</div>
			</div>
			<!-- <div class="line-trough"></div> -->
		</div>
		<div class="register local-card shadow local-p-4">
			<!-- Personel info -->
			<section id="" class="single-form register-form">
				<!-- Brand for smaller devices -->
				<div width="100px"  height="50px" class="brand-small-sevices"></div>
				<h1 class="text-left local-mb-2">Register</h1>
				<p class="text-left info-text poppins">You need to allow receiving notifications. after registering</p>
				<!-- Alert -->
				<alert 
					v-bind:style="'display:' + alertStatus.display" 
					v-bind:type="alertStatus.type" 
					v-bind:Message="alertStatus.message"
				></alert>
				<input 
					id="user_name"
					type="text" 
					name="name" 
					placeholder="Enter Your Name" 
					autofocus="true" 
					v-model="userInfo.name"
					class="form-control local-input my-2">
				<input 
					id="email"
					type="text" 
					name="email" 
					placeholder="Enter Your Email" 
					v-model="userInfo.email"
					class="form-control local-input my-2">
				<input 
					id="password"
					type="password" 
					name="password" 
					placeholder="Enter Your Password" 
					v-model="userInfo.password"
					class="form-control local-input my-2">
				<p class="text-left text-danger password_error_message" style='font-size: 12px'>
				
				</p>
				<input 
					id="password2"
					type="password" 
					name="password" 
					placeholder="Confirm Your Password" 
					v-model="userInfo.password2"
					class="form-control local-input my-2">
				<p class="text-left text-danger password2_error_message" style='font-size: 12px'>
				
				</p>
				<button 
					style="background-color: var(--primary-app);width: 100%" 
					class="local-btn local-my-2 local-text-white"
					v-on:click='nextToAddWebsite()'
				>Next step</button>
				<router-link 
					to='/login'
					tag="a" 
					style="display: inline; font-size: 12px;cursor:pointer;" 
					class="local-mr-4 text-left"
				>Have an account?</router-link>
			</section>
			<!-- Website info -->
			<section id="" class="single-form addwebsite-form">
				<!-- Brand for smaller devices -->
				<div width="100px"  height="50px" class="brand-small-sevices"></div>
				<h1 class="text-left local-mb-4">Add your first Website</h1>
				<!-- Alert -->
				<alert 
					v-bind:style="'display:' + alertStatus.display" 
					v-bind:type="alertStatus.type" 
					v-bind:Message="alertStatus.message"
				></alert>
				<input 
					id="website_name"
					type="text" 
					name="name" 
					placeholder="Enter Your Website Name" 
					autofocus="true" 
					v-model="userWebsite.name"
					class="form-control local-input my-2">
				<textarea
					id="description"
					type="text" 
					name="description" 
					placeholder="A little description" 
					v-model="userWebsite.description"
					class="form-control local-input my-2"></textarea>
				<input 
					id="website"
					type="text" 
					name="website_url" 
					placeholder="Provide your website Url"
					v-model="userWebsite.website" 
					class="form-control local-input my-2">
				<p class="text-left text-danger website_error_message" style='font-size: 12px'>
				
				</p>
				<button 
					style="width: 100%" 
					class="local-btn local-btn-dark local-mb-2 local-text-white"
					v-on:click='backToRegisterForm()'
				>Go Back</button>
				<button 
					id="registeration"
					style="background-color: var(--primary-app);width: 100%" 
					class="local-btn local-mb-2 local-text-white"
					v-on:click='registerUser()'
				>Register</button><br>
				<router-link 
					to='/login'
					tag="a" 
					style="display: inline; font-size: 12px;cursor:pointer;" 
					class="local-mr-4 text-center"
				>Have an account?</router-link>
			</section>
		</div>
		<ul class="register-list-1 poppins">
			<li class="register-list-1-item">
				<router-link to="/about" tag='c'>About</router-link>
			</li>
			<li class="register-list-1-item">
				<router-link to="/about" tag='c'>Contact</router-link>
			</li>
			<li class="register-list-1-item">
				<router-link to="/privacypolicy" tag='c'>Privacy & Policy</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import alert from '.././components/alert.vue';
import api_config from "../.././api.config.js";

export default {

  name: 'Register',
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
    		name : "",
    		email : "",
    		password : "",
    		password2 : "",
    	},
    	userWebsite : {
    		name : "",
    		description : "",
    		website : "http://"
    	}
    }
  },
  created (){
  	// If the user already logged in the we wont let him go to the dashboard
  	if (window.localStorage.getItem('user_token')) {
  		this.$router.push({ path: '/dashboard' });
  	}
  },
  methods : {
  	nextToAddWebsite : function (){
  		// Validating 
  		const validate = this.validateUserInputs();

  		if (validate == true){
  			// Sign the step-two circle
  			document.querySelector('.step-two').classList.add('current-step');
  			// Going to the next step
  			document.querySelector('.register-form').id = "prev-form";
  		}  		
  	},
  	backToRegisterForm : ()=>{
  		document.querySelector('.register-form').id = "";
  		// Sign the step-one circle
  		document.querySelector('.step-two').classList.remove('current-step');
  	},
  	registerUser : function() {
  	
  		const validate = this.validateUserInputs();
  		const validate_website = this.validateUserWebsite();

  		if (validate == true && validate_website == true) {
  			// put a loading spinner
	  		// Waiting spinner 
			document.querySelector('#registeration').innerHTML = `
			<div>
				<div class="spinner-border spinner-border-sm" role="status">
				  <span class="sr-only">Loading...</span>
				</div>
				Wait a minute...
			</div>
			`
	  		// Rgsiter user
	  		this.$http({
				method : "POST",
				url    : api_config.apiPath + "auth/register",
				data   : { 
					name     : this.userInfo.name, 
					email    : this.userInfo.email, 
					password :this.userInfo.password,
					websites : [
					{
						name        : this.userWebsite.name,
						description : this.userWebsite.description,
						website     : this.userWebsite.website
					}
					]
				}
			})
			.then((response)=>{
				// Save that token in the localstorage
				window.localStorage.setItem('user_token',response.data.user_token);
				// Redirect the user to the dashboard
				this.$router.push({ path: '/dashboard' });
			})
			.catch((error)=>{
				if (error.message == "Request failed with status code 404") {
					// Clear sppiner
					document.querySelector('#registeration').innerHTML = "Register";
					this.alertStatus.message = "Incorrect credentials!";
					this.alertStatus.type = "danger";
					this.alertStatus.display = "block";
				} else {
					// @TODO : implement background syncing
					// navigator.serviceWorker.ready.then(function(swRegistration) {
					// 	return swRegistration.sync.register('registerSync');
					// });
			  		// validate again
					// Clear sppiner
					document.querySelector('#registeration').innerHTML = "Register";
					this.alertStatus.message = "Something went wrong!";
					this.alertStatus.type = "danger";
					this.alertStatus.display = "block";
				}
			})
  		}
  		else if (validate_website == false ) {
  			document.querySelector('.register-form').id = "prev-form";
  		}
  		else {
  			// Going back
  			document.querySelector('.register-form').id = "";	
  		}
  		
  	},
  	validateUserInputs : function(){
  		if (this.userInfo.name === "") {
  			document.querySelector('#user_name').style.borderColor = "red";
  			return false;
  		}
  		else if (this.userInfo.email === "") {
  			document.querySelector('#email').style.borderColor = "red";
  			return false;
  		}
  		else if (this.userInfo.password === "") {
  			document.querySelector('#password').style.borderColor = "red";
  			return false;
  		}
  		else if ( this.userInfo.password !== this.userInfo.password2 ) {
  			document.querySelector('#password2').style.borderColor = "red";
  			return false;
  		}else {
  			return true;
  		}
  	},
  	validateUserWebsite : function(){

  		if (this.userWebsite.name === "") {
  			document.querySelector('#website_name').style.borderColor = "red";
  			return false;
  		}
  		else if (this.userWebsite.description === "") {
  			document.querySelector('#description').style.borderColor = "red";
  			return false;
  		}
  		else if (this.userWebsite.website === "") {
  			document.querySelector('#website').style.borderColor = "red";
  			return false;
  		}
  		else if ( 
  			!this.userWebsite.website.includes('http://') 
  		) {
  			if (!this.userWebsite.website.includes('https://')){

  				document.querySelector('.website_error_message')
	  			.innerHTML = "Enter a valid Url that includes http:// or https://";
	  			return false;
  			}
  			else {
  				return true;
  			}
  		}
  		else {
  			return true;
  		}	
  	}
  }
}
</script>

<style lang="css" scoped>
	.register-page {
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
	.info-text {
		font-size: 15px;
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
	.steps {
		display: grid;
		grid-template-columns: repeat(2,80px);
		justify-content: center;
	}
	.steps div {
		background-color: #bbb;
		height: 25px;
	    width: 25px;
		border-radius: 50%;
		/*display: inline-block;*/
		color: white;
		font-size: 16px;
		justify-self : center;
		cursor: pointer;
	}
	.current-step {
		background-color: var(--primary-app)!important;
	}
	.register {
		margin: 0 auto;
		width: 400px;
		display: grid;
		grid-template-columns: 5fr 5fr;
		overflow: hidden;
		height: 450px;
	}
	.single-form {
		width: 350px;
		margin-right: 25px;
		transition: all .3s ease-out;
	}
	#prev-form {
		margin-left: -400px;
	}
	#prev-prev-form {
		display: none;
	}
	.register-list-1 {
		list-style: none;
		text-decoration: none;
	}
	.register-list-2 {
		list-style: none;
		text-decoration: none;
	}
	.register-list-1 li {
		display: inline;
		padding: 5px;
		font-size: 13px;
		cursor: pointer;
	}
	@media only screen and (max-width: 600px) {
		.register-page {
			padding: 0;
		}
	/*	.single-form {
			width: 400px;
			margin-right: 150px;
		}
		/*/.brand {
			display :none;
		}
		.register {
			height: 100vh; 
			margin: 0 auto;
		}	
		.brand-small-sevices {
			display: block;
		}
		.steps-area {
			display: none;	
		}

	}
</style>