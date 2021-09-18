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
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{
				rel: "manifest",
				href: "/site.webmanifest",
			},
			{
				rel: "mask-icon",
				href: "/safari-pinned-tab.svg",
				color: "#5bbad5",
			},
		],
	},

	layoutTransition: {
		name: "layout-transtion__",
		mode: "in-out",
	},

	css: ["~/assets/global.scss"],

	plugins: [
		"~/plugins/utils.client.js",
		"~/plugins/vuex-persistedstate.client.js",
		"~/plugins/vue-mq.client.js",
	],

	components: true,

	buildModules: ["@nuxtjs/eslint-module"],

	modules: [
		"@nuxtjs/axios",
		"@nuxtjs/vuetify",
		[
			"nuxt-supabase",
			{
				supabaseUrl: process.env.NUXT_SUPABASE_URL,
				supabaseKey: process.env.NUXT_SUPABASE_ANON,
			},
		],
	],

	axios: {},

	vuetify: {
		customVariables: ["~/assets/variables.scss"],
		treeShake: true,
		theme: {
			options: {
				customProperties: true,
			},
			themes: {
				dark: {
					primary: colors.orange.darken3,
					accent: colors.grey.lighten2,
					secondary: colors.amber.lighten2,
					info: colors.teal.lighten2,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.lightGreen.darken2,
				},
			},
		},
	},

	build: {
		analyze: false,
		babel: {
			plugins: [["@babel/plugin-proposal-private-property-in-object", { loose: true }]],
		},
	},
};
