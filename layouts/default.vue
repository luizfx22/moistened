<template>
	<v-app id="app" class="d-flex">
		<v-app-bar flat :style="`background: ${$vuetify.theme.dark ? '#111827' : 'whitesmoke'}`" app>
			<v-avatar size="40">
				<v-img
					src="/Moistened-Icon-V2.png"
					:class="!$vuetify.theme.dark ? 'mst-image-black' : ''"
				></v-img>
			</v-avatar>
			<span class="font-weight-bold d-none d-sm-flex ml-5"> Moistened </span>
			<v-spacer></v-spacer>
			<v-tooltip bottom>
				<template #activator="{ on: tooltip }">
					<v-btn icon small class="ml-2" @click="toggleDark(undefined)" v-on="{ ...tooltip }">
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
			<v-btn icon small class="ml-2 mr-2">
				<v-icon> mdi-bell-outline </v-icon>
			</v-btn>
			<!-- <div class="mst-divider"></div> -->
			<v-avatar color="primary" size="40">
				<v-img :src="userAvatar"></v-img>
			</v-avatar>
			<!-- <span class="font-weight-bold ml-2 d-none d-sm-flex"> {{ userName }} </span> -->
		</v-app-bar>

		<v-navigation-drawer
			v-model="sidebar"
			:permanent="$mq === 'lg'"
			fixed
			mini-variant
			mini-variant-width="73"
			:style="`background: ${$mq === 'lg' ? 'transparent' : ''}; top: ${$mq === 'lg' ? '64px' : '0px'}`"
		>
			<v-list nav dense>
				<v-list-item class="mb-0">
					<v-list-item-avatar v-if="$mq !== 'lg'" class="my-0 mb-2">
						<v-img
							src="/Moistened-Icon-V2.png"
							:class="!$vuetify.theme.dark ? 'mst-image-black' : ''"
						></v-img>
					</v-list-item-avatar>
				</v-list-item>
				<v-divider></v-divider>
				<v-list-item link class="mt-2">
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

		<v-main>
			<v-container>
				<nuxt></nuxt>
			</v-container>
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
		};
	},

	computed: {
		sidebar: {
			get() {
				return this.$mq === "lg";
			},
			set() {},
		},

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
<style lang="scss" scoped>
.split {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

.left {
	background-color: teal;
	overflow-y: scroll; /* it works! */
}

.right {
	flex: 1;
	background-color: orange;
	overflow-y: scroll; /* it works! */
}
</style>
