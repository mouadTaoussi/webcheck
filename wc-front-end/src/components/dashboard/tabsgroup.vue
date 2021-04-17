<template>
	<section class="list-section show-list">
		<br>
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
		      id="list-average-response-time-day-list" 
		      data-toggle="list" 
		      href="#list-average-response-time-day" 
		      role="tab" 
		      aria-controls="account"
	      >
	      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
		  <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
		</svg>
	 	  Time <v style="font-size: 8px" class="local-badge info">BETA</v></a>
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
	</section>
</template>

<script>
export default {

  name: 'tabsgroup',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.list-section {
	height: 100vh;
	background-color: var(--primary-app-darker);
	position: absolute;
	width: 300px;
	/*left: 0px;*/
	transition: all .2s ease-out;
	z-index: 999;
	padding-top: 50px;
}
.list-group-item {
	background-color: transparent!important;
	color: white;
}
.list-group {
	position: sticky!important;
	top: 20px;
}
.show-list {
	left: 0px;
}
.hide-list {
	left: -300px;
}
@media only screen and (max-width: 800px) {
	.list-section {
		/*left: -300px;*/
		/*left: 0px;*/
	}
}
</style>