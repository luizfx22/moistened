export default function ({ app }) {
	console.log(app);
	return true;
	// if (!app.$fire.auth.currentUser) {
	// 	return window.onNuxtReady(() => {
	// 		window.$nuxt.$router.push("/auth/login");
	// 	});
	// }
}
