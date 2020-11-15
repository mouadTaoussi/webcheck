<template>
	<section>
		<div  class="add-website">
			<!-- Modal -->
			<div id="add-website-modal" class="local-modal modal">
			  <div style="border-radius: 0" class="local-modal modal-background"></div>
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
				   	id="website_name"
				   	v-model="newWebsite.name"
				   	class="local-input form-control local-my-2"
				   	placeholder="Your website name" 
				   	name="name" 
				   	type="text"
				   >
				   <textarea
				   	id="description"
				   	v-model="newWebsite.description"
				   	class="local-input form-control local-my-2"
				   	placeholder="Your website description" 
				   	name="description" 
				   	type="text"
				   ></textarea> 
				   <input 
				   	id="website"
				   	v-model="newWebsite.website"
				   	class="local-input form-control local-my-2"
				   	placeholder="Your website Url" 
				   	name="website_url" 
				   	type="text"
				   >
				   <p class="text-left text-danger website_error_message" style='font-size: 12px'>
				   	Must be http:// or https://
					</p>

			    </section>
			    <footer class="modal-card-foot">
			      <button 
			      id="adding-website"
			      class="local-btn local-btn-success is-success local-mr-2"
			      v-on:click="addWebsite()"
			      >Add Website</button>
			      <button 
			      	class="local-btn local-btn-dark" 
			      	v-on:click="toggleModal()">
			  		Cancel</button>
			    </footer>
			  </div>
			</div>
			<!-- Button trigger modal -->
			<button 
				type="button"
				class="local-btn add-website-btn" 
				data-toggle="modal" 				
				data-target="#shareMethodsModal"
				v-on:click="toggleModal()"
			  	>Add Website
			</button>
		</div>

		<div class="websites-area">
			<website 
				websiteID="123"
				websiteName="myBlog1" 
				websiteDescription="this is my blog baby!!" 
				websiteUrl="https://myblog.com"
				v-bind:isActive="false"
				v-on:deleteOne="deleteWebsite($event)" ></website>
			<website 
				websiteID="123"
				websiteName="myBlog" 
				websiteDescription="this is my blog baby!!" 
				websiteUrl="https://myblog.com"
				v-bind:isActive="true"
				v-on:deleteOne="deleteWebsite($event)" ></website>
			<website 
				websiteID="123"
				websiteName="myBlog" 
				websiteDescription="this is my blog baby!!" 
				websiteUrl="https://myblog.com"
				v-bind:isActive="true"
				v-on:deleteOne="deleteWebsite($event)" ></website>
		</div>
	</section>
</template>

<script>
	import website from './website.vue';
	import alert from '.././alert.vue';

	export default {

	  name: 'websites',
	  components: {
	  	website,
	  	alert
	  },

	  data () {
	    return {
	    	limit : 3,
	    	userWebsites: [],
	    	alertStatus : {
		    	message: "",
		    	type : "",
		    	display : "none"
	    	},
	    	newWebsite : {
	    		name: "mouad",
	    		description : "null",
	    		website: "https://google.com"
	    	}
	    }
	  },
	  mounted(){
	  	// alert('it works!')
		// Fetch user websites by its token
	  },
	  methods : {
		toggleModal : ()=>{
			const modal = document.querySelector('#add-website-modal');

			if (modal.classList.contains('is-active')) {
				modal.classList.remove('is-active')
			}
			else if (!modal.classList.contains('is-active')){
				modal.classList.add('is-active')	
			}
		},
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
					url    : "http://localhost:8000/check/aVdd",
					data   : { 
						name: this.newWebsite.name, 
						description: this.newWebsite.description, 
						website: this.newWebsite.website 
					}
				})
				.then((response)=>{
					// Check if added
						// Push new website to the websites state
					// Clear sppiner
					document.querySelector('#adding-website').innerHTML = "Add Website";
					this.alertStatus.message = "Your website added successfully!";
					this.alertStatus.type = "success";
					this.alertStatus.display = "block";					
				})
				.catch((error)=>{
					// Clear sppiner
					document.querySelector('#adding-website').innerHTML = "Add Website";

					this.alertStatus.message = "Something went wrong!";
					this.alertStatus.type = "danger";
					this.alertStatus.display = "block";
				})
			}
			
		},
		deleteWebsite : (website_id)=>{
			alert('Delete Website fired!'+ website_id);
		},
		validateUserWebsite : function(){

	  		if (this.newWebsite.name === "") {
	  			document.querySelector('#website_name').style.borderColor = "red";
	  			return false;
	  		}
	  		else if (this.newWebsite.description === "") {
	  			document.querySelector('#description').style.borderColor = "red";
	  			return false;
	  		}
	  		else if (this.newWebsite.website === "") {
	  			document.querySelector('#website').style.borderColor = "red";
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
		background-color: var(--primary-app);
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