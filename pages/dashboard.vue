<template>
	<div>
		<v-row>
			<v-col lg="6" cols="12">
				<e-charts :options="dadosHoje" width="100%">
					<template #title>
						<b>Hoje ({{ leituraDiaria.periodo }})</b>
					</template>
				</e-charts>
			</v-col>
			<v-col lg="6" cols="12">
				<e-charts :options="dadosSemanal" width="100%">
					<template #title>
						<b>Média semanal ({{ leituraSemanal.periodo }}) </b>
					</template>
				</e-charts>
			</v-col>
		</v-row>

		<!-- FAB das opções base -->
		<v-speed-dial
			v-model="bottomMenu"
			class="fab-rotate"
			bottom
			right
			direction="top"
			fixed
			transition="slide-y-reverse-transition"
		>
			<template #activator>
				<v-btn
					v-model="bottomMenu"
					:class="bottomMenu ? 'p45' : 'm45'"
					color="primary"
					bottom
					right
					dark
					fab
				>
					<v-icon> mdi-close </v-icon>
				</v-btn>
			</template>

			<v-tooltip left>
				<template #activator="{ on, attrs }">
					<v-btn
						v-bind="attrs"
						fab
						dark
						small
						color="teal darken-1"
						v-on="on"
						@click="$refs.dialogNovaHorta.open"
					>
						<v-icon>mdi-store-plus</v-icon>
					</v-btn>
				</template>
				<span>Nova horta</span>
			</v-tooltip>

			<v-tooltip left>
				<template #activator="{ on, attrs }">
					<v-btn
						v-bind="attrs"
						fab
						dark
						small
						color="pink darken-3"
						v-on="on"
						@click="$refs.dialogVincularSensor.open"
					>
						<v-icon>mdi-link-variant-plus</v-icon>
					</v-btn>
				</template>
				<span>Vincular sensor</span>
			</v-tooltip>
		</v-speed-dial>

		<dialogs-nova-horta ref="dialogNovaHorta"></dialogs-nova-horta>
		<dialogs-vincular-sensor ref="dialogVincularSensor"></dialogs-vincular-sensor>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { DateTime } from "luxon";
import _ from "lodash";

export default {
	name: "Dashboard",
	data() {
		return {
			bottomMenu: false,

			// Dados de leitura
			leituraSemanal: {
				headers: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
				periodo: "",
				dados: [],
			},

			leituraDiaria: {
				headers: [],
				periodo: "",
				dados: [],
				temperaturaAr: [],
				umidadeAr: []
			},
		};
	},

	computed: {
		...mapGetters({
			hortaAtual: "settings/hortaAtual",
			sensores: "horta/sensores",
		}),

		dadosHoje() {
			return {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985",
						},
					},
				},
				legend: {
					data: ["Umidade do solo", "Umidade do ar (%)", "Temperatura do ar (ºC)"],
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: [
					{
						type: "category",
						boundaryGap: false,
						data: this.leituraDiaria.headers,
					},
				],
				yAxis: [
					{
						type: "value",
					},
				],
				series: [
					{
						name: "Umidade do solo",
						type: "line",
						stack: "Total",
						areaStyle: {},
						emphasis: {
							focus: "series",
						},
						data: this.leituraDiaria.dados,
					},
					{
						name: "Umidade do ar (%)",
						type: "line",
						stack: "Total",
						areaStyle: {},
						emphasis: {
							focus: "series",
						},
						data: this.leituraDiaria.umidadeAr,
					},
					{
						name: "Temperatura do ar (ºC)",
						type: "line",
						stack: "Total",
						areaStyle: {},
						emphasis: {
							focus: "series",
						},
						data: this.leituraDiaria.temperaturaAr,
					},
				],
			};
		},

		dadosSemanal() {
			return {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985",
						},
					},
				},
				legend: {
					data: ["Umidade do solo"],
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: [
					{
						type: "category",
						boundaryGap: false,
						data: this.leituraSemanal.headers,
					},
				],
				yAxis: [
					{
						type: "value",
					},
				],
				series: [
					{
						name: "Umidade do solo",
						type: "line",
						stack: "Total",
						areaStyle: {},
						emphasis: {
							focus: "series",
						},
						data: this.leituraSemanal.dados,
					},
				],
			};
		},
	},

	created() {
		this.$supabase.from('Leitura').on('INSERT', () => {
			this.getDadosDoDia();
			this.getDadosDaSemana();
		}).subscribe();
	},

	mounted() {
		this.getDadosDoDia();
		this.getDadosDaSemana();

		this.$store.subscribe((mutation) => {
			if (mutation.type === "settings/setHortaAtual") {
				this.getDadosDaSemana();
				this.getDadosDoDia();
			}
		});
	},

	methods: {
		getDadosDaSemana(hortaId = this.hortaAtual.id) {
			const today = DateTime.fromJSDate(new Date()).toLocal("pt-BR");
			const firstDateOfThisWeek = today.startOf("week");
			const lastDateOfThisWeek = today.endOf("week");

			this.leituraSemanal.periodo = `${firstDateOfThisWeek.toFormat(
				"dd/MM"
			)} - ${lastDateOfThisWeek.toFormat("dd/MM")}`;

			this.getLeituras(hortaId).then((dados) => {
				// this.getLeituras("16900b5b-053c-4ab5-ace6-c15b0561850b").then((dados) => {
				const leituras = dados.map((sens) => sens.Leitura);

				const dadosFinal = _.flattenDeep(leituras).filter((leitura) => {
					const readedAt = DateTime.fromISO(leitura.readed_at).toLocal("pt-BR");
					return readedAt >= firstDateOfThisWeek && readedAt <= lastDateOfThisWeek;
				});

				const result = [];

				for (const dayOfWeek in this.leituraSemanal.headers) {
					const pre = dadosFinal.filter((leitura) => {
						const readedAt = DateTime.fromISO(leitura.readed_at).toLocal("pt-BR");
						return readedAt.weekday - 1 === Number(dayOfWeek);
					});

					const countTotal = pre.map((leitura) => leitura.soil_humidity).reduce((a, b) => a + b, 0);

					let countAverage = 0;

					if (pre.length > 0) {
						countAverage = countTotal / pre.length;
					}

					result.push(countAverage.toFixed(1));
				}

				this.leituraSemanal.dados = [...result];
			});
		},

		getDadosDoDia(hortaId = this.hortaAtual.id) {
			const today = DateTime.fromJSDate(new Date()).toLocal("pt-BR");
			const firstHourOfDay = today.startOf("day");
			const lastHourOfDay = today.endOf("day");

			this.leituraDiaria.periodo = today.toFormat("dd/MM");

			this.getLeituras(hortaId).then((dados) => {
				// this.getLeituras("16900b5b-053c-4ab5-ace6-c15b0561850b").then((dados) => {
				const leituras = dados.map((sens) => sens.Leitura);

				const dadosFinal = _.flattenDeep(leituras).filter((leitura) => {
					const readedAt = DateTime.fromISO(leitura.readed_at).toLocal("pt-BR");
					return readedAt >= firstHourOfDay && readedAt <= lastHourOfDay;
				});

				this.leituraDiaria.headers = dadosFinal.map((leitura) => {
					const readedAt = DateTime.fromISO(leitura.readed_at);
					return readedAt.toFormat("HH:mm:ss");
				});

				this.leituraDiaria.dados = dadosFinal.map((leitura) => leitura.soil_humidity);
				this.leituraDiaria.temperaturaAr = dadosFinal.map((leitura) => leitura.air_temperature);
				this.leituraDiaria.umidadeAr = dadosFinal.map((leitura) => leitura.air_humidity);

				// for (const leitura of dadosFinal) {
				// this.leituraDiaria.headers.push(DateTime.fromISO(leitura.readed_at).toFormat("HH:mm:ss"));
				// this.leituraDiaria.dados.push(leitura.soil_humidity);
				// }
			});
		},

		...mapActions({
			getLeituras: "horta/getLeiturasHorta",
		}),
	},
};
</script>