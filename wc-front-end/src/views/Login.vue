<template>
	<div class="login-page">
		<router-link to="/">
			<!-- <div class="brand"></div> -->
		</router-link>
		<div class="login local-card shadow local-p-4">
			<router-link to="/">
				<div width="100px"  height="50px" class="brand-small-sevices"></div>
			</router-link>
			<!-- <h1 class="text-left local-mb-4">Log in</h1> -->
			<logincomponent></logincomponent>
		</div>
		<ul class="login-list-1 poppins">
			<li class="text-white login-list-1-item">
				<router-link to="/about" tag='c'>About</router-link>
			</li>
			<li class="text-white login-list-1-item">
				<router-link to="/about" tag='c'>Contact</router-link>
			</li>
			<li class="text-white login-list-1-item">
				<router-link to="/privacypolicy" tag='c'>Privacy & Policy</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
// import alert from '.././components/alert.vue';
import logincomponent from '.././components/login.vue';
export default {

  name: 'Login',

  components: {
  	// alert
  	logincomponent
  },

  data () {
    return {
    	// alertStatus : {
	    // 	message: "Fuck you boi!!",
	    // 	type : "info",
	    // 	display : "none"
    	// },
    	// userInfo : {

    	// }
    }
  },
  created (){
  	// If the user already logged in the we wont let him go to the dashboard
  	if (window.localStorage.getItem('user_token')) {
  		this.$router.push({ path: '/dashboard' });
  	}
  },
}
</script>

<style lang="css" scoped>
	.login-page {
		padding-top: 20px;
		height: 100vh;
		background-image: url('.././assets/PreviewappBackground.svg')/*,url('../assets/login&registerBackground.svg')*/;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	.brand {
		background-image: url('.././assets/logo_green.svg')/*, url('.././assets/logo_light.svg')*/;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 270px;
		height: 120px;
		margin: 0 auto;
	}
	.brand-small-sevices {
		background-image: url('.././assets/logo_light.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 120px;
		height: 60px;
		display: block;
	}
	.login {
		width: 400px;
		margin: 50px auto 20px;
	}
	.login-list-1 {
		list-style: none;
		text-decoration: none;
		
	}
	.login-list-2 {
		list-style: none;
		text-decoration: none;
	}
	.login-list-1 li {
		display: inline;
		padding: 5px;
		font-size: 13px;
		cursor: pointer;
	}
	@media only screen and (max-width: 600px) {
		.login-page {
			padding: 0;
		}
		.brand {
			display :none;
		}
		.login {
			width: 100%;
			height: 100vh; 
			margin: 0 auto;
		}	
		.brand-small-sevices {
			display: block;
		}


	}
</style>