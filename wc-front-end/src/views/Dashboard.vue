<template>
	<div>
		<headercomponent></headercomponent>
		<br>
		<div class="dashboard-row list-group-dashboard local-container-8">
		  <div class="dashboard-column">
		    <tabsgroup></tabsgroup>
		  </div>
		  <div class="dashboard-column">
		    <div class="tab-content" id="nav-tabContent">
		      <div class="tab-pane fade show active" id="list-websites" role="tabpanel" aria-labelledby="list-websites-list">
		      	<h3 class="text-left local-mb-4">Your Websites</h3>
		      	<div class="websites-area">
		      		<websites v-bind:websites="userWebsites"></websites>
		      	</div>
		      </div>
		      <div class="tab-pane fade" id="list-websites-logs" role="tabpanel" aria-labelledby="list-websites-logs-list">  
		      	<h3 class="text-left local-mb-4">Websites Logs</h3>
		      	<div class="website-logs">
		      		<websitelogs 
			      		v-bind:logs="websitesLogs" 
			      		v-bind:logsToFilter="websitesLogs"
			      		v-bind:websites="userWebsites"></websitelogs>
	      		</div>
			  </div>
			  <div class="tab-pane fade" id="list-average-response-time-day" role="tabpanel" aria-labelledby="list-average-response-time-day-list">  
		      	<h3 class="text-left local-mb-4">Average response time for your Websites</h3>
		      	<div class="average_response_time_day">
		      		 <average_response_time_day
		      		 	v-bind:websites_names="average_response_time_day.websites_names"
		      		 	v-bind:entities="average_response_time_day.entities"
		      		 ></average_response_time_day>
		      		 <!-- <average_response_time_day></average_response_time_day> -->
		      		 <!-- <average_response_time_day></average_response_time_day> -->
	      		</div>
			  </div>
			 
		      <div class="tab-pane fade" id="list-account" role="tabpanel" aria-labelledby="list-account-list">  
		      	<h3 class="text-left local-mb-4">Your Account</h3>
		      	<div class="user-account">
		      		<useraccount
			      		v-bind:name="user.name"
			      		v-bind:email="user.email"
		      		></useraccount>
	      		</div>
			  </div>
		      <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
		      	<h3 class="text-left local-mb-4">Settings</h3>
		      	<div class="user-settings">
		      		<settings
		      			v-bind:receivingEmail="user.receivingEmail"
		      			v-bind:active="user.active"
		      			v-bind:displayTheme="user.displayTheme"
		      		></settings>
	      		</div>
			  </div>
		    </div>
		  </div>
		</div>

	</div>
</template>

<script>
import headercomponent from '@/components/dashboard/header.vue';
import tabsgroup from '@/components/dashboard/tabsgroup.vue';
import websites from '@/components/dashboard/websites';
import websitelogs from '@/components/dashboard/websitelogs.vue';
import average_response_time_day from '@/components/dashboard/average_response_time_day.vue'
import useraccount from '@/components/dashboard/useraccount.vue';
import settings from '@/components/dashboard/settings.vue';
import api_config from '../.././api.config.js';

export default {

  name: 'Dashboard',
  components: { 
  	headercomponent,
  	tabsgroup,
  	websites,
  	websitelogs,
  	average_response_time_day,
  	useraccount,
  	settings
  },

  data () {
    return {
    	msg : "Hello World",
    	user : {
    		name: null,
    		email: null,
    		receivingEmail: null,
    		active: null,
    		displayTheme: null,
    	},
    	userWebsites : null,
    	websitesLogs : null,
    	average_response_time_day : {
    		websites_names : ['moaudblog','website of architecture'],
    		entities : [1,2,3]
    	}

    }
  },
  created(){
  	// If the user already logged in the we wont let him go to the dashboard
  	// if (!window.localStorage.getItem('user_token')) {
  	// 	this.$router.push({ path: '/login' });
  	// }

  	// Fetch user
  	this.$http({
  		method: "GET",
  		url   : 
  		api_config.apiPath + `auth/?token=${window.localStorage.getItem('user_token')}`
  	})
  	.then((response)=>{
  		// Push to the local state
  		this.user.name           = response.data.user.name;
  		this.user.email           = response.data.user.email;
  		this.user.receivingEmail = response.data.user.receivingEmail;
  		this.user.active         = response.data.user.active;
  		this.user.displayTheme    = response.data.user.displayTheme;
  		this.userWebsites        = response.data.user.websites;
  	})
  	.catch((err)=>{
  		window.alert('Something went wrong!');
  	})

  	// Fetch logs
  	 this.$http({
  		method: "GET",
  		url   : 
  		api_config.apiPath + `check/logs?token=${window.localStorage.getItem('user_token')}`
  	})
  	.then((response)=>{
  		// Push to the local state
  		this.websitesLogs = response.data.logs;
  	})
  	.catch((err)=>{
  		window.alert('Something went wrong!')
  	})

  	// Fetch Average response time last ten days (GraphQL Apollo) 
  },
  async mounted(){
  	// Request notification permission
  	Notification.requestPermission();
  }
}
</script>

<style lang="css" scoped>
	.dashboard {
	}
	.dashboard-row {
		display:  grid;
		grid-template-columns: 1.2fr 4fr;
		grid-gap: 20px;
	}
	.websites-area {

	}
	.website-logs {

	}
	.list-group-dashboard {
		position: sticky!important;
		top: 20px;
	}
	
	@media only screen and (max-width: 800px) {
		.dashboard-row {
			display:  grid;
			grid-template-columns: 100%;
			grid-column-gap: 20px;
		}
	}
</style>