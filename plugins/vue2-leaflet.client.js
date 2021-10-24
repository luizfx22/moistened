/* eslint-disable no-undef */

import Vue from "vue";
import {
	LMap,
	LTileLayer,
	LMarker,
	LPolyline,
	LRectangle,
	LCircleMarker,
	LCircle,
	LControl,
	LIcon,
	LTooltip,
} from "vue2-leaflet";

Vue.component("LMap", LMap);
Vue.component("LTileLayer", LTileLayer);
Vue.component("LMarker", LMarker);
Vue.component("LPolyline", LPolyline);
Vue.component("LCircle", LCircle);
Vue.component("LCircleMarker", LCircleMarker);
Vue.component("LControl", LControl);
Vue.component("LIcon", LIcon);
Vue.component("LTooltip", LTooltip);
Vue.component("LRectangle", LRectangle);

// Build icon assets.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.imagePath = "";
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LeafletPlugin = {
	install(Vue, options) {
		Vue.prototype.$L = L;
	},
};

Vue.use(LeafletPlugin);
