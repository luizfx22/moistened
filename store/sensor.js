export const state = () => ({});

export const mutations = {};

export const actions = {
	async vincularSensorHorta(store, {horta_id, codigo_vinculacao}) {
		const { data: sensor, error: sensorError } = await this.$supabase.from('Sensor')
			.update({ horta_id })
			.eq('codigo_vinculacao', codigo_vinculacao);

		if (sensorError) {
			return this.$snacks.error("Ocorreu um erro ao vincular o sensor à horta!", sensorError.message);
		}

		this.$snacks.success("Sensor vinculado com sucesso!", "Aguarde enquanto sincronizamos os dados...");
		return sensor;
	},
};

export const getters = {};
