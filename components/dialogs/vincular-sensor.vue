<template>
	<v-dialog v-model="dialog" persistent max-width="620">
		<v-card :loading="loading">
			<v-toolbar elevation="0" color="primary" dark>
				<v-toolbar-title class="text-h5"><b>Vincular sensor à horta</b></v-toolbar-title>
			</v-toolbar>

			<v-container fluid class="pa-5 ma-0 ma-auto">
				<v-form ref="form" v-model="form.valid">
					<v-row>
						<v-col class="pb-0">
							<h6 class="text-h6" align="center">Código de vinculação</h6>
						</v-col>
					</v-row>
					<v-row dense class="mt-0">
						<v-col cols="12" class="pt-0">
							<v-text-field
								v-model="form.codigo_vinculacao"
								v-mask="'#######'"
								class="text-center"
								counter="7"
								maxlength="7"
								required
								:rules="rules.codigo_vinculacao"
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
					<v-icon class="mr-2">mdi-check</v-icon> Vincular
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapActions } from "vuex";

export default {
	data() {
		return {
			dialog: false,
			loading: false,
			loadingCep: false,

			form: {
				valid: true,
				codigo_vinculacao: "",
				horta_id: "",
			},
		};
	},

	computed: {
		rules() {
			return {
				codigo_vinculacao: [
					(v) => {
						if (!v) return "O código é obrigatório";
						if (v.length > 75) return "O código deve ter no máximo 7 caracteres";
						if (v?.trim() === "") return "O código não pode ser vazio";
						if (!/^[0-9]+$/.test(v)) return "O código deve conter apenas números";
						return true;
					},
				],
			};
		},
	},

	watch: {
		dialog(val) {
			if (!val) {
				this.$refs.form.reset();
			}
		},
	},

	methods: {
		open(hortaId) {
			if (!this.dialog) {
				this.dialog = true;
				this.form.horta_id = hortaId;
				return true;
			}
			this.dialog = false;
			this.open();
		},

		salvar() {
			this.$refs.form.validate();
			if (!this.form.valid) return false;

			this.loading = true;
			this.vincularSensor({ ...this.form })
				.then((res) => {
					this.getLeiturasHorta(this.form.horta_id).then(() => {
						this.dialog = false;
						this.loading = false;
					});
				})
				.catch(() => {
					this.loading = false;
				});
		},

		...mapActions({
			getLeiturasHorta: "horta/getLeiturasHorta",
			vincularSensor: "horta/vincularSensor",
		}),
	},
};
</script>
