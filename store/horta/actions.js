export default {
	async getHortas(store) {
		const { data, error } = await this.$supabase
			.from("Horta")
			.select("*")
			.eq(
				"proprietario_id",
				this.$supabase.auth.user()?.id || "95c51428-9666-42e9-8f38-05840b8d756e"
			);

		if (error) {
			console.error(error);
			return this.$snacks.error("Ocorreu um erro ao buscar as hortas!");
		}

		store.commit("SET_HORTAS", [...data]);
	},

	async gravarHorta(store, form) {
		delete form.valid;

		const { data, error } = await this.$supabase.from("Horta").insert([
			{
				...form,
				proprietario_id: this.$supabase.auth.user()?.id,
				created_by: this.$supabase.auth.user()?.id,
				updated_by: this.$supabase.auth.user()?.id,
			},
		]);

		if (error) {
			console.error(error);
			return this.$snacks.error("Ocorreu um erro!", error);
		}

		store.commit("ADD_HORTA", data[0]);
		this.$snacks.success("Horta cadastrada com sucesso!");
		return data[0];
	},
};
