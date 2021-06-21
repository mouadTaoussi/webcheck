<template>
	<section>
		<div class="chart-section shadow light local-p-2">
			<p class="text-left text-dark poppins">
				{{ website_name }}
			</p>
			<!-- If we use G2Plot -->
			<div :id="website_id" class="website_chart"></div>
			<!-- If we use Chart.js -->
			<!-- <canvas v-bind:id="website_name" width="400" height="250"></canvas> -->
		</div>
	</section>
</template>

<script>
	import { G2, Line } from "@antv/g2plot";

	export default {
		props: ["website_id","website_name", "labels", "data"],
		name: "average_response_chart",

		data() {
			return {
				chart_color: "rgba(0,0,0,.3)",
				primary_color: "#008272",
			};
		},
		mounted() {
			//////////////// Charts Library: Chart.js ////////////////
			// var ctx = document.getElementById(`${this.website_name}`).getContext("2d");

			// // var gradientFill = ctx.createLinearGradient(0, 300, 0, 100);
			// // gradientFill.addColorStop(1, "white");
			// // gradientFill.addColorStop(0, "rgba(0, 130, 140, .1)");

			// var myLineChart = new Chart(ctx, {
			// 	type: "line",
			// 	data: {
			// 		labels: this.labels,
			// 		datasets: [
			// 			{
			// 				label: "average time to response",
			// 				data: this.data,
			// 				backgroundColor: /*gradientFill*/["rgba(0, 130, 140, .2)"],
			// 				borderColor: [this.primary_color],
			// 				borderWidth: 2,
			// 				pointBorderColor: "rgba(0, 130, 140, .9)",
			// 	            pointBackgroundColor: "rgba(0, 130, 140, .9)",
			// 	            pointHoverBackgroundColor: "rgba(0, 130, 140, .9)",
			// 	            pointHoverBorderColor: "rgba(0, 130, 140, .9)",
			// 	            pointBorderWidth: 1,
			// 	            pointHoverRadius: 1,
			// 	            pointHoverBorderWidth: 1,
			// 	            pointRadius: 3,
			// 			},
			// 		],
			// 	},
			// 	options: {
			// 		legend: { display: false },
			// 		title: {
			// 			display: false,
			// 			text:
			// 				"how many times your website got down the current week",
			// 			align: "start",
			// 		},
			// 		scales: {
			// 			xAxes: [
			// 				{
			// 					display: true,
			// 					gridLines: {
			// 						display: false,
			// 						color: this.chart_color,
			// 					},
			// 					ticks: {
			// 						fontColor: this.chart_color,
			// 						fontSize: 10,
			// 						stepSize: 1,
			// 						beginAtZero: true,
			// 					},
			// 					// scaleLabel: {
			// 					//   display: true,
			// 					//   labelString: 'Month'
			// 					// }
			// 				},
			// 			],
			// 			yAxes: [
			// 				{
			// 					display: true,
			// 					gridLines: {
			// 						display: false,
			// 						color: this.chart_color,
			// 					},
			// 					ticks: {
			// 						fontColor: this.chart_color,
			// 						fontSize: 10,
			// 						stepSize: 1,
			// 						beginAtZero: true,
			// 					},
			// 					// scaleLabel: {
			// 					//   display: true,
			// 					//   labelString: 'Value'
			// 					// }
			// 				}
			// 			]
			// 		}
			// 	}
			// });
			


			//////////////// Charts Library: G2Plot ////////////////		
			const data = this.convertDataFormatToG2Plot();
			// const data = [
			//   {
			//     "Date": "2010-01",
			//     "scales": 1298
			//   },
			//   {
			//     "Date": "2010-02",
			//     "scales": 1850
			//   },
			//   {
			//     "Date": "2010-03",
			//     "scales": 1720
			//   },
			//   {
			//     "Date": "2010-04",
			//     "scales": 1818
			//   },
			//   {
			//     "Date": "2010-05",
			//     "scales": 1818
			//   },
			//   {
			//     "Date": "2010-06",
			//     "scales": 1818
			//   },
			//   {
			//     "Date": "2010-07",
			//     "scales": 1818
			//   },
			//   {
			//     "Date": "2010-08",
			//     "scales": 1225
			//   },
			//   {
			//     "Date": "2010-08",
			//     "scales": 1118
			//   },
			//   {
			//     "Date": "2010-08",
			//     "scales": 1858
			//   },
			//   {
			//     "Date": "2010-08",
			//     "scales": 1418
			//   },
			//   {
			//     "Date": "2010-08",
			//     "scales": 1418
			//   }
			// ]
			const line = new Line(this.website_id, {
		      data,
	  //     	meta: {
			// 	cpu: {
			// 		time: { type: "cat" },
			// 		max: 7000,
			// 		min: 1000,
			// 	},
			// },
		      padding: 'auto',
		      xField: 'Date',
		      // yField: 'scales',
		      xAxis: {
		        // type: 'timeCat',
		        tickCount: 5,
		      },
		    });
			line.update({
				theme: {
					styleSheet: {
						brandColor: "#05c46b",
						paletteQualitative10: [ 
							"#05c46b", "#05c46b", "#05c46b", "#05c46b"
						],
						paletteQualitative20: [ 
							"#05c46b", "#05c46b", "#05c46b", "#05c46b"
						],
					},
				},
			});
		    line.render();
		},
		methods : {
			convertDataFormatToG2Plot : function(){
				// Convert data format to be readable by G2Plot library
				const data = [];
				for (var i = 0; i < this.labels.length; i++) {
					data.push({"Date": this.labels[i],"response time (ms)": this.data[i]});
				}

				// return
				return data;
				// return [{"Date" : "12/21","scales": 1445},{"Date" : "13/21","scales": 1255},{"Date" : "14/21","scales": 1445}];
			}
		}
	};
</script>

<style lang="css" scoped>
canvas,
.website_chart {
	width: 400px !important;
	height: 250px !important;
}
chart-section:hover {
	border: var(--border);
}
</style>

<!-- // mounted () {
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
// } -->