<template>
	<v-app>
		<v-navigation-drawer v-model="drawer" fixed app src="https://picsum.photos/1920/1080">
			<v-list class="pt-0">
				<v-list-item style="background-color: #15151555">
					<v-list-item-action>
						<v-img
							src="https://picsum.photos/200"
							width="50"
							height="50"
							style="border-radius: 100%"
						></v-img>
					</v-list-item-action>
					<v-list-item-content>
						<h3>Moistened</h3>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>
				<v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar fixed app>
			<v-app-bar-nav-icon class="ml-2" @click.stop="drawer = !drawer" />
			<v-toolbar-title>{{ $utils.capitalize($route.name) }}</v-toolbar-title>
		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			drawer: true,
			items: [
				// {
				// 	icon: "mdi-apps",
				// 	title: "Welcome",
				// 	to: "/",
				// },
				// {
				// 	icon: "mdi-chart-bubble",
				// 	title: "Inspire",
				// 	to: "/",
				// },
			],
		};
	},
	created() {},
};
</script>
<style lang="scss"></style>
