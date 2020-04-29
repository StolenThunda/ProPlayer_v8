<template>
  <div>
      <defaultSidebar :v-show="isIndex" />
      <BrowserSidebar :v-show="isBrowse" />
  </div>
</template>

<script>
import BrowserSidebar from "@/components/browse/Sidebar";
import defaultSidebar from "@/components/index/defaultSidebar";
  export default {
    data: () => ({
      isIndex: false,
      isBrowse: false,
      isPlayer: false,
    }),
    components:{
      BrowserSidebar,
      defaultSidebar
    },
    created(){
      this.init();
      console.log('composite', this.$route.name)
    },
    methods: {
      init() {
        this.isIndex = this.drawerContent('index')
        this.isBrowse = this.drawerContent('browse')
        this.isPlayer = this.drawerContent('proplayer')
      },
      drawerContent: function(name) {this.$route.name === name},
    },
    watch:{
      '$route': 'init'
    }
  }
</script>

<style lang="scss" scoped>

</style>