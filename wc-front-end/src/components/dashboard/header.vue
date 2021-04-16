<template>
	<!-- Header -->
	<div class="local-shadow bg-light local-navbar-2 local-px-2">
		<div class="local-navbar-content-grid poppins local-text-white">
			<div class='left-side'>
				<div v-on:click="toggleMenu()">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
					  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
					</svg>
				</div>
				<div class="header-elements-brand"></div>	
			</div>
			<div v-on:click="logoutUser()" class='right-side'>
				<p class="header-elements-logout text-dark text-right" style="cursor:pointer;">Log out</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'headercomponent',

  data () {
    return {

    }
  },
  methods : {
  	logoutUser: function() {
  		// Delete the token
  		window.localStorage.removeItem('user_token');
  		// Redirect the user to the /
		this.$router.push({ path: '/login' });
  	},
  	toggleMenu : function() {
  		const list_group = document.querySelector('.list-section');
  		console.log(list_group.style.right)
  		if (list_group.style.right == "0px"){
  			console.log(1)
  			list_group.style.right = "-300px"
  		}
  		else {
  			console.log(2)
  			list_group.style.right = "0px"	
  		}
  	}
  }
}
</script>

<style lang="css" scoped>
/*.local-navbar-content-grid {
	align-items: center;	
}*/
.header-elements-brand, .header-elements-logout {
	margin-top: 12px;
}
.header-elements-brand {
	float: left;
	background-image: url('../.././assets/logo_light.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	width: 150px;
	height: 50px;
	margin: -1px auto;
}
.bi-list {
	color: black;
	position: absolute;
	top: 15px;
	display: none;
}
@media only screen and (max-width: 800px) {
	.bi-list {
		display: block;
	}
	.header-elements-brand {
		display: none;
	}
}

</style>