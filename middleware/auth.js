export default async function ({ app }) {
	const session = await app.$supabase.auth?.session();

	if (!session) {
		return window.onNuxtReady(() => {
			window.$nuxt.$router.push("/auth/login");
		});
	}

	return true;
}
