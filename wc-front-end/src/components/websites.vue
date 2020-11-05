<template>
	<section>
		<div  class="add-website">
			<!-- Modal -->
			<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">Add new Website</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        ...
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="local-btn local-btn-secondary" data-dismiss="modal">Close</button>
			        <button type="button" class="local-btn local-btn-primary">Add this Website</button>
			      </div>
			    </div>
			  </div>
			</div>
			<!-- Button trigger modal -->
			<button 
				type="button" 
				class="local-btn add-website-btn" 
				data-toggle="modal" 
				data-target="#exampleModal">
			  	Add Website
			</button>
		</div>

		<div class="websites-area">
			<website></website>
			<website></website>
			<website></website>
		</div>
	</section>
</template>

<script>
	import website from './website.vue';

	export default {

	  name: 'websites',
	  components: {
	  	website
	  },

	  data () {
	    return {
	    	limit : 3
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