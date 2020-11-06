<template>
	<section>
		<!-- <br><br> -->
		<p class="text-left">Name:</p>
		<input type="text" name="" class="form-control local-input local-mb-2" placeholder="Name">
		<p class="text-left">Email:</p>
		<input type="text" name="" class="form-control local-input local-mb-2" placeholder="Email">
		<p class="text-left text-danger website_error_message" style='font-size: 12px'>
	   	Must be http:// or https://
		</p>
		<p class="text-left">Receiving emails:</p>
		<select class="form-control local-input local-mb-2">
			<option value="true">Enabled</option>
			<option value="false">Disabled</option>
		</select>
		<p class="text-left">Check your websites:</p>
		<select class="form-control local-input local-mb-2">
			<option value="true">Enabled</option>
			<option value="false">Disabled</option>
		</select>
		<p class="text-left">Choose theme:</p>
		<select class="form-control local-input local-mb-2">
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
		<div class="local-mt-4">
			<button  
				v-on:click="saveChanges()" 
				class="local-btn local-ml-2 save-changes-btn"
			>Save changes</button>
			<button 
				v-on:click="deleteAccount()" 
				style="float: right" 
				class="local-btn local-ml-2 local-btn-danger">
			Delete account</button>
		</div>
	</section>
</template>

<script>
import alert from './alert.vue';
export default {

  name: 'useraccount',
  components: {
  	alert
  },

  data : () => {
    return {
    	name           : null, 
		email          : null, 
		receivingEmail : null,
		active         : null, 
		displayTheme   : null,
    }
  },
  methods : {
  	saveChanges : function(){

  		// Validate function
  		alert('Saved!');
  	},
  	deleteAccount : function(){
  		// Password required
  		confirm('Sure you want to delete this account!');
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