import Vue from "vue";

Vue.prototype.$utils = {
	/**
	 * Essa função capitaliza a string
	 * @param {String} string
	 * @returns String
	 */
	capitalize(string) {
		return string
			?.split("")
			.map((e, i) => (i === 0 ? e.toUpperCase() : e))
			.join("");
	},
};
