<template>
	<v-app>
		<v-btn
			class="mb-10"
			:color="color"
			fab
			bottom
			absolute
			right
			light
			:dark="!$vuetify.theme.dark"
			@click.native.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
		>
			<v-icon>{{ icon }}</v-icon>
		</v-btn>
		<v-main id="layout-base" app>
			<v-container fill-height fluid>
				<v-row align="center" justify="center">
					<v-col>
						<Nuxt />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<script>
export default {
	data() {
		return {
			color: "amber darken-1",
			icon: "mdi-rotate-315 mdi-moon-waning-crescent",
		};
	},
	watch: {
		"$vuetify.theme.dark"(st) {
			if (!st) {
				this.color = "indigo darken-4";
				this.icon = "mdi-rotate-315 mdi-moon-waning-crescent";
				return false;
			}

			this.color = "amber darken-1";
			this.icon = "mdi-weather-sunny";
		},
	},
};
</script>
<style lang="scss" scoped></style>
