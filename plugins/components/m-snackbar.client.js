export default ({ app, store }, inject) => {
	inject("snacks", {
		show(options) {
			if (typeof options === "string") {
				return store.commit("m-snackbar/showMessage", {
					message: options,
					cloaseable: false,
					timeout: 2500,
				});
			}
			return store.commit("m-snackbar/showMessage", { ...options });
		},

		info(message, description, position) {
			if (!message) throw new Error("Message cannot be blank.");

			return store.commit("m-snackbar/showMessage", {
				message,
				description,
				closeable: true,
				icon: {
					class: "mdi-exclamation",
					color: "grey darken-1",
				},
				position,
				timeout: 7200,
				closeButton: {
					color: "blue-grey lighten-4",
					text: "Fechar",
				},
			});
		},

		success(message, description, position) {
			if (!message) throw new Error("Message cannot be blank.");

			return store.commit("m-snackbar/showMessage", {
				message,
				description,
				closeable: true,
				icon: {
					class: "mdi-check",
					color: "success",
				},
				position,
				timeout: 7200,
				closeButton: {
					color: "green",
					text: "Fechar",
				},
			});
		},

		warning(message, description, position) {
			if (!message) throw new Error("Message cannot be blank.");

			return store.commit("m-snackbar/showMessage", {
				message,
				description,
				closeable: true,
				icon: {
					class: "mdi-exclamation",
					color: "amber darken-3",
				},
				position,
				timeout: 7200,
				closeButton: {
					color: "amber darken-2",
					text: "Fechar",
				},
			});
		},

		error(message, description, position) {
			if (!message) throw new Error("Message cannot be blank.");

			return store.commit("m-snackbar/showMessage", {
				message,
				description,
				closeable: true,
				icon: {
					class: "mdi-close",
					color: "red",
				},
				position,
				timeout: 7200,
				closeButton: {
					color: "red",
					text: "Fechar",
				},
			});
		},
	});
};
