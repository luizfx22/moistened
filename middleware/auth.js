export default function ({ app, redirect }) {
	if (!app.$supabase.auth?.currentUser) {
		return window.onNuxtReady(() => {
			window.$nuxt.$router.push("/auth/login");
		});
	}

	return true;
}
