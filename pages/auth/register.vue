<template>
	<v-card class="mx-auto" max-width="500" :loading="cardLoading" light>
		<v-card-title primary-title> Moistened </v-card-title>
		<v-card-text class="pb-0"> </v-card-text>
		<v-card-actions>
			<v-container>
				<v-row>
					<v-col class="d-flex justify-center">
						<v-btn elevation="2" color="success" :loading="cardLoading">
							<v-icon>mdi-account-plus</v-icon>
							<span class="pl-1">Criar conta</span>
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-divider></v-divider>
					</v-col>
					<v-col cols="1" class="ma-0 pa-0 d-flex justify-center">
						<span style="font-size: 14px; margin-top: 2px">OU</span>
					</v-col>
					<v-col>
						<v-divider></v-divider>
					</v-col>
				</v-row>
				<v-row align-content="center">
					<v-col class="d-flex justify-center">
						<v-btn
							color="#f9fafb"
							elevation="2"
							:loading="googleLoading"
							:disabled="googleLoading"
							@click="handleLoginWithGoogle"
						>
							<img class="google-logo" src="/Google__G__Logo.svg" alt="Google logo" />
							<span style="color: black">Entrar com o Google</span>
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-divider></v-divider>
					</v-col>
					<v-col cols="4" class="ma-0 pa-0 d-flex justify-center">
						<span style="font-size: 14px; margin-top: 2px">Já possui uma conta?</span>
					</v-col>
					<v-col>
						<v-divider></v-divider>
					</v-col>
				</v-row>
				<v-row align-content="center">
					<v-col class="d-flex justify-center">
						<v-btn
							elevation="2"
							color="blue darken-1"
							:loading="cardLoading"
							dark
							nuxt
							to="/auth/login"
						>
							<v-icon>mdi-login</v-icon>
							<span class="pl-1">Fazer login</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	layout: "base/register",
	data() {
		return {
			cardLoading: false,
			googleLoading: false,

			possibleErrors: {
				"auth/user-not-found": {
					type: "email",
					title: "Ocorreu um erro!",
					message: "Usuário não encontrado!",
				},
				"auth/wrong-password": {
					type: "senha",
					title: "Ocorreu um erro!",
					message: "Senha incorreta!",
				},
			},
		};
	},
	methods: {
		async handleLoginWithGoogle() {
			try {
				const provider = new this.$fireModule.auth.GoogleAuthProvider();

				this.googleLoading = true;
				const { user } = await this.$fire.auth.signInWithPopup(provider); // It's automatically saved

				if (!user?.uid) {
					this.googleLoading = false;
					throw new Error("An error occurred while trying to login!");
				}

				this.$router.push("/dashboard");

				//
			} catch (error) {
				this.googleLoading = false;
			}
		},
	},
};
</script>

<style lang="scss">
.google-logo {
	width: 18px;
	height: 18px;
	margin-right: 24px;
	margin-left: 8px;

	margin-top: auto;
	margin-bottom: auto;
}
</style>
