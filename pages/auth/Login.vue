<template>
	<v-card class="mx-auto" max-width="500" :loading="cardLoading" light>
		<v-card-title primary-title> Moistened </v-card-title>
		<v-card-text class="pb-0">
			<v-form ref="loginForm" v-model="isFormValid">
				<v-container>
					<v-row>
						<v-col>
							<p class="mb-2">
								<b>E-mail</b>
							</p>
							<v-text-field
								ref="emailField"
								v-model="form.email"
								:disabled="cardLoading"
								:rules="rules.emailRules"
								required
								elevation="0"
								solo
								outlined
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<div class="mb-2 flex-row justify-space-between" style="display: flex">
								<p style="margin: 0">
									<b>Senha</b>
								</p>
								<p style="margin: 0">
									<b>Esqueceu sua senha?</b>
								</p>
							</div>
							<v-text-field
								ref="senhaField"
								v-model="form.senha"
								:disabled="cardLoading"
								:append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="rules.passwordRules"
								:type="mostrarSenha ? 'text' : 'password'"
								name="input-10-1"
								hint="Pelo menos 8 caracteres!"
								counter
								outlined
								elevation="0"
								solo
								@click:append="mostrarSenha = !mostrarSenha"
								@keypress.enter.native="handleLoginWithEmail"
							></v-text-field>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-card-text>
		<v-divider></v-divider>
		<v-card-actions>
			<v-container>
				<v-row>
					<v-col class="d-flex justify-center">
						<v-btn
							elevation="2"
							color="success"
							:loading="cardLoading"
							@click="handleLoginWithEmail"
						>
							<v-icon>mdi-login</v-icon>
							<span class="pl-1">Acessar sistema</span>
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
				</v-row>
				<v-row>
					<v-col class="d-flex justify-center">
						<v-btn elevation="2" color="blue darken-1" dark nuxt to="/auth/register">
							<v-icon>mdi-account-plus</v-icon>
							<span class="pl-1">Criar uma nova conta</span>
						</v-btn>
					</v-col>
				</v-row>
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
