<template>
	<section>
		<div class="logs-options">	
			<select class="choose-website local-input form-control">
				<option>Website one</option>
				<option>Website two</option>
				<option>Website three</option>
			</select>
			<button 
			id="clearing" 
			type="button" 
			v-on:click="clearLogs()"
			class="local-btn local-btn-danger clear-logs-btn">
			Clear logs
			</button>
		</div>
		<!-- <chartlogs></chartlogs> -->
		<!-- <loadingspinner></loadingspinner> -->
		<websitelog></websitelog>
		<websitelog></websitelog>
	</section>
</template>

<script>
import websitelog from './websitelog.vue';
import chartlogs from './chartlogs.vue';
import loadingspinner from '.././loadingspinner.vue';

export default {

  name: 'websitelogs',
  components: {
  	websitelog,
  	chartlogs,
  	loadingspinner
  },

  data () {
    return {

    }
  },
  clearLogs : ()=>{
  	// Waiting spinner 
	document.querySelector('#clearing').innerHTML = `
	<div>
		<div class="spinner-border spinner-border-sm" role="status">
		  <span class="sr-only">Loading...</span>
		</div>
		Wait a minute...
	</div>
	`

	// Clear sppiner
	document.querySelector('#clearing').innerHTML = "Clear logs";
  }
}
</script>

<style lang="css" scoped>
	.logs-options {
		width: 100%;
		position: relative;
		height:50px;
	}
	.choose-website  {
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
	}
	.clear-logs-btn {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>