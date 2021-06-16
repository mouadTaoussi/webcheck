import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import './assets/fontawesome/css/all.css';
import api_config from '.././api.config.js';
// import './registerServiceWorker'
import apolloProvider from './apollo.js';
import { G2, Line } from '@antv/g2plot';

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  router,
  // Inject apolloProvider for components to use.
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')

//
// window(screen.width >= 600)
// Check the browser width to hide the side menu in dashboard
window.onresize = function() {
	// Get the width of the current webpage
	var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

	if (x <= 1000) {
		document.querySelector('.list-section').classList.add('hide-list');
		document.querySelector('.list-section').classList.remove('show-list');
	}else {
		document.querySelector('.list-section').classList.add('show-list');
		document.querySelector('.list-section').classList.remove('hide-list');
	}
}
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

let serviceWorkerwRegisteration;

// Regsiter the service worker
async function regsiterServiceWorker(){
	// console.log(1)
	if ('serviceWorker' in window.navigator) {
		// Register a service worker
		serviceWorkerwRegisteration = await window.navigator.serviceWorker.register('./sw.js');
	}
	else {
		alert('Notification are not supported in your browser!');
	}
}
regsiterServiceWorker();

// Regsiter the user to the push service 
async function registerToPushService(){
		// axios
	if (Notification.permission == 'granted') {
  		// Example of the Notification
		// navigator.serviceWorker.getRegistration().then(function(reg) {
		//     reg.showNotification('Hello world!');
		// });

		// Check if the the browser alreay registered in the pushService
		const subscribed = await serviceWorkerwRegisteration.pushManager.getSubscription();
		// Checking ...
		if (!subscribed) {

			const subscription = await serviceWorkerwRegisteration.pushManager.subscribe({
				userVisibleOnly : true,
				applicationServerKey : "BD99nt4AZUQlt5-ev2zGs_QSHt9Q-4Oj9ULgYphwUb3JuK0NnW_CBvoZVEMuQPmgD4aW4VxhGu4q_3augFNGi68"
			});
			// Send that subscribe to the server associated with the token
			axios({
				method : "POST",
				url    : api_config.apiPath + `auth/pushServiceRegisteration?token=${window.localStorage.getItem('user_token')}`,
				data   : subscription
			})
			.then((response)=> { return; })
			.catch((error)=>   { return; })

		}
		else { return }
	}
	else { return }
}

window.setInterval(registerToPushService, 10000);

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