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
					applicationServerKey : "BCa2OQQNkeJ_8AdJNCFt4RNJGDRKhtRS2mQxF7kxifgduGX7QMg_23AtN-TODCzxG9HyCYBLjyAdnGs_4PzfWDk"
				});
				// Send that subscribe to the server associated with the token
				console.log('Subsciriped to the push service')	
				console.log(JSON.stringify(subscription))		
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