export default function ({ app }) {
	console.log(app.$supabase.auth?.session())
	// if (app.$supabase.auth?.currentUser?.aud !== "authenticated") {
	// 	return window.onNuxtReady(() => {
	// 		window.$nuxt.$router.push("/auth/login");
	// 	});
	// }

	return true;
}
