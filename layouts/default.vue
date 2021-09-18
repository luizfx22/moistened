<template>
	<v-app id="app" class="d-flex">
		<v-toolbar flat style="background: transparent">
			<v-avatar size="40">
				<v-img
					src="/Moistened-Icon.png"
					:class="!$vuetify.theme.dark ? 'mst-image-black' : ''"
				></v-img>
			</v-avatar>
			<span class="font-weight-bold d-none d-sm-flex ml-5"> Moistened </span>
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
			<v-avatar color="primary" size="40">
				<v-img :src="userAvatar"></v-img>
			</v-avatar>
			<span class="font-weight-bold ml-2 d-none d-sm-flex"> {{ userName }} </span>
		</v-toolbar>

		<v-navigation-drawer
			fixed
			permanent
			mini-variant
			mini-variant-width="56"
			style="background: transparent; margin-left: 7px; top: 64px"
		>
			<v-list nav dense>
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-folder</v-icon>
					</v-list-item-icon>
					<v-list-item-title>My Files</v-list-item-title>
				</v-list-item>
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-account-multiple</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Shared with me</v-list-item-title>
				</v-list-item>
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-star</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Starred</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	middleware: ["auth"],
	data() {
		return {
			darkThemeIcon: "mdi-rotate-315 mdi-moon-waning-crescent",
		};
	},

	computed: {
		isSystemOnDark() {
			return window.matchMedia("(prefers-color-scheme: dark)").matches;
		},

		user() {
			return this.$supabase?.auth?.currentUser || "";
		},

		userAvatar() {
			return this.user?.user_metadata?.avatar_url || "";
		},

		userName() {
			return this.user?.user_metadata?.full_name?.split(" ")[0] || "User";
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
