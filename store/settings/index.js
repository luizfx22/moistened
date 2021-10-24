export const state = () => ({
	preferDarkTheme: "",
	hortaAtual: null,
});

export const mutations = {
	toggleDarkThemePreference(state, to = false) {
		state.preferDarkTheme = to;
		return state.preferDarkTheme;
	},

	setHortaAtual(state, horta) {
		state.hortaAtual = horta;
		return state.hortaAtual;
	},
};

export const actions = {};

export const getters = {
	clientDefinedSettings(state) {
		return state;
	},

	hortaAtual(state) {
		return state.hortaAtual;
	},
};
