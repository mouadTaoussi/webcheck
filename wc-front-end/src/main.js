import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
// import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// Function that turns URL safe base64 string to a Uint8Array to pass into the subscribe call, 
function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
	.replace(/-/g, '+')
	.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

async function regsiterServiceWorker(){
	console.log(1)
	if ('serviceWorker' in window.navigator) {
		// Register a service worker
		const serviceWorkerwRegisteration = await window.navigator.serviceWorker.register('/sw.js');

		
		// axios
		if (Notification.permission == 'granted') {
	  		// Example of the Notification
			// navigator.serviceWorker.getRegistration().then(function(reg) {
			//     reg.showNotification('Hello world!');
			// });

			// Check if the the browser alreay registered in the pushService
			const isSubscriped = await serviceWorkerwRegisteration.pushManager.getSubscription();

			// Checking ...
			if (!isSubscriped) {

				const subscription = await serviceWorkerwRegisteration.pushManager.subscribe({
					userVisibleOnly : true,
					applicationServerKey : "BD99nt4AZUQlt5-ev2zGs_QSHt9Q-4Oj9ULgYphwUb3JuK0NnW_CBvoZVEMuQPmgD4aW4VxhGu4q_3augFNGi68"
				});
				// Send that subscribe to the server associated with the token
				console.log('Subsciriped to the push service')	
				axios({
					method : "POST",
					url    : `http://localhost:8000/auth/pushServiceRegisteration?token=${window.localStorage.getItem('user_token')}`,
					data   : subscription
				})
				.then((response)=>{
					console.log(response);
				})
				.catch((error)=>{
					console.log(error);
				})

			}
			else {
				console.log('Already subscriped to the push service');
			}

		}
		else {
			// Request notification permission
	  		Notification.requestPermission();
		}
	}
	else {
		alert('Notification are not supported in your browser!');
	}
}
regsiterServiceWorker();

// Show dropdwon menu in ./components/website.vue component
/**
*
* Don't Change the index of the dropdown elements or any element in the component! ! !
*
**/
window.showDropDown = (event)=>{

	if (event.path[2].children[3].children[1].style.transform != 'scaleY(1)') 
	{
		event.path[2].children[3].children[1].style.transform = 'scaleY(1)'
	}
	else 
	{
		event.path[2].children[3].children[1].style.transform = 'scaleY(0)'
	}

}




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWRiNTA3ZjY0NGRjMDg0OGJlMWJiNSIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2MDUyMTk1OTF9.WriNK0SHF0an7HWCtxKOk9uGGDjDmyCChfNUqWUT0mI


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWVhZjFlMmYzMDBmMzQwYzZmNjkzZSIsImVtYWlsIjoidGVzdDVAZ21haWwuY29tIiwiaWF0IjoxNjA1MjgzNjE0fQ.HYasipVSKDdSqSF3HeJ2ZZTXYJgJtCgInN74T64L6uw

