<template>
	<section>

		<div class="website-component local-p-2 poppins">
			<p class="text-left website_name"><strong>HelloWorld</strong></p>

			<div class="activity_status">
				<p v-if="1 == 1" class="is_active text-success">
					<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <circle cx="8" cy="8" r="8"/>
					</svg>
					Active
				</p>
				<p v-else style="color: red;" class="is_down">
					<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bug" fill="currentColor" xmlns="	http://www.w3.org/2000/svg">
					  <path fill-rule="evenodd" d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6H4a3.99 3.99 0 0 1 1.333-2.982A3.983 3.983 0 0 1 8 2c1.025 0 1.959.385 2.666 1.018A3.989 3.989 0 0 1 12 6z"/>
					</svg>
					Down
				</p>
			</div>

			<p class="text-left description">Hello World</p>

			<section class="dropdown-area">
				<svg onclick="showDropDown(event)" id="website_menu" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  					<path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
				</svg>
				<div class='dropdown'>
					<p v-on:click="deleteWebsite()" class="text-left dropdown-item">Delete Site</p>
					<p class="text-left dropdown-item">Visit Site</p>
				</div>
			</section>

		</div>

	</section>
</template>

<script>
export default {

  name: 'website',
  props : ["website_name", "active", "description", "website"],

  data () {
    return {

    }
  },
  methods : {
  	deleteWebsite: ()=>{
  		// Hide the showed dropdowns
  		document.querySelectorAll(".dropdown").forEach((dropdown)=>{
  			dropdown.style.transform = 'scaleY(0)';
  		})
  	}
  }
}
</script>

<style lang="css" scoped>
	.website-component {
		background-color: white;
		border: .2px solid rgba(0,0,0,.2);
		position: relative;
		height: auto;
	}
	.website_name {
		font-weight: 500;
	}
	.is_active , .is_down{
		position: absolute;
		top: 10px;
		right: 25px;
		font-size: 12px;
	}
	.description {
		font-size: 14px;
	}
	#website_menu {
		position: absolute;
		bottom: 5px;
		right: 20px;
		cursor: pointer;
	}
	.dropdown {
		background-color: white;
		position: absolute;
		right: 20px;
		border:.2px solid rgba(0,0,0,.2);
		padding: 0px 0px 0px 0px;
		transition: all .2s ease-out;
		transform: scaleY(0);
		/*-ms-transform: scaleY(0);*/
	}
	.dropdown-item {
		font-size: 12px;
		cursor: pointer;
		padding: 10px;
		margin: 0;
	}
</style>