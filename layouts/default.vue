<template>
	<v-app id="app">
		<v-toolbar flat app>
			<div>
				<v-avatar size="40">
					<v-img
						src="/Moistened-Icon.png"
						:class="$vuetify.theme.dark ? 'mst-image-white' : 'mst-image-black'"
					></v-img>
				</v-avatar>
				<span class="font-weight-bold">Moistened</span>
			</div>
			<v-spacer></v-spacer>
			<v-tooltip bottom>
				<template #activator="{ on: tooltip }">
					<v-btn icon small class="ml-3" @click="toggleDark(undefined)" v-on="{ ...tooltip }">
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
			<v-btn icon small class="ml-2">
				<v-icon> mdi-bell-outline </v-icon>
			</v-btn>
			<div class="mst-divider"></div>
			<v-avatar color="primary" size="40"></v-avatar>
			<span class="font-weight-bold ml-2">Luiz A.</span>
		</v-toolbar>
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

			document.documentElement.setAttribute(
				"data-color-scheme",
				this.$vuetify.theme.dark ? "dark" : "light"
			);
		},
	},
};
</script>
