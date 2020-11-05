import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// Show dropdwon menu in ./components/website.vue component
/**
*
* Don't Change the index of the dropdown elements or any element in the component! ! !
*
**/
window.showDropDown = (event)=>{
	// console.log(event.path[2].children[3].children[1].style.transform == 'scaleY(1)')
	// 			event.path[2].children[3].children[1].style.transform = 'scaleY(1)'
	if (event.path[2].children[3].children[1].style.transform != 'scaleY(1)') {
		event.path[2].children[3].children[1].style.transform = 'scaleY(1)'
	}
	else {
		event.path[2].children[3].children[1].style.transform = 'scaleY(0)'
	}

}