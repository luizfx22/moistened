/* eslint-disable camelcase */
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
			return this.$snacks.error("Ocorreu um erro ao buscar as hortas!");
		}

		store.commit("SET_HORTAS", [...data]);
		return true;
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

		store.commit("ADD_HORTAS", data[0]);
		this.$snacks.success("Horta cadastrada com sucesso!");
		return data[0];
	},

	async getLeiturasHorta(store, horta_id) {
		const select = `id, sensor_mac, Leitura ( sensor_id, * )`;
		const { data, error } = await this.$supabase
			.from("Sensor")
			.select(select)
			.eq("horta_id", horta_id);

		if (error) {
			return this.$snacks.error("Ocorreu um erro ao sincronizar os dados!", error);
		}

		return [...data];
		// store.commit("SET_HORTA_SENSORES", data);
	},

	async editarHorta(store, form) {
		const { error } = await this.$supabase.from("Horta").update(form).eq("id", form.id);

		if (error) {
			return this.$snacks.error("Ocorreu um erro ao atualizar a horta!", error);
		}

		const { data } = await this.$supabase
			.from("Horta")
			.select("*")
			.eq(
				"proprietario_id",
				this.$supabase.auth.user()?.id || "95c51428-9666-42e9-8f38-05840b8d756e"
			);

		store.commit("SET_HORTAS", data);
		this.$snacks.success("Horta atualizada com sucesso!");
	},

	async vincularSensor(store, form) {
		const { data, error: sError } = await this.$supabase
			.from("Sensor")
			.select("id")
			.eq("codigo_vinculacao", form.codigo_vinculacao);

		if (sError) {
			this.$snacks.error("Ocorreu um erro ao vincular o sensor!", sError);
			throw new Error("Ocorreu um erro ao buscar o sensor!");
		}

		if (data.length < 1) {
			this.$snacks.error("Sensor não encontrado! Código de vinculação está incorreto!");
			throw new RangeError("Ocorreu um erro ao vincular o sensor!");
		}

		const { error } = await this.$supabase
			.from("Sensor")
			.update({ horta_id: form.horta_id })
			.eq("codigo_vinculacao", form.codigo_vinculacao);

		if (error) {
			this.$snacks.error("Ocorreu um erro ao vincular o sensor!", error);
			throw new RangeError("Ocorreu um erro ao vincular o sensor!");
		}

		return this.$snacks.success("Sensor vinculado com sucesso!");
	},
};
