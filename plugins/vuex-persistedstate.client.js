import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
	createPersistedState({
		key: "moistened",
		paths: ["settings"],
	})(store);
};
