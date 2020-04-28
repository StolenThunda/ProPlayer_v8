<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
     <SidebarTabs />
    </v-navigation-drawer>

     <MainAppBar />
     

    <v-content v-if="this.packageID" >
      <CourseContent :packageID="this.packageID" />
    </v-content>
  </v-app>
</template>
<script>
    import MainAppBar from "@/components/index/MainAppBar";
    import CourseContent from "@/components/proplayer/CourseContent";
    import SidebarTabs from "@/components/proplayer/SidebarTabs";
    export default {
        name: 'Proplayer',
        props: {
            packageID: null,
        },
        data: () =>({
            drawer: false,
            
        }),
        components: {
            MainAppBar,
            CourseContent,
            SidebarTabs
        },
        methods: {
            goBack(){
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
            },
        }        
    }
</script>

<style lang="scss" scoped>

</style>