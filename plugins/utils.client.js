import Vue from "vue";
import VueMask from "v-mask";

// Bibliotecas externas
Vue.use(VueMask);

// Parâmetros customisados
const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
const mediumPassword =
	/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

// Funções
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

	/**
	 * Valida o email passado no primeiro parâmetro
	 * @param {String} email E-Mail que será validado
	 * @returns true se o email é valido
	 */
	email(email) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},

	/**
	 * Valida a complexidade da senha
	 * @param {String} string Senha à ser testada
	 * @returns 2 - Forte, 1 - Média, 0 - Fraca
	 */
	passwordStrength(string) {
		if (strongPassword.test(string)) return 2;
		if (mediumPassword.test(string)) return 1;
		return 0;
	},
};
