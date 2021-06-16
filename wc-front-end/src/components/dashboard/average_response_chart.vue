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
		var ctx = document.getElementById(`${this.website_name}`).getContext("2d");

		// var gradientFill = ctx.createLinearGradient(0, 300, 0, 100);
		// gradientFill.addColorStop(1, "white");
		// gradientFill.addColorStop(0, "rgba(0, 130, 140, .1)");

		var myLineChart = new Chart(ctx, {
			type: "line",
			data: {
				labels: this.labels,
				datasets: [
					{
						label: "average time to response",
						data: this.data,
						backgroundColor: /*gradientFill*/["rgba(0, 130, 140, .2)"],
						borderColor: [this.primary_color],
						borderWidth: 2,
						pointBorderColor: "rgba(0, 130, 140, .9)",
			            pointBackgroundColor: "rgba(0, 130, 140, .9)",
			            pointHoverBackgroundColor: "rgba(0, 130, 140, .9)",
			            pointHoverBorderColor: "rgba(0, 130, 140, .9)",
			            pointBorderWidth: 1,
			            pointHoverRadius: 1,
			            pointHoverBorderWidth: 1,
			            pointRadius: 3,
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
						}
					]
				}
			}
		});

		// G2Plot
		const plot = new Line('container', {
	      autoFit: true,
	      height: 500,
	      data,
	      meta: {
	        cpu: {
	          time: { type: 'cat' },
	          max: 100,
	          min: 0,
	        },
	      },
	      xField: 'time',
	      yField: 'cpu',
	      seriesField: 'date',
	      tooltip: { showMarkers: false },
	      point: {
	        shape: 'breath-point',
	      },
	    });

	    plot.update({ "theme": { "styleSheet": { "brandColor": "#9DF5CA", "paletteQualitative10": ["#9DF5CA", "#61DDAA", "#42C090", "#19A576", "#008A5D", "#006F45", "#00562F", "#003E19", "#002800"], "paletteQualitative20": ["#9DF5CA", "#61DDAA", "#42C090", "#19A576", "#008A5D", "#006F45", "#00562F", "#003E19", "#002800"] } } });
	    plot.render();
	}
};
</script>

<style lang="css" scoped>
	canvas{

	  width: 400px !important;
	  height: 250px !important;

	}
	chart-section:hover {
		border: var(--border);
	}
</style>
