<template>
	<v-app>
		<v-main id="layout-base" app>
			<v-container fill-height fluid class="content-container__">
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
		return {};
	},
};
</script>
<style lang="scss" scoped>
#layout-base {
	background-image: url("/bg/farm2.jpg") !important;
	background-position: center;
	background-size: cover;

	.content-container__ {
		backdrop-filter: grayscale(0.5);
	}
}
</style>
