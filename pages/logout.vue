<template>
	<v-main id="layout-base" app>
		<v-container fill-height fluid class="content-container__">
			<v-row align="center" justify="center">
				<v-col cols="12" sm="12" md="6" lg="4">
					<v-card flat light>
						<v-card-actions>
							<v-row class="fill-height" align-content="center" justify="center">
								<v-col class="text-subtitle-1 text-center" cols="12">
									<h3>Desconectando. Aguarde...</h3>
								</v-col>
								<v-col cols="12">
									<v-progress-linear
										color="teal darken-2"
										indeterminate
										rounded
										height="7"
									></v-progress-linear>
								</v-col>
							</v-row>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>
<script>
export default {
	layout: "empty",
	middleware: "auth",
	created() {
		this.$supabase.auth.signOut();

		if (window.localStorage.getItem("moistened")) {
			window.localStorage.removeItem("moistened");
		}

		this.$router.push("/auth/login");
	},
};
</script>
