export default async function ({ app, redirect }) {
	const session = await app.$supabase.auth.session();

	const { data, error } = app.$supabase
		.from("UsuariosGrupo")
		.select("*")
		.eq("usuario_id", session.user.id);

	console.log(data, error);

	// if (!session) {
	// 	redirect("/auth/login");
	// 	return false;
	// }

	return true;
}
