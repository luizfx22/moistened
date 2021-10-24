<template>
	<div>
		<v-row>
			<v-col lg="4" cols="12">
				<moistened-chart :chart-data="fuckery">
					<template #title>
						<span>Hoje</span>
					</template>
				</moistened-chart>
			</v-col>
			<v-col lg="8" cols="12">
				<moistened-chart type="line" :chart-data="fuckery2">
					<template #title>
						<span>Esta semana</span>
					</template>
				</moistened-chart>
			</v-col>
		</v-row>

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
						color="green"
						v-on="on"
						@click="$refs.dialogNovaHorta.open"
					>
						<v-icon>mdi-store-plus</v-icon>
					</v-btn>
				</template>
				<span>Nova horta</span>
			</v-tooltip>
		</v-speed-dial>

		<dialogs-nova-horta ref="dialogNovaHorta"></dialogs-nova-horta>
	</div>
</template>

<script>
export default {
	name: "Dashboard",
	data() {
		return {
			bottomMenu: false,

			fuckery: {
				labels: ["00:00", "05:00", "10:00", "15:00", "20:00", "00:00"],
				datasets: [
					{
						label: "Umidade do solo",
						backgroundColor: "#f87979",
						data: [
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
						],
					},
				],
			},
			fuckery2: {
				labels: [
					"Segunda-Feira",
					"Terça-Feira",
					"Quarta-Feira",
					"Quinta-Feira",
					"Sexta-Feira",
					"Sábado",
					"Domingo",
				],
				datasets: [
					{
						label: "Umidade do solo",
						backgroundColor: "#7E57C2",
						data: [
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
							this.getRandomInt(),
						],
					},
				],
			},
		};
	},

	methods: {
		getRandomInt() {
			return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
		},
	},
};
</script>
