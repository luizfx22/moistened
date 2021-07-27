module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: "babel-eslint",
		requireConfigFile: false,
	},
	extends: [
		"@nuxtjs",
		"plugin:nuxt/recommended",
		"prettier",
		"prettier/vue",
		"plugin:vue/essential",
		"plugin:prettier/recommended",
		"eslint:recommended",
	],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": "error",
		"no-console": "off",
	},
};
