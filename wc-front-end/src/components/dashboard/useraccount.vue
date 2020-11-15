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
		<p class="text-left text-danger website_error_message" style='font-size: 12px'>
	   	Must be http:// or https://
		</p>
		
		<div class="local-mt-4">
			<button  
				id="saving"
				v-on:click="saveChanges()" 
				class="local-btn local-ml-2 save-changes-btn"
			>Save changes</button>
			<button 
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
    return {}
  },
  methods : {
  	saveChanges : function(){

  		// Validate function
  		alert(this.email);

  		// Waiting spinner 
		document.querySelector('#saving').innerHTML = `
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
		document.querySelector('#deleteing').innerHTML = "Delete account!";
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