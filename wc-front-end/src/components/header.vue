<template>
	<!-- Header -->
	<div class="local-navbar-2 local-px-2">
		<div class="local-navbar-content-grid poppins local-text-white">
			<div class='left-side'>
				<p class="header-elements-brand text-left">
					WebCheck
				</p>	
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
	background-color: var(--primary);
}
/*.local-navbar-content-grid {
	align-items: center;	
}*/
.header-elements-brand, .header-elements-logout {
	margin-top: 12px;
}

</style>