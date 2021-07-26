import colors from "vuetify/es5/util/colors";

export default {
	ssr: false,

	target: "static",

	head: {
		titleTemplate: "%s",
		title: "Moistened",
		htmlAttrs: {
			lang: "pt-br",
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "Moistened é um gerenciador de hortas" },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	},

	layoutTransition: {
		name: "layout-transtion__",
		mode: "in-out",
	},

	css: ["~/assets/global.scss"],

	plugins: ["~/plugins/vuex-persist.client.js", "~/plugins/utils.client.js"],

	components: true,

	buildModules: ["@nuxtjs/eslint-module", "@nuxtjs/vuetify"],

	modules: ["@nuxtjs/axios", "@nuxtjs/firebase"],

	firebase: {
		config: {
			apiKey: "AIzaSyC98nDjp7jYXYTMwUGtHA-YUoLLcZXPY_o",
			authDomain: "moistened-d6474.firebaseapp.com",
			projectId: "moistened-d6474",
			storageBucket: "moistened-d6474.appspot.com",
			messagingSenderId: "1080727215809",
			appId: "1:1080727215809:web:0aa288b7263503bc53fe40",
		},
		services: {
			auth: {
				persistence: "local", // default
				initialize: {
					onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
					onAuthStateChangedAction: "onAuthStateChangedAction",
					subscribeManually: false,
				},
				ssr: false,
			},
		},
	},

	axios: {},

	vuetify: {
		customVariables: ["~/assets/variables.scss"],
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},

	build: {},
};
