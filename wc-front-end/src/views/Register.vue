<template>
	<div class="register-forms">
		<div class="steps-area">
			<div class="steps local-mb-4">
				<div v-on:click='backToRegisterForm()' class="step-one current-step">1</div>
				<div v-on:click='nextToAddWebsite()' class="step-two">2</div>
			</div>
			<!-- <div class="line-trough"></div> -->
		</div>
		<div class="register local-card shadow border local-p-4">
			<section id="" class="single-form register-form">
				<h1 class="text-left local-mb-4">Register</h1>
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
					type="text" 
					name="password" 
					placeholder="Enter Your Password" 
					v-model="userInfo.password"
					class="form-control local-input my-2">
				<p class="text-left text-danger password_error_message" style='font-size: 12px'>
				
				</p>
				<input 
					id="password2"
					type="text" 
					name="password" 
					placeholder="Confirm Your Password" 
					v-model="userInfo.password2"
					class="form-control local-input my-2">
				<p class="text-left text-danger password2_error_message" style='font-size: 12px'>
				
				</p>
				<button 
					style="background-color: var(--primary);width: 100%" 
					class="local-btn local-my-2 local-text-white"
					v-on:click='nextToAddWebsite()'
				>Next step</button>
				<router-link 
					to='/login'
					tag="p" 
					style="display: inline; font-size: 12px;cursor:pointer;" 
					class="local-mr-4 text-center"
				>Have an account?</router-link>
			</section>
			<section id="" class="single-form addwebsite-form">
				<h1 class="text-left local-mb-4">Add your first Website</h1>
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
					id="register-btn"
					style="background-color: var(--primary);width: 100%" 
					class="local-btn local-mb-2 local-text-white"
					v-on:click='registerUser()'
				>Register</button><br>
				<router-link 
					to='/login'
					tag="p" 
					style="display: inline; font-size: 12px;cursor:pointer;" 
					class="local-mr-4 text-center"
				>Have an account?</router-link>
			</section>
		</div>
	</div>
</template>

<script>
export default {

  name: 'Register',

  data () {
    return {
    	userInfo : {
    		name : "",
    		email : "",
    		password : "",
    		password2 : "",
    	},
    	userWebsite : {
    		name : "",
    		description : "",
    		website : ""
    	}
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
  		// validate again
  		const validate = this.validateUserInputs();
  		const validate_website = this.validateUserWebsite();

  		if (validate == true && validate_website == true) {
  			// put a loading spinner
	  		document.querySelector('#register-btn').innerHTML = `
	  		<div style="font-size:10px;" class="d-flex justify-content-center">
			  <div style="color: white;" class="spinner-border spinner-border-md" role="status">
			    <span class="sr-only">Loading...</span>
			  </div>
			</div>
	  		`	
	  		window.setTimeout(()=>{
	  			this.$router.push('/dashboard');
	  		},2000)
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
	.register-forms {
		margin: 70px;
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
		background-color: var(--primary)!important;
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
</style>