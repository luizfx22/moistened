<template>
	<div>
		<Chart :chart-data="chartData"></Chart>
	</div>
</template>

<script>
export default {
	name: "Dashboard",
	data() {
		return {
			chartData: {
				labels: [
					"Janeiro",
					"Fevereiro",
					"Março",
					"Abril",
					"Maio",
					"Junho",
					"Julho",
					"Agosto",
					"Setembro",
					"Outubro",
					"Novembro",
					"Dezembro",
				],
				datasets: [
					{
						label: "Data One",
						backgroundColor: "#f87979",
						data: [100, 125, 55, 69, 24, 110, 445, 321, 111, 266, 122, 110],
					},
					{
						label: "Data two",
						backgroundColor: "#A86669",
						data: [100.4, 65, 95, 119.1, 174, 260, 295, 421, 31, 186, 222, 30],
					},
				],
			},
		};
	},
};
</script>
