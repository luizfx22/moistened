export default async function ({ app, redirect }) {
	const session = await app.$supabase.auth.session();

	// const { data, error } = app.$supabase
	// 	.from("UsuariosGrupo")
	// 	.select()
	// 	.eq('usuario_id', session)

	console.log(session, app.supabase);

	// if (!session) {
	// 	redirect("/auth/login");
	// 	return false;
	// }

	return true;
}
