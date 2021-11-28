<template>
	<v-snackbar
		v-model="show"
		:top="positioning.top"
		:bottom="positioning.bottom"
		:left="positioning.left"
		:right="positioning.right"
		:centered="positioning.center"
		:color="snackOptions.color"
		:timeout="snackOptions.timeout"
		transition="scroll-y-reverse-transition"
	>
		<div class="d-flex flex-row justify-start gap-9">
			<v-avatar
				v-if="snackOptions.icon"
				:color="snackOptions.icon.color"
				size="40"
				class="mt-auto mb-auto"
			>
				<v-icon dark>{{ snackOptions.icon.class }}</v-icon>
			</v-avatar>
			<div class="d-flex flex-column justify-start">
				<p class="mt-auto mb-auto">
					<b v-if="snackOptions.description">{{ snackOptions.message }}</b>
					<span v-else>{{ snackOptions.message }}</span>
				</p>
				<p v-if="snackOptions.description" class="mt-auto mb-auto text-sm-caption">
					{{ snackOptions.description }}
				</p>
			</div>
		</div>

		<template #action="{ attrs }">
			<v-btn :color="snackOptions.closeButton.color" text v-bind="attrs" @click="show = false">
				{{ snackOptions.closeButton.text }}
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
export default {
	data() {
		return {
			show: null,
			snackOptions: {
				message: "",
				description: null,
				color: null,
				icon: {
					class: null,
					color: null,
				},
				position: null,
				timeout: null,
				closeable: true,
				closeButton: {
					color: "red",
					text: "FECHAR",
				},
			},

			positioning: {
				top: false,
				bottom: false,
				center: false,
				left: false,
				right: false,
			},

			possiblePositioning: {
				"top-right": { top: true, bottom: false, center: false, left: false, right: true },
				"top-left": { top: true, bottom: false, center: false, left: true, right: false },
				"top-center": { top: true, bottom: false, center: true, left: false, right: false },
				"bottom-right": { top: false, bottom: true, center: false, left: false, right: true },
				"bottom-left": { top: false, bottom: true, center: false, left: true, right: false },
				"bottom-center": { top: false, bottom: true, center: false, left: false, right: false },
			},

			// Objetos limpos (não alterar!)
			snackOptions_: {
				message: "",
				description: null,
				color: null,
				icon: {
					class: null,
					color: null,
				},
				position: null,
				timeout: null,
				closeable: true,
				closeButton: {
					color: "red",
					text: "FECHAR",
				},
			},
		};
	},

	watch: {
		show(val) {
			if (!val) {
				this.$store.commit("m-snackbar/reset");
			}
		},
	},

	beforeCreate() {
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === "m-snackbar/showMessage") {
				this.snackOptions = { ...this.snackOptions_, ...mutation.payload };
				if (this?.snackOptions?.position) {
					if (Object.keys(this.possiblePositioning).includes(this.snackOptions?.position)) {
						this.positioning = { ...this.possiblePositioning[this.snackOptions?.position] };
					}
				}

				this.show = true;
			}
		});
	},
};
</script>
