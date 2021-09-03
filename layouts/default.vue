<template>
	<v-app id="app">
		<v-navigation-drawer
			permanent
			fixed
			mini-variant-width="106px"
			floating
			mini-variant
		>
			<v-avatar class="d-block text-center mx-auto mt-7 mb-15" size="86">
				<v-img src="/Moistened-Icon.png"></v-img>
			</v-avatar>

			<v-list>
				<v-list-item class="mx-auto">
					<v-btn x-large text icon color="primary">
						<v-icon>mdi-chart-box-outline</v-icon>
					</v-btn>
				</v-list-item>
				<v-spacer></v-spacer>
			</v-list>

			<v-list dense nav style="position: fixed; bottom: 0; width: 100%">
				<v-list-item class="pb-5">
					<v-tooltip bottom>
						<template #activator="{ on: tooltip }">
							<v-btn icon class="mx-auto" @click="toggleDark(undefined)" v-on="{ ...tooltip }">
								<v-icon :color="$vuetify.theme.dark ? 'amber darken-1' : 'indigo darken-4'">
									{{ darkThemeIcon }}
								</v-icon>
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
import { mapGetters } from "vuex";

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

	computed: {
		isSystemOnDark() {
			return window.matchMedia("(prefers-color-scheme: dark)").matches;
		},

		...mapGetters({
			clientDefinedSettings: "settings/clientDefinedSettings",
		}),
	},

	beforeMount() {
		this.themeManager();
	},

	methods: {
		themeManager() {
			if (
				typeof this.clientDefinedSettings?.preferDarkTheme === "boolean" &&
				!this.clientDefinedSettings?.preferDarkTheme
			)
				return this.toggleDark(false);
			if (this.clientDefinedSettings?.preferDarkTheme) {
				return this.toggleDark(true);
			}
			if (
				this.isSystemOnDark &&
				!this.clientDefinedSettings?.preferDarkTheme &&
				typeof this.clientDefinedSettings?.preferDarkTheme !== "boolean"
			) {
				this.toggleDark(true);
				this.darkThemeIcon = "mdi-weather-sunny";
			}
		},

		toggleDark(to) {
			if (!to && typeof to !== "boolean") {
				this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			} else {
				this.$vuetify.theme.dark = to;
			}

			if (this.clientDefinedSettings?.preferDarkTheme !== this.$vuetify.theme.dark)
				this.$store.commit("settings/toggleDarkThemePreference", this.$vuetify.theme.dark);

			if (!this.$vuetify.theme.dark) {
				this.darkThemeIcon = "mdi-rotate-315 mdi-moon-waning-crescent";
			} else {
				this.darkThemeIcon = "mdi-weather-sunny";
			}

			document.documentElement.setAttribute("data-color-scheme", this.$vuetify.theme.dark ? "dark" : "light");
		},
	},
};
</script>
