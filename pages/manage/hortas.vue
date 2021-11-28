<template>
	<div>
		<v-row v-if="loading">
			<v-col>
				<v-skeleton-loader loading type="article"></v-skeleton-loader>
			</v-col>
		</v-row>

		<v-row v-else>
			<v-col v-for="(i, o) in hortasList" :key="o" cols="12">
				<v-card>
					<v-card-title> {{ i.descricao }} </v-card-title>
					<v-card-subtitle> {{ $utils.formatEndereco(i.localizacao) }} </v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {
			loading: true,
			hortasList: [],
		};
	},

	computed: {
		...mapGetters({
			hortas: "horta/hortas",
		}),
	},

	watch: {
		hortas: {
			handler(val) {
				if (!Array.isArray(val)) return;
				if (val.length === 0) return;

				const hortas = this?.hortas || [];

				this.hortasList = [];

				for (const horta of hortas) {
					this.hortasList.push({
						sensores: false,
						...horta,
					});
				}

				this.loading = false;
			},
			deep: true,
		},
	},

	async created() {
		this.loading = true;
		await this.getHortas();
		this.loading = false;
	},

	methods: {
		...mapActions({
			getHortas: "horta/getHortas",
		}),
	},
};
</script>
