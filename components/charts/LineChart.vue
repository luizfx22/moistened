<script>
import { Line } from "vue-chartjs";

export default {
	name: "LineChart",
	extends: Line,
	props: {
		cData: {
			type: Object,
			required: true,
		},
		cSettings: {
			type: Object,
			required: false,
			default: () => ({ responsive: true, maintainAspectRatio: false }),
		},
	},
	data() {
		return {};
	},
	mounted() {
		this.renderChart(this.cData, this.cSettings);
	},
	methods: {},
};
</script>
