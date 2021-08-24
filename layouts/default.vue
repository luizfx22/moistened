<template>
	<v-app id="app">
		<v-navigation-drawer
			:id="$vuetify.theme.dark ? 'app-navbar-dark' : 'app-navbar-light'"
			permanent
			absolute
			mini-variant-width="106px"
			floating
			mini-variant
		>
			<v-avatar class="d-block text-center mx-auto mt-7 mb-15" size="86">
				<v-img src="/Moistened-Icon.png"></v-img>
			</v-avatar>

			<v-list>
				<v-spacer></v-spacer>
			</v-list>

			<v-list dense nav style="position: fixed; bottom: 0; width: 100%">
				<v-list-item class="pb-5">
					<v-tooltip bottom>
						<template #activator="{ on: tooltip }">
							<v-btn icon class="mx-auto" @click="toggleDark(undefined)" v-on="{ ...tooltip }">
								<v-icon :color="$vuetify.theme.dark ? 'amber darken-1' : 'indigo darken-4'">{{
									darkThemeIcon
								}}</v-icon>
							</v-btn>
						</template>
						<span>
							Alterar tema para modo
							{{ !$vuetify.theme.dark ? "escuro" : "claro" }}
						</span>
					</v-tooltip>
				</v-list-item>
				<v-list-item class="pb-5">
					<v-btn icon class="mx-auto">
						<v-icon>mdi-cog</v-icon>
					</v-btn>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main :id="$vuetify.theme.dark ? 'app-container-dark' : 'app-container-light'" app>
			<nuxt />
		</v-main>
	</v-app>
</template>

<script>
export default {
	middleware: ["auth"],
	data() {
		return {
			darkThemeIcon: "mdi-rotate-315 mdi-moon-waning-crescent",
			drawer: true,
			items: [
				{
					to: "/my-devices",
					icon: "",
				},
			],
			user: null,
		};
	},

	methods: {
		toggleDark(to) {
			if (!to && typeof to !== "boolean") {
				this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			} else {
				this.$vuetify.theme.dark = to;
			}

			if (!this.$vuetify.theme.dark) {
				this.darkThemeIcon = "mdi-rotate-315 mdi-moon-waning-crescent";
			} else {
				this.darkThemeIcon = "mdi-weather-sunny";
			}
		},
	},
};
</script>
<style lang="scss">
#app-navbar-light {
	background-color: lighten(whitesmoke, 2);
}

#app-container-light {
	background-color: darken(whitesmoke, 3);
}

#app-navbar-dark {
	background-color: #303439;
}

#app-container-dark {
	background-color: #26292f;
}
</style>
