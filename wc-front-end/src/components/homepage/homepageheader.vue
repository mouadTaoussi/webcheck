<template>
	<section class="header local-shadow">
		<div class="header-grid">
			<div id="header-column-1" class="brand">
				
					<router-link to="/">
						<div class="header-brand"></div>
					</router-link>
					<ul class="header-list-1 poppins">
						<li class="header-list-1-item">
							<router-link to="/about" tag='c'>About</router-link>
						</li>
						<li class="header-list-1-item">
							<router-link to="/about" tag='c'>Contact</router-link>
						</li>
						<li class="header-list-1-item">
							<router-link to="/privacypolicy" tag='c'>Privacy & Policy</router-link>
						</li>
					</ul>
			</div>
			<div id="header-column-2">
				<ul class="header-list-2 poppins">
					<router-link to="/login" tag="li">
						<button class="local-btn bg-primary text-white local-shadow">
							Log in
						</button>
					</router-link>
					<router-link to="/register" tag="li">
						<button class="local-btn bg-primary text-white local-shadow">
							Register
						</button>
					</router-link>
				</ul>
				<svg v-on:click="toggleMenu()" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-justify hamburger-menu" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				  <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
				</svg>
			</div>
		</div>
		<section class="header-list-smaller-devices"></section>
	</section>
</template>

<script>
export default {

  name: 'homepageheader',

  data () {
    return {

    }
  },
  methods: {
  	toggleMenu : function(){
  		// Get menu
  		const side_menu = document.querySelector('.header-list-smaller-devices');

  		if (side_menu.style.right == "0") {
  			alert('it works! 😉'+ side_menu.style.right);
  		}
  		else {
  			alert('not working 😒' + side_menu.style.right);
  		}
  	}
  }
}
</script>

<style lang="css" scoped>

.header {
	height: 50px;
	background-color: white;
	width: 100%;
	position: sticky;
	top: 0;
}
.header-brand {
	background-image: url('../.././assets/logo_light.svg');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	width: 160px;
	height: 50px;
	position: absolute;
	top: 0px;
	left: 10px;
}
.header-list-1 {
	list-style: none;
	text-decoration: none;
	position: absolute;
	top: 13px;
	left: 200px;
}
.header-list-2 {
	list-style: none;
	text-decoration: none;
}
.header-list-1 li {
	display: inline;
	padding: 5px;
	font-size: 13px;
	cursor: pointer;
}
.header-list-2 li {
	display: inline;
	color: black;
	font-weight: 500;
	padding: 0px 10px 0px 10px;
	cursor: pointer;
}
.header-grid {
	display: grid;
	grid-template-columns: 50% 50%;
	padding-top: 8px;
}
#header-column-1 {
	justify-self : start;
}
#header-column-2 {
	justify-self : end;
}
.header-list-smaller-devices {
	background: red;
	height: 100vh;
	width: 300px;
	position: absolute;
	right: 0;
	top: 50px; 
	transition: all .2s ease-out;
}
.hamburger-menu {
	position: absolute;
	top: 18px;
	right: 20px;
	display: none;
}
@media only screen and (max-width: 600px) {
	.header-list-1 , .header-list-2 {
		display: none;
	}
	.hamburger-menu {
		display: block;
	}
}
</style>