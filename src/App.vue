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
  },
  created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>

</style>
