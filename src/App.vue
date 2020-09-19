<template>
  <div id="app">
  	<keep-alive :include="cachedViews">
  		<router-view :key="key" />
  	</keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    cachedViews() {
      return this.$store.state.cacheViews.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style>

</style>
