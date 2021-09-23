<template>
	<v-card
		:style="`background: ${$vuetify.theme.dark ? '#1F2937' : '#FFFFFF'}; border-radius: 30px`"
		elevation="4"
	>
		<v-card-title>
			<h3 class="pl-5">
				<slot name="title"></slot>
			</h3>
		</v-card-title>

		<v-card-text>
			<bar-chart v-if="type === 'bar'" :c-data="chartData"></bar-chart>
			<line-chart v-else-if="type === 'line'" :c-data="chartData"></line-chart>
			<v-card-text v-else>
				Type <b>`{{ type }}`</b> isn't a valid chart type!
			</v-card-text>
		</v-card-text>
	</v-card>
</template>

<script>
import BarChart from "./charts/BarChart.vue";
import LineChart from "./charts/LineChart.vue";

export default {
	components: { "bar-chart": BarChart, "line-chart": LineChart },
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
