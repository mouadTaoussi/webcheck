<template>
	<section>
		<div class="logs-options">	
			<select v-on:change="filterLogs()" class="local-shadow choose-website local-input form-control">
				<option 
					v-for="website in websites" 
					v-bind:value='website._id'>
					{{ website.name }}
				</option>
			</select>
			<button 
			id="clearing" 
			type="button" 
			v-on:click="clearLogs()"
			class="local-shadow local-btn local-btn-danger clear-logs-btn">
			Clear logs
			</button>
		</div>
		<!-- <chartlogs></chartlogs> -->
		<!-- <loadingspinner></loadingspinner> -->

		<div v-for="log in logsToFilter">
			<!-- <div v-if='!log'><p class="text-center cabin text-dark">No logs for now!</p></div> -->
			<websitelog 
				v-bind:log="log">	
			</websitelog>
		</div>
	</section>
</template>

<script>
import websitelog from './websitelog.vue';
import chartlogs from './chartlogs.vue';
import loadingspinner from '.././loadingspinner.vue';

export default {

  name: 'websitelogs',

  props : ['logs','logsToFilter','websites'],

  components: {
  	websitelog,
  	chartlogs,
  	loadingspinner
  },

  data () {
    return {
    	websiteLogs : this.logs,
    	filteredLogs : this.logsToFilter,
    	userWesites : this.websites
    }
  },
  mounted(){

  },
  methods : {
  	filterLogs : function(){
  		  	// console.log(this.logs)
  	// console.log(this.logsToFilter)
  		const website_id = document.querySelector('.choose-website').value;
  		this.logsToFilter = this.logs.filter((websitelogs)=>{
  			return websitelogs.website_id == website_id;
  		})
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
		// document.querySelector('#clearing').innerHTML = "Clear logs";
	  },
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