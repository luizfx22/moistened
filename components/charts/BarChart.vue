<script>
import { Bar } from "vue-chartjs";

export default {
	name: "BarChart",
	extends: Bar,
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
