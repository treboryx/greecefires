<template>
  <div class="w-full h-full">
    <GmapMap
      :center="myCoordinates"
      :zoom="zoom"
      class="w-full h-full bg-gray-500"
      ref="mapRef"
      :options="options"
      @dragend="handleDrag"
    >
    </GmapMap>

    <!-- Coordinates to help with debugging -->
    <coordinates
      v-if="debugging"
      :myCoordinates="myCoordinates"
      :mapCoordinates="mapCoordinates"
    />
  </div>
</template>
<script>
import * as MarkerClusterer from "marker-clusterer-plus";
import { mapStyle } from "../static/options";
import fires from "../fires.json";

export default {
  data() {
    return {
      fires,
      map: null,
      myCoordinates: {
        lat: 37.9432,
        lng: 23.6709
      },
      zoom: 10,
      options: {
        styles: mapStyle
      },
      storedMarkers: [],
      markerCluster: null,
      debugging: true,
      markers: [],
      place: null,
      currentMidx: null,
      infoOptions: {
        content: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markedMarker: null
    };
  },
  async mounted() {
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    }

    // does the user have a saved zoom? use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }

    // add the map to a data object
    await this.$refs.mapRef.$mapPromise.then(map => (this.map = map));

    this.fires.forEach(d => {
      const marker = new google.maps.Marker({
        position: d,
        map: this.map,
        icon: require("@/static/fire-icon.png")
      });

      this.markers.push(marker);
    });
    this.clusterMyMarkers();
  },
  methods: {
    clusterMyMarkers(action = "default") {
      const clusterOptions = {
        gridSize: 40,
        maxZoom: 10
        // styles: clusterStyle,
      };
      if (action === "default") {
        if (!this.markerCluster) {
          this.markerCluster = new MarkerClusterer(
            this.map,
            this.markers.filter(d => d.visible === true),
            clusterOptions
          );
        } else {
          this.markerCluster.clearMarkers();
          this.markerCluster = null;
          this.markerCluster = new MarkerClusterer(
            this.map,
            this.markers.filter(d => d.visible === true),
            clusterOptions
          );
        }
      } else if (action === "clear") {
        this.markerCluster.removeMarkers(
          this.markers.filter(d => d.visible === false)
        );
      }
    },
    setPlace(place) {
      this.myCoordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.zoom = 18;
      this.place = place;
    },
    usePlace(place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          },
          infoText: this.place.formatted_address
        });
        this.place = null;
      }
    },
    updateCoordinates(location) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latLng: location.latLng }, (result, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.place = result[0];
        }
      });
      if (this.infoWinOpen) this.infoWinOpen = false;
    },
    handleDrag() {
      // get center and zoom level, store in localstorage
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    }
  },
  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0
        };
      }

      return {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(4),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(4)
      };
    }
  }
};
</script>

<style scoped>
.vue-map-container {
  position: fixed;
}
</style>
