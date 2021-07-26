<template>
	<div>
		<v-card class="mx-auto" max-width="500">
			<v-card-title primary-title> Moistened </v-card-title>
			<v-card-actions>
				<button class="google-login-btn" @click="handleLoginWithGoogle">
					<img src="/Google__G__Logo.svg" alt="Google logo" />
					<span>Entrar com o Google</span>
				</button>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
export default {
	layout: "base/empty",
	methods: {
		async handleLoginWithGoogle() {
			try {
				const provider = new this.$fireModule.auth.GoogleAuthProvider();

				const { user } = await this.$fire.auth.signInWithPopup(provider); // It's automatically saved

				if (!user?.uid) {
					throw new Error("An error occurred while trying to login!");
				}

				this.$router.push("/dashboard");

				//
			} catch (error) {
				this.loading = false;
			}
		},
	},
};
</script>

<style lang="scss">
.google-login-btn {
	color: black;
	padding: 5px;
	margin: auto;
	width: 250px;

	font-family: "Roboto", sans-serif;
	font-weight: 500;

	display: flex;
	vertical-align: middle;
	border-radius: 2px;

	background: #f9fafb;

	height: 40px;

	img {
		width: 18px;
		height: 18px;
		margin-right: 24px;
		margin-left: 8px;

		margin-top: auto;
		margin-bottom: auto;
	}

	span {
		margin-right: 8px;
		margin-top: auto;
		margin-bottom: auto;
	}

	&:hover {
		background-color: lightgray;
	}

	margin-bottom: 15px;
}
</style>
