module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: "babel-eslint",
	},
	extends: [
		"@nuxtjs",
		"prettier",
		"prettier/vue",
		"plugin:prettier/recommended",
		"plugin:nuxt/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		"prettier/prettier": "error",
		"no-console": "off",
	},
};
