export default {
	ADD_HORTAS(state, horta) {
		if (typeof horta !== "object") throw new TypeError("Horta must be an object");
		state.hortas.push({ ...horta });
	},

	SET_HORTAS(state, hortas) {
		if (!Array.isArray(hortas)) throw new TypeError("Hortas must be an array");
		state.hortas = [...hortas];
	},
};
