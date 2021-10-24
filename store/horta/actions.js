export default {
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
		console.log(data, error);
	},
};
