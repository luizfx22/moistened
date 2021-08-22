<template>
	<v-app>
		<v-navigation-drawer v-model="drawer" fixed absolute app src="https://picsum.photos/1920/1080">
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
			<v-app-bar-nav-icon class="ml-1 mr-1" @click.stop="drawer = !drawer" />
			<v-toolbar-title>{{ $utils.capitalize($route.name) }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-menu
				transition="slide-x-transition"
				bottom
				min-width="250px"
				class="mr-5 mt-5"
				rounded
				offset-y
			>
				<template #activator="{ on }">
					<v-btn icon x-large class="ml-1 mr-1" v-on="on">
						<v-avatar color="brown" size="48">
							<v-img v-if="user.photoURL || user.photoURL !== ''" :src="user.photoURL"></v-img>
							<span v-else>
								{{ user.avatarLetter }}
							</span>
						</v-avatar>
					</v-btn>
				</template>
				<v-card>
					<v-list-item-content class="justify-center">
						<div class="mx-auto text-center pr-5 pl-5">
							<v-avatar color="brown" size="80" class="mb-5">
								<v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
								<span v-else>
									{{ user.avatarLetter }}
								</span>
							</v-avatar>
							<h3>{{ user.displayName }}</h3>
							<p class="text-caption mt-1">{{ user.email }}</p>
							<v-divider class="my-3"></v-divider>
							<v-btn depressed rounded text nuxt to="/logout">
								<v-icon>mdi-logout</v-icon>
								<span class="pl-1">Desconectar</span>
							</v-btn>
						</div>
					</v-list-item-content>
				</v-card>
			</v-menu>
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
	middleware: ["auth"],
	data() {
		return {
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
	watch: {
		"$store.state.user": {
			handler(value) {
				this.user = { ...value, avatarLetter: value.displayName[0]?.toUpperCase() };
			},
			deep: true,
		},
	},
	created() {
		this.user = {
			...this.$store.state.user,
			avatarLetter: this.$store.state?.user?.displayName[0]?.toUpperCase(),
		};
	},
};
</script>
<style lang="scss"></style>
