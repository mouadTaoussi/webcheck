<template>
	<div class="average_response_time_day">
		<div class="chart-section shadow light local-p-2">
			<p class="text-left text-dark poppins">mouad's blog</p>
			<canvas id="myChart" width="400" height="220"></canvas>
		</div>
	</div>
</template>

<script>
export default {

  name: 'average_response_time_day',
  props : {
  	"websites_names" : Array,
  	"entities": Array
  },
  data () {
    return {
    	chart_color : "rgba(0,0,0,.4)",
    	primary_color: "#008272"
    }
  },
  mounted() {  
  	var ctx = document.querySelectorAll('#myChart');

  	ctx.forEach((chart)=>{
  		console.log(chart.getContext('2d'))//
  		var myLineChart = new Chart(chart.getContext('2d'), {
		    type: 'line',
		    data: {
		        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange',"Black","Brown","Rose","Ts"],
		        datasets: [{
		            label: 'Time to response',
		            data: [10, 20, 3, 5, 2, 3, 5, 6, 12, 10],
		            backgroundColor: [
		                'rgba(0, 130, 140, .3)',
		            ],
		            borderColor: [
		                this.primary_color,
		               
		            ],
		            borderWidth: 2
		        }]
		    },
		    options: {
		    	legend: {display : false}, 
		    	title : {display: false, text: "how many times your website got down the current week", align : "start"},
		    	scales: {
			    	xAxes: [{
				    	display: true,
				    	gridLines: {
							display: true,
							color: this.chart_color
						},
						ticks: {
							fontColor: this.chart_color,
							fontSize: 10,
							stepSize: 1,
							beginAtZero: true
						}
				        // scaleLabel: {
				        //   display: true,
				        //   labelString: 'Month'
				        // }
					}],
					yAxes: [{
						display: true,
						gridLines: {
						display: false,
						color: this.chart_color
					},
					ticks: {
						fontColor: this.chart_color,
						fontSize: 10,
						stepSize: 1,
						beginAtZero: true
					}
			        // scaleLabel: {
			        //   display: true,
			        //   labelString: 'Value'
			        // }
			      }]
			    }
				
		    }
		});
  	})
  }
}
</script>

<style lang="css" scoped>
	.chart-section {
		/*background-color: rgba(0,0,0,.7);*/
		/*color: white;*/
	}
	.average_response_time_day {
		display: grid;
		grid-template-columns: 2fr 2fr;
		grid-gap: 20px;
	}
	@media only screen and (max-width: 800px) {
		.average_response_time_day {
			display:  grid;
			grid-template-columns: 100%;
			grid-column-gap: 20px;
		}
	}
</style>