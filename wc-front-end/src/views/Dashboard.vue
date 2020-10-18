<template>
	<div>
		<headercomponent></headercomponent>
		<br>
		<div class="row list-group-dashboard local-container-8">
		  <div class="col-3">
		    <div class="list-group poppins" id="list-tab" role="tablist">
		      <a 
			      class="list-group-item list-group-item-action active text-left" 
			      id="list-websites-list" 
			      data-toggle="list"
			      href="#list-websites" 
			      role="tab" 
			      aria-controls="websites"
		      >Your websites</a>
		      <a 
			      class="list-group-item list-group-item-action text-left" 
			      id="list-websites-logs-list" 
			      data-toggle="list" 
			      href="#list-websites-logs" 
			      role="tab" 
			      aria-controls="website-logs"
		      >Websites Logs</a>
		      <a 
			      class="list-group-item list-group-item-action text-left" 
			      id="list-account-list" 
			      data-toggle="list" 
			      href="#list-account" 
			      role="tab" 
			      aria-controls="account"
		      >Your Account</a>
		      <a 
				  class="list-group-item list-group-item-action text-left" 
			      id="list-settings-list" 
			      data-toggle="list" 
			      href="#list-settings" 
			      role="tab" 
			      aria-controls="settings"
		      >Settings</a>
		    </div>
		  </div>
		  <div class="col-9">
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
		      		<websitelogs></websitelogs>
	      		</div>
			  </div>
		      <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
		      	<h3 class="text-left local-mb-4">Settings</h3>
		      	<div class="user-settings">
		      		<websitelogs></websitelogs>
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

export default {

  name: 'Dashboard',
  components: { 
  	headercomponent,
  	websites,
  	websitelogs
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
</style>