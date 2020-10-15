<template>
	<section>
		<div class="logs-options">	
			<select class="choose-website local-input form-control">
				<option>Website one</option>
				<option>Website two</option>
				<option>Website three</option>
			</select>
			<button type="button" class="local-btn local-btn-danger clear-logs-btn">
			  Clear logs
			</button>
		</div>
		<!-- <chartlogs></chartlogs> -->
		<!-- <loadingspinner></loadingspinner> -->
		<websitelog></websitelog>
		<websitelog></websitelog>
	</section>
</template>

<script>
import websitelog from './websitelog.vue';
import chartlogs from './chartlogs.vue';
import loadingspinner from './loadingspinner.vue';

export default {

  name: 'websitelogs',
  components: {
  	websitelog,
  	chartlogs,
  	loadingspinner
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.logs-options {
		width: 100%;
		position: relative;
		height:50px;
	}
	.choose-website  {
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
	}
	.clear-logs-btn {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>