<template>  
    <v-content v-if="this.packageID" >
      <CourseContent :packageID="this.packageID" />
    </v-content>
</template>
<script>
    import CourseContent from "@/components/proplayer/CourseContent";
    export default {
        name: 'Proplayer',
        props: {
            packageID: null,
        },
        data: () =>({
            drawer: false,
            
        }),
        components: {
            CourseContent,
        },
        mounted(){
            console.dir(this.$route);
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