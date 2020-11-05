<template>
	<div>
		<headercomponent></headercomponent>
		<br>
		<div class="dashboard-row list-group-dashboard local-container-8">
		  <div class="dashboard-column">
		    <div class="list-group poppins" id="list-tab" role="tablist">
		      <a 
			      class="list-group-item list-group-item-action active text-left" 
			      id="list-websites-list" 
			      data-toggle="list"
			      href="#list-websites" 
			      role="tab" 
			      aria-controls="websites"
		      >
		      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-diagram-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				  <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
				</svg>
		  		Your websites</a>
		      <a 
			      class="list-group-item list-group-item-action text-left" 
			      id="list-websites-logs-list" 
			      data-toggle="list" 
			      href="#list-websites-logs" 
			      role="tab" 
			      aria-controls="website-logs"
		      >
		      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				  <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
				  <path fill-rule="evenodd" d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
				  <circle cx="3.5" cy="5.5" r=".5"/>
				  <circle cx="3.5" cy="8" r=".5"/>
				  <circle cx="3.5" cy="10.5" r=".5"/>
				</svg>
		 		 Websites Logs</a>
		      <a 
			      class="list-group-item list-group-item-action text-left" 
			      id="list-account-list" 
			      data-toggle="list" 
			      href="#list-account" 
			      role="tab" 
			      aria-controls="account"
		      >
		      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				  <path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
			</svg>
		 	 Your Account</a>
		      <a 
				  class="list-group-item list-group-item-action text-left" 
			      id="list-settings-list" 
			      data-toggle="list" 
			      href="#list-settings" 
			      role="tab" 
			      aria-controls="settings"
		      >
		      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-sliders" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
			</svg>
		  Settings</a>
		    </div>
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
import headercomponent from '@/components/header.vue';
import websites from '@/components/websites';
import websitelogs from '.././components/websitelogs.vue';
import useraccount from '.././components/useraccount.vue';
import settings from '.././components/settings.vue';

export default {

  name: 'Dashboard',
  components: { 
  	headercomponent,
  	websites,
  	websitelogs,
  	useraccount,
  	settings
  },

  data () {
    return {
    	msg : "Hello World"
    }
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