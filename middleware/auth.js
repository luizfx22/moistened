export default function ({ app, redirect }) {
	// export default async function ({ app, redirect }) {
	// 	const session = await app.$supabase.auth.session();

	// 	if (!session) {
	// 		redirect("/auth/login");
	// 		return false;
	// 	}

	return true;
}
