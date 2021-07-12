<template>
	<section >
		<div class="logs-options">	
			<select v-on:change="filterLogs()" class="shadow choose-website local-input form-control">
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
			class="shadow local-btn btn-info clear-logs-btn">
			Clear
			</button>
		</div>
		<!-- <loadingspinner></loadingspinner> -->
		<section class="logs py-2">
			<div v-for="log in logsToFilter">
				<!-- <div v-if='!log'><p class="text-center cabin text-dark">No logs for now!</p></div> -->
				<websitelog 
					v-bind:log="log">	
				</websitelog>
			</div>
			<!-- No Data -->
			<emptycontent v-if="!logsToFilter || logsToFilter.length == 0"  index="1"></emptycontent>
		</section>
	</section>
</template>

<script>
import websitelog from './websitelog.vue';
import loadingspinner from '.././loadingspinner.vue';
import api_config from "../../.././api.config.js";
import emptycontent from "./emptycontent.vue"

export default {

  name: 'websitelogs',

  props : ['logs','logsToFilter','websites'],

  components: {
  	websitelog,
  	loadingspinner,
  	emptycontent
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
  	clearLogs : function(){
  		
	  	// Waiting spinner 
		document.querySelector('#clearing').innerHTML = `
		<div>
			<div class="spinner-border spinner-border-sm" role="status">
			  <span class="sr-only">Loading...</span>
			</div>
			Wait a minute...
		</div>
		` 

		//HTTP Request 
		this.$http({
			method : 'DELETE',
			url    :
			api_config.apiPath + `check/clearLogs?token=${window.localStorage.getItem('user_token')}`
		})
		.then((response)=>{
			console.log(response);
			// Clear logs state prop
			this.logsToFilter = null;
			this.logs = null;
			// Clear sppiner
			document.querySelector('#clearing').innerHTML = "Clear logs";
		})
		.catch((err)=>{
			// @TODO : implement background syncing
			// navigator.serviceWorker.ready.then(function(swRegistration) {
			// 	return swRegistration.sync.register('clearLogsSync');
			// });
			window.alert('Something went wrong!')
			// Clear sppiner
			document.querySelector('#clearing').innerHTML = "Clear logs";
		});
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
		border : 0;
	}
	.clear-logs-btn {
		position: absolute;
		top: 0;
		right: 0;
	}
	.logs {
		overflow: scroll;
		height: 500px;
	}
</style>