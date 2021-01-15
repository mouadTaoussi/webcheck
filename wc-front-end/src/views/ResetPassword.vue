<template>
	<div class="resetPassword-page">
		<router-link to="/">
			<div class="brand"></div>
		</router-link>
		<div class="resetPassword local-card shadow local-p-4">
			<div width="100px" height="50px" class="brand-small-sevices"></div>
			<h1 class="text-left local-mb-4">Reset Password</h1>
			<!-- Alert -->
			<alert
				v-bind:style="'display:' + alertStatus.display"
				v-bind:type="alertStatus.type"
				v-bind:Message="alertStatus.message"
			></alert>
			<input
				id="email"
				type="text"
				name="email"
				placeholder="Enter Your Email"
				v-model="userInfo.email"
				autofocus="true"
				class="form-control local-input my-2"
			/>
			<button
				id="sending"
				v-on:click="sendPassword()"
				style="background-color: var(--primary-app);width: 100%"
				class="local-btn local-my-2 local-text-white"
			>
				Send!
			</button>
			<router-link
				to="/login"
				tag="a"
				style="display: inline-block; font-size: 12px;cursor:pointer;"
				class="local-mr-4 text-left"
				>Alreay have an account?</router-link
			>
			<router-link
				to="/register"
				tag="a"
				style="display: inline-block; font-size: 12px;cursor:pointer;"
				class="local-ml-4 text-right"
				>Need an account?</router-link
			>
		</div>
		<ul class="resetpassword-list-1 poppins">
			<li class="text-white resetpassword-list-1-item">
				<router-link to="/about" tag='c'>About</router-link>
			</li>
			<li class="text-white resetpassword-list-1-item">
				<router-link to="/about" tag='c'>Contact</router-link>
			</li>
			<li class="text-white resetpassword-list-1-item">
				<router-link to="/privacypolicy" tag='c'>Privacy & Policy</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import alert from ".././components/alert.vue";
import api_config from "../.././api.config.js";

export default {
	name: "ResetPassword",
	components: {
		alert,
	},
	created() {
		// If the user already logged in the we wont let him go to the dashboard
		if (window.localStorage.getItem("user_token")) {
			this.$router.push({ path: "/dashboard" });
		}
	},
	data() {
		return {
			alertStatus: {
				message: "Fuck you boi!!",
				type: "info",
				display: "none",
			},
			userInfo: {
				email: null,
			},
		};
	},
	methods: {
		sendPassword: function() {
			// Validate inputs
			if (this.userInfo.email == null) {
				this.alertStatus.message = "Fill the inputs!";
				this.alertStatus.type = "info";
				this.alertStatus.display = "block";
			} else {
				// Waiting spinner 
				document.querySelector('#sending').innerHTML = `
				<div>
					<div class="spinner-border spinner-border-sm" role="status">
					  <span class="sr-only">Loading...</span>
					</div>
					Wait a minute...
				</div>
				`
				this.$http({
					method: "POST",
					url: api_config.apiPath + "auth/resetPassword",
					data: {
						email: this.userInfo.email,
					},
				})
				.then((response) => {
					this.alertStatus.message = "Check your email now!";
					this.alertStatus.type = "success";
					this.alertStatus.display = "block";
					console.log(response)
				})
				.catch((error) => {
					if (error.message == "Request failed with status code 404") {
						// Clear sppiner
						document.querySelector('#sending').innerHTML = "Send!";
						this.alertStatus.message = "Email doesnt exists!";
						this.alertStatus.type = "danger";
						this.alertStatus.display = "block";
					} else {
						// Clear sppiner
						document.querySelector('#sending').innerHTML = "Send!";
						this.alertStatus.message = "Something went wrong!";
						this.alertStatus.type = "danger";
						this.alertStatus.display = "block";
					}
				});
			}
		},
	},
};
</script>

<style lang="css" scoped></style>
<style scoped>
	.resetPassword-page {
		padding-top: 7px;
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
		display: none;
	}
	.resetPassword {
		width: 400px;
		margin: 50px auto 20px;
	}
	.resetpassword-list-1 {
		list-style: none;
		text-decoration: none;
	}
	.resetpassword-list-2 {
		list-style: none;
		text-decoration: none;
	}
	.resetpassword-list-1 li {
		display: inline;
		padding: 5px;
		font-size: 13px;
		cursor: pointer;
	}
	@media only screen and (max-width: 600px) {
		.resetPassword-page {
			padding: 0;
		}
		.brand {
			display :none;
		}
		.resetPassword {
			width: 100%;
			height: 100vh; 
			margin: 0 auto;
		}	
		.brand-small-sevices {
			display: block;
		}


	}
</style>