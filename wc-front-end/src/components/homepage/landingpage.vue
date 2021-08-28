<template>
	<section>
		<div class="landingpage shadow">
			<!-- Alert -->
			<div class="local-container-8 landingpage-alert">
				<alert
					style="display: none;"
					type="info"
					Message="If you stuck know how to take decisions to your audience ! you can try out surveyapp"
					link="https://surveyapp1.herokuapp.com"
				></alert>
			</div>
			<div class="landingpage-content">
				<h1 class="title poppins">
					Monitor your website's
					<strong class="uptime-word">uptime</strong><br />
					and <strong class="downtime-word">downtime</strong>
				</h1>
				<p class="sub-title poppins">
					You can get notified that your website just got down! to
					avoid losing traffic
				</p>
				<router-link to="/login">
					<button class="cta local-btn local-mr-2 shadow">
						Get Started
					</button>
				</router-link>
				<a
					href="https://github.com/mouadTaoussi/webcheck"
				>
					<button
						class="cta-github local-btn local-mr-2 local-btn-dark shadow"
					>
						<i class="fab fa-github text-white"></i>
						Github
					</button>
				</a>
				<!-- 	<router-link to="">
					<button class="cta local-btn local-btn-dark shadow">Learn more</button>
				</router-link> -->
				<!-- brs -->
				<br />
				<br />
				<br />
				<!-- brs -->
				<p id="features-title" class="poppins">
					Here is some of our features down below!
				</p>
				<svg
					width="1em"
					height="1em"
					viewBox="0 0 16 16"
					class="bi bi-chevron-down"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
					/>
				</svg>
			</div>
		</div>
	</section>
</template>

<script>
import alert from "../alert.vue";
export default {
	name: "landingpage",
	components: {
		alert,
	},
	data() {
		return {};
	},
};
</script>
<style lang="css" scoped>
.landingpage {
	/*background-image: url('../.././assets/backgroundLandingPage.jpg');*/
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-color: var(
		--landingpage-color
	); /* #f2f5fa  #f9f9f9 rgba(0,0,0,.1)*/
	height: 650px;
	border-top: var(--border);
	border-bottom: var(--border);
}
.landingpage-alert {
	/*position: sticky;*/
	/*top: 0;*/
	padding-top: 30px;
}
.landingpage-content {
	padding-top: 80px;
}
.title {
	color: rgba(0, 0, 0, 0.9);
	/*opacity: .8;*/
	font-weight: bold;
	font-size: 60px;
}
/* If The background is dark */
.title,
.sub-title,
#features-title {
	color: white !important;
}
.bi-chevron-down {
	fill: white;
}
/**/
.cta {
	background-color: var(--primary-app);
	color: white;
	padding: 10px 30px 10px 30px;
	font-size: 20px;
}
.cta-github {
	background-color: rgba(0, 0, 0, 0.9);
	color: white;
	padding: 10px 30px 10px 30px;
	font-size: 20px;
}
#features-title {
	font-size: 12px;
}
.uptime-word {
	color: white;
	background-color: var(--primary-app);
}
.downtime-word {
	color: white;
	background-color: red;
}
@media only screen and (max-width: 600px) {
	.landingpage {
		height: 450px;
	}
	.title {
		font-size: 30px;
	}
}
</style>
