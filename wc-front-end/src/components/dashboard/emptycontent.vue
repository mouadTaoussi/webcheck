<template>
	<main>
		<!-- Add website modal -->
		<addwebsite v-bind:index="index"></addwebsite>

		<div class="svg"></div>
		<!-- <p class="text-center poppins">No content to show</p> -->
		 <button class="local-btn add-website-btn local-mr-2 shadow" v-on:click="toggleModal()">+ Add Website</button>
	</main>
</template>

<script>
	import addwebsite from './addwebsite.vue';

	export default {

	  name: 'emptycontent',

	  // The index used to locate the targeted modal that we want to show, 
	  // because <addwebsite> modal is replicated three times over the dashboard tabs 
	  // <websites-logs-time>
	  props: ['index'],

	  components: {
	  	addwebsite
	  },

	  data () {
	    return {

	    }
	  },
	  methods : {
			toggleModal : function(){
				const modal = document.querySelectorAll('.add-website-modal')[this.index];
				console.log(modal)
				if (modal.classList.contains('is-active')) {
					modal.classList.remove('is-active')
				}
				else if (!modal.classList.contains('is-active')){
					modal.classList.add('is-active')	
				}
			},
		}
	}
</script>

<style lang="css" scoped>
	.svg {
		background-image: url('../../assets/undraw_empty_street_sfxm.svg');
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		height: 300px;
		width: 400px;
		margin: 0 auto!important;
	}
	/*.local-btn-success {
		background-color: var(--primary-app);
		color: white;
	}*/
	.add-website-btn {
		background-color: var(--primary-app-darker);
		color: white;
	}
</style>