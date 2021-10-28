export const state = () => ({});

export const mutations = {};

export const actions = {
	async vincularSensorHome(store, codigo) {
		const { data: sensor, error: sensorError } = await this.$supabase.from("Sensor");
	},
};

export const getters = {};
