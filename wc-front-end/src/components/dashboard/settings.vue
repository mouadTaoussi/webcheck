<template>
	<section>
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
		<button  
			id="saving"
			v-on:click="saveChanges()" 
			class="local-btn local-ml-2 save-changes-btn"
		>Save changes</button>
		<button 
	</section>
</template>

<script>
export default {

  name: 'settings',
  props : {
  	receivingEmail: String,
  	active:         String,
  	displayTheme:   String
  },

  data () {
    return {
    	receivingEmail : null,
		active         : null, 
		displayTheme   : null,
    }
  },
  methods : {
  	saveChanges : function() {
  		// Validate function
  		alert('Saved!');

  		// Waiting spinner 
		document.querySelector('#saving').innerHTML = `
		<div>
			<div class="spinner-border spinner-border-sm" role="status">
			  <span class="sr-only">Loading...</span>
			</div>
			Wait a minute...
		</div>
		`
  	}
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