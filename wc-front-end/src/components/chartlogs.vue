<template>
	<div>
		<canvas id="myChart" width="400" height="220"></canvas>
	</div>
</template>

<script>
export default {

  name: 'chartlogs',

  data () {
    return {

    }
  },
  mounted() {
  	var ctx = document.querySelector('#myChart').getContext('2d');

  	var myLineChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	        datasets: [{
	            label: '# of Votes',
	            data: [12, 19, 3, 5, 2, 3],
	            backgroundColor: [
	                'rgba(0, 255, 0, .3)',
	            ],
	            borderColor: [
	                'rgba(0, 255, 0, 1)',
	               
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	legend: {display : false}, 
	    	title : {display: true, text: "how many times your website got down the current week"}
	    }
	});
  }
}
</script>

<style lang="css" scoped>
</style>