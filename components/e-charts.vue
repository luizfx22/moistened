<template>
	<v-card :color="backgroundColor">
		<v-app-bar elevation="0" :color="backgroundColor" dense>
			<v-toolbar-title>
				<slot name="title"></slot>
			</v-toolbar-title>
		</v-app-bar>

		<!-- Container for chart -->
		<v-container fluid class="py-4">
			<div ref="chart-container" :style="{ width, height }"></div>
		</v-container>
	</v-card>
</template>
<script>
import * as echarts from "echarts";
import chalkTheme from "@/options/e-charts-themes/chalk.json";
import westerosTheme from "@/options/e-charts-themes/westeros";

echarts.registerTheme("chalk", chalkTheme);
echarts.registerTheme("westeros", westerosTheme);

export default {
	props: {
		options: {
			type: Object,
			required: true,
		},

		width: {
			type: String,
			default: "300px",
		},

		height: {
			type: String,
			default: "300px",
		},
	},

	data() {
		return {
			chart: null,
			chartDOM: null,
		};
	},

	computed: {
		backgroundColor() {
			if (this.$vuetify.theme.dark) return chalkTheme.backgroundColor;
			return westerosTheme.backgroundColor;
		},
	},

	watch: {
		options: {
			handler() {
				this.updateChart();
			},
			deep: true,
		},

		"$vuetify.theme.dark"(val) {
			// Remove some props from options
			delete this.options.title;

			// Dispose chart to reload theme
			this.chart.dispose();

			// Re-create chart
			this.chart = echarts.init(this.chartDOM, this.$vuetify.theme.dark ? "chalk" : "westeros");

			// Re-ser the options
			this.chart.setOption(this.options);
		},
	},

	mounted() {
		// Remove some props from options
		delete this.options.title;

		// Get div to mount the chart through ref
		this.chartDOM = this.$refs["chart-container"];

		// Initialize the chart
		this.chart = echarts.init(this.chartDOM, this.$vuetify.theme.dark ? "chalk" : "westeros");

		// Apply options to chart
		this.chart.setOption(this.options);
	},

	methods: {
		updateChart() {
			this.chart.dispose();
			this.chart = echarts.init(this.chartDOM, this.$vuetify.theme.dark ? "chalk" : "westeros");
			this.chart.setOption(this.options);
		},
	},
};
</script>
