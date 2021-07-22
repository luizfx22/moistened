<template>
	<v-card>
		<bar-chart v-if="type === 'bar'" :c-data="chartData"></bar-chart>
		<v-card-text v-else>
			Type <b>`{{ type }}`</b> isn't a valid chart type!
		</v-card-text>
	</v-card>
</template>

<script>
import BarChart from "./charts/BarChart.vue";

export default {
	components: { "bar-chart": BarChart },
	props: {
		type: {
			type: String,
			default: "bar",
			required: false,
		},
		chartData: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {};
	},
};
</script>

<style></style>
