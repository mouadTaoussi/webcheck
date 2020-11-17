<template>
	<section>
		<!-- <br><br> -->
		<p class="text-left">Name:</p>
		<input 
			v-bind:value="name"
			type="text" name="" 
			class="form-control local-input local-mb-2" 
			placeholder="Name">
		<p class="text-left">Email:</p>
		<input 
			v-bind:value="email"
			type="text" 
			name="" 
			class="form-control local-input local-mb-2" 
			placeholder="Email">
		<p class="text-left text-danger email_exists" style='font-size: 12px'>
	   		Email already exists
		</p>
		
		<div class="local-mt-4">
			<button  
				id="saving-user-info"
				v-on:click="saveChangesUserInfo()" 
				class="local-btn local-ml-2 save-changes-btn"
			>Save changes</button>
			<button 
				id="deleteing"
				v-on:click="deleteAccount()" 
				style="float: right" 
				class="local-btn local-ml-2 local-btn-danger">
			Delete account</button>
		</div>
	</section>
</template>

<script>
import alert from '.././alert.vue';
export default {

  name: 'useraccount',

  props : { name:String, email:String },
  components: {
  	alert
  },

  data : () => {
    return { Name: this.name, Email: this.email }
  },
  methods : {
  	saveChangesUserInfo : function(){
  		// Validate function
  		alert(this.email);

  		// Waiting spinner 
		document.querySelector('#saving-user-info').innerHTML = `
		<div>
			<div class="spinner-border spinner-border-sm" role="status">
			  <span class="sr-only">Loading...</span>
			</div>
			Wait a minute...
		</div>
		`
	},
	deleteAccount : function(){
		// Password required
		confirm('Sure you want to delete this account!');

		// Waiting spinner 
		document.querySelector('#deleteing').innerHTML = `
		<div>
			<div class="spinner-border spinner-border-sm" role="status">
			  <span class="sr-only">Loading...</span>
			</div>
			Wait a minute...
		</div>
		`
		// Clear sppiner
		// document.querySelector('#deleteing').innerHTML = "Delete account!";
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