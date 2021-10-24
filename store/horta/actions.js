export default {
	async gravarHorta(store, form) {
		delete form.valid;
		const { data, error } = await this.$supabase.from("Horta").insert([
			{
				...form,
				proprietario_id: this.$supabase.auth.user(),
				createdBy: this.$supabase.auth.user(),
				updatedBy: this.$supabase.auth.user(),
			},
		]);
		console.log(data, error);
	},
};
