<template>
	<section class="header local-shadow">
		<div class="header-grid">
			<div id="header-column-1" class="brand">
				
					<router-link to="/">
						<div class="header-brand"></div>
					</router-link>
					<ul class="header-list-1 poppins">
						<li class="header-list-1-item">About</li>
						<li class="header-list-1-item">Contact</li>
						<li class="header-list-1-item">Privacy & Policy</li>
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
			</div>
		</div>
	</section>
</template>

<script>
export default {

  name: 'homepageheader',

  data () {
    return {

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
</style>