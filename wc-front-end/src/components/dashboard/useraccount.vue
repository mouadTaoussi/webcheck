<template>
	<section>
		<!-- <br><br> -->
		<p class="text-left">Name:</p>
		<input 
			id="name"
			v-model="name"
			type="text" name="" 
			class="form-control local-input local-mb-2" 
			placeholder="Name">
		<p class="text-left">Email:</p>
		<input 
			id="email"
			v-model="email"
			type="text" 
			name="" 
			class="form-control local-input local-mb-2" 
			placeholder="Email">
		<p class="text-left text-danger email_exists" style='font-size: 12px'>
	   		
		</p>
		
		<div class="local-mt-4">
			<button  
				id="saving-user-info"
				v-on:click="saveChangesUserInfo()" 
				class="local-shadow local-btn local-ml-2 save-changes-btn"
			>Save changes</button>
			<button 
				id=""
				v-on:click="toggleModal()" 
				style="float: right" 
				class="local-shadow local-btn local-ml-2 btn-danger">
			Delete account</button>
		</div>

		<div id="delete-user-modal" class="modal">
		  <div class="modal-background"></div>
		  <div class="modal-card">
		    <header class="modal-card-head">
		      <p class="modal-card-title poppins text-left">Deleting your account request</p>
		      <button  v-on:click="toggleModal()" class="delete" aria-label="close"></button>
		    </header>
		    <section class="modal-card-body">
	    		<!-- Alert -->
				<!-- <alert 
					v-bind:style="'display:' + alertStatus.display" 
					v-bind:type="alertStatus.type" 
					v-bind:Message="alertStatus.message"
				></alert> -->
		      <!-- Content ... -->
		      <p class="text-left text-dark">
		      	<strong class="cabin">
		      		Deleting your account may delete all of your personnel info, and you'll not receive notifications or any activity to your websites anymore!
		      	</strong>
		      </p>
		      	<p class="text-left text-dark">
					<strong class="cabin">
			      		Thank you for utilising our service 😊
			      	</strong>
			    </p>
		       <input 
				   	id="password"
				   	v-model="Password"
				   	class="local-input form-control local-my-2"
				   	placeholder="Your Password" 
				   	name="password" 
				   	type="password"
				>
		    </section>
		    <footer class="modal-card-foot">
		       <button 
			      id="deleting"
			      class="local-btn local-btn-danger is-success local-mr-2"
			      v-on:click="deleteAccount()"
			      >I inderstand, Delete my account!</button>
			    <button 
			      class="local-btn local-btn-dark" 
			      v-on:click="toggleModal()">
			  	Cancel</button>
		    </footer>
		  </div>
		</div>

	</section>
</template>

<script>
import alert from '.././alert.vue';
import api_config from "../../.././api.config.js";

export default {

  name: 'useraccount',

  props : { name:String, email:String },
  components: {
  	alert
  },

  data : () => {
    return { 
    	Password: '',
    	alertStatus : {
	    	message: "null",
	    	type : "info",
	    	display : "none"
	    },
    }
  },
  methods : {
  	saveChangesUserInfo : function(){
  		
  		if (this.name == null || this.name == "") {
  			console.log(1)
  		}	
  		else if (this.email == null || this.email == "") {
  			console.log(2)
  		}
  		else {
  			console.log(3)
  			// Waiting spinner 
			document.querySelector('#saving-user-info').innerHTML = `
			<div>
				<div class="spinner-border spinner-border-sm" role="status">
				  <span class="sr-only">Loading...</span>
				</div>
				Wait a minute...
			</div>
			`

  			// Http request
  			this.$http({
  				method : 'PUT',
  				url : api_config.apiPath + `auth/updateUser?token=${window.localStorage.getItem('user_token')}`,
  				data : {name : this.name, email: this.email }
  			})
  			.then((response)=>{
  				// Clear sppiner
				document.querySelector('#saving-user-info').innerHTML = "Saved your Changes!";
				// Display err message
				document.querySelector('.email_exists').innerHTML = "";
  			})
  			.catch((err)=>{
  				// Clear sppiner email_exists
				document.querySelector('#saving-user-info').innerHTML = "Save Changes";

				if ( err.message == "Request failed with status code 404" ) {
					// Display err message
					document.querySelector('.email_exists').innerHTML = "Email already exists";
				}
				else {
					// @TODO : implement background syncing
					// navigator.serviceWorker.ready.then(function(swRegistration) {
					// 	return swRegistration.sync.register('saveUserInfoSync');
					// });
					window.alert('Something went wrong!');
				}
  			})
  		}
	},
	deleteAccount : function(){
	
		// Password required
		// confirm('Sure you want to delete this account!');

		// Validate if password provided
		if (this.Password == null || this.Password == '') {
			document.querySelector('#password').style.borderColor = "red";
		}
		else {
			// Waiting spinner 
			document.querySelector('#deleting').innerHTML = `
			<div>
				<div class="spinner-border spinner-border-sm" role="status">
				  <span class="sr-only">Loading...</span>
				</div>
				Wait a minute...
			</div>
			`
			// Send request to the server
			this.$http({
				method : "DELETE",
				url    : 
				api_config.apiPath + `auth/deleteUser?token=${window.localStorage.getItem('user_token')}&password=${this.Password}`
			})
			.then((response)=>{
				// Clear sppiner
				document.querySelector('#deleting').innerHTML = "I inderstand, Delete my account!";
				// Clear sppiner
				document.querySelector('#deleting').innerHTML = "Deleted!";
				// Delete the token
		  		window.localStorage.removeItem('user_token');
		  		// Redirect the user to the /
				this.$router.push({ path: '/login' });					
			})
			.catch((err)=>{
				if (err.message == "Request failed with status code 401") {
					// Clear sppiner
					document.querySelector('#deleting').innerHTML = "I inderstand, Delete my account!!";

					window.alert('Password is not correct!');
					// this.alertStatus.message = "Password is not correct!";
					// this.alertStatus.type = "danger";
					// this.alertStatus.display = "block";

				}else {
					// @TODO : implement background syncing
					// navigator.serviceWorker.ready.then(function(swRegistration) {
					// 	return swRegistration.sync.register('deleteUserSync');
					// });
					window.alert('Something went wrong!');
					// this.alertStatus.message = "Something went wrong!";
					// this.alertStatus.type = "danger";
					// this.alertStatus.display = "block";
				}
			})
			
		}


  	},
  	toggleModal : ()=>{
		const modal = document.querySelector('#delete-user-modal');

		if (modal.classList.contains('is-active')) {
			modal.classList.remove('is-active')
		}
		else if (!modal.classList.contains('is-active')){
			modal.classList.add('is-active')	
		}
	},
  }
}
</script>


<style lang="css" scoped>
	.save-changes-btn {
		background-color: var(--primary-app);
		color: white;
		float: right;
	}
</style>