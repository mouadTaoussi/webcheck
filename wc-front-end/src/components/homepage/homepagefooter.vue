<template>
	<section class="footer">
		<div class="local-container-8 footer-row">
			<!-- Footer -->
			<div style="padding-top: 80px" class="child poppins">

				<a  target="_blank" href='https://github.com/mouadTaoussi/'>
					<i class="fab fa-github fa-2x text-white p-2"></i>
				</a>
				<a  target="_blank" href='https://www.instagram.com/devmt_/'>
					<i class="fab fa-instagram fa-2x text-white p-2"></i>
				</a>
				<a target="_blank" href='https://twitter.com/mouadTaoussi2'>
					<i class="fab fa-twitter fa-2x text-white p-2"></i>
				</a>

			</div>
			<div class="child poppins">
				<p class="text-left text-white">
					<router-link to="/login" tag='c'>Log in</router-link>
				</p>
				<p class="text-left text-white">
					<router-link to="/register" tag='c'>Register</router-link>
				</p>
				<p class="text-left text-white">
					<router-link to="/resetPassword" tag='c'>Reset Password</router-link>
				</p>
			</div>
			<div class="child poppins">
				<p class="text-left text-white">
					<router-link to="/contact" tag='c'>Contact</router-link>
				</p>
				<p class="text-left text-white">
					<router-link to="/about" tag='c'>About</router-link>
				</p>
				<p class="text-left text-white">
					<router-link to="/privacypolicy" tag='c'>Privacy & Policy</router-link>
				</p>
			</div>
		</div>
		<p class="text-center poppins text-white">devmt development.</p>
	</section>
</template>

<script>
export default {

  name: 'homepagefooter',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	section {
		/*height: 200px;*/
		/*width: 100%;*/
		/*background: black;	*/
	}
	.footer {
		background-image: url('../.././assets/footerBackground.svg');
		background-color: white;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		width: 100%;
		height: 280px;
	}
	.footer-row {
		display: grid;
		grid-template-columns: 2fr 2fr 2fr;
		grid-gap: 20px;
	}
	.child {
		/*background-color: red;*/
		height: 200px;
		padding: 50px 0 0 0;
	}
	.child p {
		cursor: pointer;
	}
/*	.brand-footer {
		background-image: url('../.././assets/logo_green.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 270px;
		height: 120px;
		margin: 0 auto;
	}*/
	@media only screen and (max-width: 600px) {
		.footer  {
			background-color: black;
			height: auto;
			background-image: url('')
		}
		.footer-row {
			grid-template-columns: 100%;
			grid-gap: 20px;
		}
	}
</style>