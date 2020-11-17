<template>
	<section>
		<p class="text-left">Receiving emails:</p>
		<select class="form-control local-input local-mb-2">
			<option value="true">Enabled</option>
			<option value="false" selected>Disabled</option>
		</select>
		<p class="text-left">Check your websites:</p>
		<select class="form-control local-input local-mb-2">
			<option value="true" selected>Enabled</option>
			<option value="false">Disabled</option>
		</select>
		<p class="text-left">Choose theme:</p>
		<select class="form-control local-input local-mb-2">
			<option value="light">Light</option>
			<option value="dark" selected>Dark</option>
		</select>
		<button  
			id="saving-settings"
			v-on:click="saveChangesSettings()" 
			class="local-btn local-ml-2 save-changes-btn"
		>Save changes</button>
		<button 
	</section>
</template>

<script>
export default {

  name: 'settings',
  props : [
  	"receivingEmail",
  	"active",
  	"displayTheme" 
  ],

  data () {
    return {
    	ReceivingEmail : this.receivingEmail,
		Active         : this.active, 
		DisplayTheme   : this.displayTheme,
    }
  },
  methods : {
  	saveChangesSettings : function() {
  		// Validate function

  		// Waiting spinner 
		document.querySelector('#saving-settings').innerHTML = `
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