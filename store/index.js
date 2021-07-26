export const state = () => ({
	user: {
		uid: "",
		email: "",
		displayName: "",
		photoURL: "",
	},
});

export const mutations = {
	ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser }) => {
		try {
			const { uid, email, displayName, photoURL } = authUser;
			state.user = { uid, email, displayName, photoURL };
		} catch (error) {}
	},

	DO_LOGOUT: (state) => {
		state.user = {
			uid: "",
			email: "",
			displayName: "",
			photoURL: "",
		};
	},
};

export const actions = {
	onAuthStateChangedAction: (store, { authUser, claims }) => {
		// Do nothing
	},
};
