<template>
	<div ref="chart-container" :style="{ width, height }"></div>
</template>
<script>
import * as echarts from "echarts";

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

	mounted() {
		const chartDOM = this.$refs["chart-container"];
		const chart = echarts.init(chartDOM);
		chart.setOption(this.options);
	},
};
</script>
