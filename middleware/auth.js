export default function ({ app }) {
	if (!app.$fire.auth.currentUser) {
		return window.onNuxtReady(() => {
			window.$nuxt.$router.push("/auth/login");
		});
	}
}
