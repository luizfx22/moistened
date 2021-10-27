<template>
	<v-dialog v-model="dialog" persistent max-width="620">
		<v-card :loading="loading">
			<v-toolbar elevation="0" color="primary" dark>
				<v-toolbar-title class="text-h5"><b>Cadastrar nova horta</b></v-toolbar-title>
			</v-toolbar>

			<v-container fluid class="pa-5 ma-0 ma-auto">
				<v-form ref="form" v-model="form.valid">
					<v-row>
						<v-col class="pb-0">
							<h6 class="text-h6">Dados básicos</h6>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col cols="12">
							<v-text-field
								v-model="form.descricao"
								label="Apelido da horta"
								counter="75"
								maxlength="75"
								required
								:rules="rules.descricao"
							></v-text-field>
						</v-col>
					</v-row>
					<v-divider class="mt-2 mb-2"></v-divider>
					<v-row>
						<v-col class="pb-0 pt-3">
							<h6 class="text-h6">Localização</h6>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col lg="3">
							<v-text-field
								v-model="form.localizacao.cep"
								v-mask="'#####-###'"
								label="CEP"
								counter="9"
								:rules="rules.cep"
								maxlength="9"
								required
								:loading="loadingCep"
							></v-text-field>
						</v-col>
						<v-col lg="7">
							<v-text-field
								v-model="form.localizacao.logradouro"
								label="Logradouro"
								required
								readonly
								:rules="rules.logradouro"
							></v-text-field>
						</v-col>
						<v-col lg="2">
							<v-text-field
								ref="numeroField"
								v-model="form.localizacao.numero"
								:rules="rules.numero"
								required
								label="Número"
								maxlength="6"
							></v-text-field>
						</v-col>
						<v-col lg="4">
							<v-text-field
								v-model="form.localizacao.complemento"
								required
								label="Complemento"
							></v-text-field>
						</v-col>
						<v-col lg="8">
							<v-text-field
								v-model="form.localizacao.bairro"
								:rules="rules.bairro"
								required
								label="Bairro"
								readonly
							></v-text-field>
						</v-col>
						<v-col lg="10">
							<v-text-field
								v-model="form.localizacao.cidade"
								required
								:rules="rules.cidade"
								label="Cidade"
								readonly
							></v-text-field>
						</v-col>
						<v-col lg="2">
							<v-text-field
								v-model="form.localizacao.uf"
								required
								:rules="rules.uf"
								label="UF"
								readonly
							></v-text-field>
						</v-col>
					</v-row>
				</v-form>
			</v-container>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red" text :disabled="loading" @click="dialog = false">
					<v-icon class="mr-2">mdi-close</v-icon> Cancelar
				</v-btn>
				<v-btn color="green darken-1" :loading="loading" dark @click="salvar">
					<v-icon class="mr-2">mdi-check</v-icon> Salvar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapActions } from "vuex";

const capitalize = ([initial, ...rest]) => [initial.toUpperCase(), ...rest].join("");

export default {
	data() {
		return {
			dialog: false,
			loading: false,
			loadingCep: false,

			form: {
				valid: true,
				descricao: "",
				localizacao: {
					logradouro: "",
					numero: "",
					bairro: "",
					cidade: "",
					complemento: "",
					uf: "",
					cep: "",
				},
			},
		};
	},

	computed: {
		rules() {
			return {
				descricao: [
					(v) => {
						if (!v) return "Descrição é obrigatória";
						if (v.length > 75) return "Descrição deve ter no máximo 75 caracteres";
						if (v?.trim() === "") return "Descrição não pode ser vazia";
						return true;
					},
				],
				cep: [(v) => !!v || "CEP é obrigatório"],
				logradouro: [(v) => !!v || "Logradouro é obrigatório"],
				numero: [(v) => !!v || "Número é obrigatório"],
				bairro: [(v) => !!v || "Bairro é obrigatório"],
				cidade: [(v) => !!v || "Cidade é obrigatório"],
				uf: [(v) => !!v || "Informe a UF"],
			};
		},
	},

	watch: {
		"form.descricao"(val) {
			if (!val) return;
			this.form.descricao = capitalize(val);
		},

		"form.localizacao.cep"(val) {
			if (!val || val.length < 9) return;
			const cep = val.replace(/\D/g, "");

			this.loadingCep = true;
			this.$axios.$get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
				this.form.localizacao.logradouro = response.logradouro;
				this.form.localizacao.bairro = response.bairro;
				this.form.localizacao.cidade = response.localidade;
				this.form.localizacao.uf = response.uf;
				this.loadingCep = false;
				this.$refs.numeroField.focus();
			});
		},

		dialog(val) {
			if (!val) {
				this.$refs.form.reset();
			}
		},
	},

	methods: {
		open() {
			if (!this.dialog) {
				this.dialog = true;
				return true;
			}
			this.dialog = false;
			this.open();
		},

		salvar() {
			this.$refs.form.validate();
			if (!this.form.valid) return false;

			this.form.descricao = capitalize(this.form.descricao);

			this.loading = true;
			this.gravarHorta({ ...this.form }).then((res) => {
				this.dialog = false;
				this.loading = false;
			});
		},

		...mapActions({
			gravarHorta: "horta/gravarHorta",
		}),
	},
};
</script>
