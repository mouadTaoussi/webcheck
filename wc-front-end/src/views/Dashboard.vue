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
		      		<websites></websites>
		      	</div>
		      </div>
		      <div class="tab-pane fade" id="list-websites-logs" role="tabpanel" aria-labelledby="list-websites-logs-list">  
		      	<h3 class="text-left local-mb-4">Websites Logs</h3>
		      	<div class="website-logs">
		      		<websitelogs></websitelogs>
	      		</div>
			  </div>
		      <div class="tab-pane fade" id="list-account" role="tabpanel" aria-labelledby="list-account-list">  
		      	<h3 class="text-left local-mb-4">Your Account</h3>
		      	<div class="user-account">
		      		<useraccount></useraccount>
	      		</div>
			  </div>
		      <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
		      	<h3 class="text-left local-mb-4">Settings</h3>
		      	<div class="user-settings">
		      		<settings></settings>
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
import useraccount from '@/components/dashboard/useraccount.vue';
import settings from '@/components/dashboard/settings.vue';

export default {

  name: 'Dashboard',
  components: { 
  	headercomponent,
  	tabsgroup,
  	websites,
  	websitelogs,
  	useraccount,
  	settings
  },

  data () {
    return {
    	msg : "Hello World"
    }
  },
  created (){
  	// If the user already logged in the we wont let him go to the dashboard
  	if (!window.localStorage.getItem('user_token')) {
  		this.$router.push({ path: '/login' });
  	}
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