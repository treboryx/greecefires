<template>
  <Map :fires="fires" />
</template>
<script>
export default {
  asyncData({ $axios }) {
    return $axios.get("/api/").then(res => {
      return { fires: res.data.data };
    });
  }
};
</script>
