<template>
	<div>Aguarde...</div>
</template>
<script>
export default {
	middleware: ["auth"],
	created() {
		this.$store.commit("DO_LOGOUT");
		this.$router.push("/auth/login");
	},
};
</script>
