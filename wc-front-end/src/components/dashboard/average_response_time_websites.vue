<template>
	<section id="average_response_time_day_area">
		<div
			v-for="website in getAverageResponseTimeForUserWebsites"
			class="average_response_time_day"
		>
			<average_response_chart 
				v-bind:website_name="website.website_name" 
				v-bind:labels="website.labels"
				v-bind:data="website.data">
			</average_response_chart>
		</div>
	</section>
</template>

<script>
// import Chart from 'chart.js';  
import average_response_chart from './average_response_chart';
export default {
	name: "average_response_time_websites",
	props: ["getAverageResponseTimeForUserWebsites"],
	components: {
		average_response_chart
	},
	data() {
		return {
			chart_color: "rgba(0,0,0,.6)",
			primary_color: "#008272",
			loaded: false,
		};
	}
};
</script>

<style lang="css" scoped>
.chart-section {
	/*background-color: rgba(0,0,0,.7);*/
	/*color: white;*/
}
#average_response_time_day_area {
	display: grid;
	grid-template-columns: 2fr 2fr;
	grid-gap: 20px;
}
@media only screen and (max-width: 800px) {
	#average_response_time_day_area {
		display: grid;
		grid-template-columns: 100%;
		grid-column-gap: 20px;
	}
}
</style>
