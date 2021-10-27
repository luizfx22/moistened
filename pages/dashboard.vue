<template>
	<div>
		<v-row>
			<v-col lg="6" cols="12">
				<e-charts :options="fuckery" width="100%">
					<template #title> <b>Diário</b> </template>
				</e-charts>
			</v-col>
			<v-col lg="6" cols="12">
				<e-charts :options="fuckery" width="100%">
					<template #title> <b>Semanal</b> </template>
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
import { mapGetters } from "vuex";

export default {
	name: "Dashboard",
	data() {
		return {
			bottomMenu: false,

			fuckery: {
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
					data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
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
						data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					},
				],
				yAxis: [
					{
						type: "value",
					},
				],
				series: [
					{
						name: "Email",
						type: "line",
						stack: "Total",
						areaStyle: {},
						emphasis: {
							focus: "series",
						},
						data: [120, 132, 101, 134, 90, 230, 210],
					},
				],
			},
		};
	},

	computed: {
		...mapGetters({
			hortaAtual: "settings/hortaAtual",
		}),
	},

	methods: {},
};
</script>
