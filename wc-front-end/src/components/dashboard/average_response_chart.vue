<template>
	<section>
		<div class="chart-section shadow light local-p-2">
			<p class="text-left text-dark poppins">
				{{ website_name }}
			</p>
			<canvas v-bind:id="website_name" width="400" height="250"></canvas>
		</div>
	</section>
</template>

<script>
export default {
	props: ["website_name", "labels", "data"],
	name: "average_response_chart",

	data() {
		return {
			chart_color: "rgba(0,0,0,.3)",
			primary_color: "#008272",
		};
	},
	// mounted () {
	// 	const data = {
	// 	    labels: this.labels,
	// 	    datasets: [
	// 	        {
	// 	            name: "Response time in melliseconds", type: "line",
	// 	            values: this.data
	// 	        }
	// 	    ]
	// 	}
	// 	const website_name = "#" + this.website_name;
	// 	const chart = new frappe.Chart(website_name, {  // or a DOM element,
	// 	                                            // new Chart() in case of ES6 module with above usage
	// 	    title: "Average response time last 10 days",
	// 	    data: data,
	// 	    type: 'line', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
	// 	    height: 250,
	// 	    colors: ['#7cd6fd', '#743ee2']
	// 	})
	// }
	mounted() {
		var ctx = document.getElementById(`${this.website_name}`);

		var myLineChart = new Chart(ctx.getContext("2d"), {
			type: "line",
			data: {
				labels: this.labels,
				datasets: [
					{
						label: "average time to response",
						data: this.data,
						backgroundColor: ["rgba(0, 130, 140, .3)"],
						borderColor: [this.primary_color],
						borderWidth: 2,
					},
				],
			},
			options: {
				legend: { display: false },
				title: {
					display: false,
					text:
						"how many times your website got down the current week",
					align: "start",
				},
				scales: {
					xAxes: [
						{
							display: true,
							gridLines: {
								display: true,
								color: this.chart_color,
							},
							ticks: {
								fontColor: this.chart_color,
								fontSize: 10,
								stepSize: 1,
								beginAtZero: true,
							},
							// scaleLabel: {
							//   display: true,
							//   labelString: 'Month'
							// }
						},
					],
					yAxes: [
						{
							display: true,
							gridLines: {
								display: false,
								color: this.chart_color,
							},
							ticks: {
								fontColor: this.chart_color,
								fontSize: 10,
								stepSize: 1,
								beginAtZero: true,
							},
							// scaleLabel: {
							//   display: true,
							//   labelString: 'Value'
							// }
						},
					],
				},
			},
		});
	},
};
</script>

<style lang="css" scoped>
	chart-section:hover {
		border: var(--border);
	}
</style>
