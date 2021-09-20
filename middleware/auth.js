export default function ({ app, redirect }) {
	console.log(app.$supabase.auth)
	if (!app.$supabase.auth?.currentUser) {
		return window.onNuxtReady(() => {
			window.$nuxt.$router.push("/auth/login");
		});
	}

	return true;
}
