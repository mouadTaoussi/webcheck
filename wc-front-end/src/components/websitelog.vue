<template>
	<section>
		<div class="local-card local-my-2 log">	      				
			<p class="log-title text-left text-danger">501 Not Implemented:
				<i>
					<svg width="12px" height="12px" viewBox="0 0 16 16" class="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
					  <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
					</svg>
					15/10/2020
				</i>
			</p>

			<p class="log-desc text-left">
				The server either does not recognize the request method,or it lacks the ability to fulfil the request.
			</p>
			<p class="text-left"><a class="log-link" href="https://www.google.com">https://google.com</a></p>
		</div>
	</section>
</template>

<script>
export default {

  name: 'websitelog',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.log-title {
		font-size: 15px;
	}
	.log {
		border: .2px solid rgba(0,0,0,.2);
	}

</style>