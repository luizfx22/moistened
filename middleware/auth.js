export default async function ({ app }) {
	const session = await app.$supabase.auth?.session();

	console.log(session)

	// if (app.$supabase.auth?.currentUser?.aud !== "authenticated") {
	// 	return window.onNuxtReady(() => {
	// 		window.$nuxt.$router.push("/auth/login");
	// 	});
	// }

	return true;
}
