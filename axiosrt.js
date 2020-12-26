const axios = require('axios');

axios.interceptors.request.use((config) => {
	console.log('start')
	config.metadata = { startTime: new Date()}
 	return config;
},(error)=>{
	return Promise.reject(error);
});
// Response interceptor will set endTime & calculate the duration
axios.interceptors.response.use((response) => {
	console.log('end')
	response.config.metadata.endTime = new Date()
	response.duration = response.config.metadata.endTime - response.config.metadata.startTime
	return response;
},(error) => {
	error.config.metadata.endTime = new Date();
	error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
	return Promise.reject(error);
});
async function getData (){
	const r =  await axios({
		method:"GET",
		url: 'https://www.youtube.com/watch?v=t6WDRz4NBEU&t=15s'
	})
	
	console.log(r.duration);
	// console.log(err.duration);

}

getData();