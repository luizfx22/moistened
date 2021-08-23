<template>
	<v-card class="mx-auto" max-width="500" :loading="cardLoading" light>
		<v-card-title primary-title> Moistened </v-card-title>
		<v-card-text class="pb-0">
			<p>Para sua comodidade entre com sua melhor conta do Google!</p>
		</v-card-text>
		<v-card-actions>
			<v-container>
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
				<!-- <v-row>
					<v-col>
						<v-divider></v-divider>
					</v-col>
				</v-row> -->
				<!-- <v-row>
					<v-col class="d-flex justify-center">
						<v-btn elevation="2" color="blue darken-1" dark nuxt to="/auth/register">
							<v-icon>mdi-account-plus</v-icon>
							<span class="pl-1">Criar uma nova conta</span>
						</v-btn>
					</v-col>
				</v-row> -->
			</v-container>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	layout: "base/login",
	data() {
		return {
			// flags
			cardLoading: false,
			googleLoading: false,
			mostrarSenha: false,
			isFormValid: false,

			form: {
				email: "",
				senha: "",
			},

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
	computed: {
		rules() {
			return {
				emailRules: [
					(v) => !!v || "Coloque o seu E-mail!",
					(v) => this.$utils.email(v) || "E-mail é inválido!",
				],
				passwordRules: [(v) => !!v || "Coloque uma senha!"],
			};
		},
	},

	created() {},

	methods: {
		async handleLoginWithEmail() {
			this.$refs.loginForm.validate();
			if (!this.isFormValid) return false;

			this.cardLoading = true;

			try {
				const { user } = await this.$fire.auth.signInWithEmailAndPassword(
					this.form.email,
					this.form.senha
				);

				if (!user?.uid) {
					this.cardLoading = false;
					throw new Error({ code: "500", message: "Erro desconhecido!" });
				}

				this.$router.push("/dashboard");

				this.cardLoading = false;

				//
			} catch (error) {
				this.cardLoading = false;

				if (Object.keys(this.possibleErrors).includes(error.code)) {
					return this.$notify({
						type: "error",
						title: this.possibleErrors[error.code]?.title,
						message: this.possibleErrors[error.code]?.message,
					});
				}

				return this.$notify({
					type: "error",
					title: `Ocorreu um erro desconhecido! - ${error.code}`,
					message: error.message,
				});
			}
		},

		async handleLoginWithGoogle() {
			try {
				this.googleLoading = true;
				const { user, session, error } = await this.$supabase.auth.signIn({
					provider: "google",
				});

				console.log(user);
				console.log(session);
				console.log(error);

				// if (!user?.uid) {
				// 	this.googleLoading = false;
				// 	throw new Error("An error occurred while trying to login!");
				// }

				// this.$router.push("/dashboard");

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
