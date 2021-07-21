import VuexPersistence from "vuex-persist";

export default ({ store }) => {
	new VuexPersistence({
		key: "moistened",
	}).plugin(store);
};
