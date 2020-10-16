<template>
	<!-- Header -->
	<div class="local-navbar-2 local-p-2 shadow">
		<div class=" local-navbar-content-grid poppins local-text-white">
			<div class='left-side'>
				<p class="text-left">
					WebCheck
				</p>	
			</div>
			<div class='right-side'>
				<p class="text-right" style="cursor:pointer;">Log out</p>
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
</style>