<template>
	<div></div>
</template>
<script>
export default {
	created() {
		this.$supabase.select();
	},
};
</script>
