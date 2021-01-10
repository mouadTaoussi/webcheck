var ctx = document.getElementById(`${this.website_name}`);

var myLineChart = new Chart(ctx.getContext("2d"), {
	type: "line",
	data: {
		labels: dates,
		datasets: [
			{
				label: "average time to response",
				data: values,
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
