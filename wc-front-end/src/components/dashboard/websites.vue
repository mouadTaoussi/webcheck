<template>
	<section>
		<div  class="add-website">
			<!-- Button trigger modal -->
			<button 
				type="button"
				class="local-btn add-website-btn shadow" 
				data-toggle="modal" 				
				data-target="#shareMethodsModal"
				v-on:click="toggleModal()"
			  	>Add Website
			</button>
		</div>

		<div class="websites-area">
			<div v-for="website in websites">
				<website 
					v-bind:websiteID="website._id"
					v-bind:websiteName="website.name" 
					v-bind:websiteDescription="website.description" 
					v-bind:websiteUrl="website.website"
					v-bind:isActive="website.active"
					v-on:deleteOne="deleteWebsite($event)" 
				></website>
			</div>
		</div>
	</section>
</template>

<script>
	import website from './website.vue';
	import addwebsite from './addwebsite.vue';
	import api_config from "../../.././api.config.js";

	export default {

	  name: 'websites',
	  props : ['websites'],

	  components: {
	  	website,
	  	addwebsite,
	  },

	  data () { ////
	    return {
	    	limit : 3,
	    	// userWebsites: this.websites,
	    }
	  },
	  mounted(){},
	  
	  methods : {
	  	// To open the modal
		toggleModal : ()=>{
			const modal = document.querySelectorAll('.add-website-modal')[0];
			if (modal.classList.contains('is-active')) {
				modal.classList.remove('is-active')
			}
			else if (!modal.classList.contains('is-active')){
				modal.classList.add('is-active')	
			}
		},
		deleteWebsite : function(website_id){
    		
			const confirm = window.confirm('Sure you want to delete that website?');
			// console.log(website_id)
			if (!confirm) return;

			this.$http({
		  		method: "DELETE",
		  		url   : 
		  		api_config.apiPath + `check/deleteWebsite?token=${window.localStorage.getItem('user_token')}&website_id=${website_id}`
		  	})
		  	.then((response)=>{
		  		// Pop from the websites prop
		  		this.websites = this.websites.filter((website)=>{
		  			return website._id !== website_id
		  		})
		  	})
		  	.catch((err)=>{
		  		// @TODO : implement background syncing
				// navigator.serviceWorker.ready.then(function(swRegistration) {
				// 	return swRegistration.sync.register('deleteWebsiteSync');
				// });
		  		window.alert('Something went wrong');
		  	})
		}
	  }
	}
</script>

<style lang="css" scoped>

	.websites-area {
		display: grid;
		grid-template-columns: 2fr 2fr 2fr;
		grid-gap: 10px;
	}
	.add-website {
		width: 100%;
		position: relative;
		height:50px;
	}
	.add-website-btn {
		background-color: var(--primary-app-darker);
		position: absolute;
		top: 0;
		right: 0;
		color: white;
	}
	.local-modal {
		border-radius: 0!important;
	}
	@media only screen and (max-width: 600px) {
		.websites-area {
			display: grid;
			grid-template-columns: 100%;
			grid-column-gap: 10px;
		}
		.add-website-btn {
			background-color: var(--primary-app);
			position: absolute;
			top: 0;
			left: 0;
			color: white;
		}
	}

/*	.add-website-modal {
		background-color: white;
		height: 500px;
		width: 500px;
		position: absolute;
		top: 30px;
		margin:0 auto;
		border: .2px solid rgba(0,0,0,.2);
		transition: all .2s ease-in;
		border-radius: 2px;
	}*/
</style>