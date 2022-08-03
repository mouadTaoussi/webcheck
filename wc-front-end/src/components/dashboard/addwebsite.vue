<template>
	<!-- Modal -->
	<div class="add-website-modal local-modal modal">
		<div
			style="border-radius: 0"
			class="local-modal modal-background"
		></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Add new website</p>
				<button
					class="delete"
					aria-label="close"
					v-on:click="toggleModal()"
				></button>
			</header>
			<section class="modal-card-body">
				<!-- Alert -->
				<alert
					v-bind:style="'display:' + alertStatus.display"
					v-bind:type="alertStatus.type"
					v-bind:Message="alertStatus.message"
				></alert>
				<!-- Content ... -->
				<input
					v-model="newWebsite.name"
					class="website_name local-input form-control local-my-2"
					placeholder="Enter website's name"
					name="name"
					type="text"
				/>
				<textarea
					v-model="newWebsite.description"
					class="description local-input form-control local-my-2"
					placeholder="Write a short description about the website or the API"
					name="description"
					type="text"
				></textarea>
				<p class="text-left"></p>
				<input
					v-model="newWebsite.website"
					class="website local-input form-control local-my-2"
					placeholder="Paste website's URL or the API to keep track"
					name="website_url"
					type="text"
				/>
				<p
					class="text-left text-danger website_error_message"
					style="font-size: 12px"
				></p>
				<!-- Must be http:// or https:// -->
			</section>
			<footer class="modal-card-foot">
				<button
					id="adding-website"
					class="local-btn local-btn-success is-success local-mr-2"
					v-on:click="addWebsite()"
				>
					Add Website
				</button>
				<button
					class="local-btn local-btn-dark"
					v-on:click="toggleModal()"
				>
					Cancel
				</button>
			</footer>
		</div>
	</div>
</template>

<script>
	import alert from '.././alert.vue';
	import api_config from "../../.././api.config.js";

	export default {
		name: "addwebsite",

		props : ['index'],

		 components: {
			alert
		},

		data() {
			return {
				alertStatus : {
			    	message: "null",
			    	type : "info",
			    	display : "none"
		    	},
				newWebsite : {
		    		name: '',
		    		description : '',
		    		website: ''
		    	}
			};
		},
		methods : {
			addWebsite : function(){

				// Validate website url
				const validate_website = this.validateUserWebsite();

				// Send a request to the server using this.$http
				if (validate_website) {
					// Waiting spinner 
					document.querySelector('#adding-website').innerHTML = `
					<div>
						<div class="spinner-border spinner-border-sm" role="status">
						  <span class="sr-only">Loading...</span>
						</div>
						Wait a minute...
					</div>
					`
					this.$http({
						method : "POST",
						url    : api_config.apiPath + `check/add?token=${window.localStorage.getItem('user_token')}`,
						data   : { 
							name: this.newWebsite.name, 
							description: this.newWebsite.description, 
							website: this.newWebsite.website 
						}
					})
					.then((response)=>{
						// Check if added
						// Push new website to the websites prop
						if (response.data.message.includes('added') || response.data.message.includes('ADDED')) {
							this.websites.push({
								name: this.newWebsite.name,
								description: this.newWebsite.description,
								website: this.newWebsite.website,
								active: true // By default
							})
						}
						// Clear sppiner
						document.querySelector('#adding-website').innerHTML = "Add Website";

						this.alertStatus.message = response.data.message;
						this.alertStatus.type = 
						response.data.message.includes('added') ? "success" : "info";
						this.alertStatus.display = "block";					
					})
					.catch((error)=>{
						// @TODO : implement background syncing
						// navigator.serviceWorker.ready.then(function(swRegistration) {
						// 	return swRegistration.sync.register('addWebsiteSync');
						// });
						// Clear sppiner
						document.querySelector('#adding-website').innerHTML = "Add Website";

						this.alertStatus.message = "Something went wrong!";
						this.alertStatus.type = "danger";
						this.alertStatus.display = "block";
					})
				}
				
			},
			validateUserWebsite : function(){

		  		if (this.newWebsite.name === "") {
		  			document.querySelectorAll('.website_name')[this.index].style.borderColor = "red";
		  			return false;
		  		}
		  		else if (this.newWebsite.description === "") {
		  			document.querySelectorAll('.description')[this.index].style.borderColor = "red";
		  			return false;
		  		}
		  		else if (this.newWebsite.website === "") {
		  			document.querySelectorAll('.website')[this.index].style.borderColor = "red";
		  			return false;
		  		}
		  		else if ( 
		  			!this.newWebsite.website.includes('http://') 
		  		) {
		  			if (!this.newWebsite.website.includes('https://')){

		  				document.querySelector('.website_error_message')
			  			.innerHTML = "Enter a valid Url that includes http:// or https://";
			  			return false;
		  			}
		  			else {
		  				return true;
		  			}
		  		}
		  		else {
		  			return true;
		  		}	
		  	},
		  	// To Close the modal
		  	toggleModal : function(){
				const modal = document.querySelectorAll('.add-website-modal')[this.index];
				if (modal.classList.contains('is-active')) {
					modal.classList.remove('is-active')
				}
				else if (!modal.classList.contains('is-active')){
					modal.classList.add('is-active')	
				}
			},
		}
	};
</script>

<style lang="css" scoped></style>
