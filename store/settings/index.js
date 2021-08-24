export const state = () => ({
	preferDarkTheme: "",
});

export const mutations = {
	toggleDarkThemePreference(state, to = false) {
		state.preferDarkTheme = to;
		return state.preferDarkTheme;
	},
};

export const actions = {};

export const getters = {
	clientDefinedSettings(state) {
		return state;
	},
};
