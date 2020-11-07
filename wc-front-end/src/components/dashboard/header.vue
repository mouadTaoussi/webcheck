<template>
	<!-- Header -->
	<div class="local-navbar-2 local-px-2">
		<div class="local-navbar-content-grid poppins local-text-white">
			<div class='left-side'>
				<div class="header-elements-brand"></div>	
			</div>
			<div class='right-side'>
				<p class="header-elements-logout  text-right" style="cursor:pointer;">Log out</p>
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
  }
}
</script>

<style lang="css" scoped>
.local-navbar-2 {
	background-color: var(--primary-app);
}
/*.local-navbar-content-grid {
	align-items: center;	
}*/
.header-elements-brand, .header-elements-logout {
	margin-top: 12px;
}
.header-elements-brand {
	float: left;
	background-image: url('../.././assets/logo_green.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	width: 150px;
	height: 50px;
	margin: 0 auto;

}

</style>