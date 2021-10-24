export const state = () => ({
	message: "",
	description: null,
	color: null,
	icon: {
		class: null,
		color: null,
	},
	position: "bottom-center",
	timeout: null,
	closeable: true,
	closeButton: {
		color: "red",
		text: "FECHAR",
	},
});

export const mutations = {
	showMessage(state, payload) {
		state = { ...payload, ...state };
	},

	reset(state) {
		state = {
			message: "",
			description: null,
			color: null,
			icon: null,
			timeout: 2000,
			position: "bottom-center",
			closeable: true,
			closeButton: {
				color: "red",
				text: "FECHAR",
			},
		};
	},
};
