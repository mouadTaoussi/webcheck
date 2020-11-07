<template>
	<section class="header">
		<div class="header-grid local-container-8">
			<div id="header-column-1" class="brand">
				<router-link to='/' tag="p">
					<div class="header-brand"></div>
				</router-link>
			</div>
			<div id="header-column-2">
				<ul class="header-list poppins">
					<router-link to="/login" tag="li">Log in</router-link>
					<router-link to="/register" tag="li">Register</router-link>
					<router-link to="/about" tag="li">About</router-link>
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
	height: 70px;
	/*background-color: green;*/
	width: 100%;
}
.header-brand {
	background-image: url('../.././assets/logo_light.svg');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	width: 200px;
	height: 50px;
	position: absolute;
	top: 11px;
}
.header-list {
	list-style: none;
	text-decoration: none;
}
.header-list li {
	display: inline;
	color: black;
	font-weight: 500;
	padding: 0px 10px 0px 10px;
}
.header-grid {
	display: grid;
	grid-template-columns: 50% 50%;
	padding-top: 25px;
}
#header-column-1 {
	justify-self : start;
}
#header-column-2 {
	justify-self : end;
}
</style>