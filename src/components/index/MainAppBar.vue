<template>
     <v-app-bar app clipped >
      <v-app-bar-nav-icon @click="this.isSideBarOpen" />
        <v-icon @click="goto('Index')">mdi-home</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>TXBA ProPlayer v8</v-toolbar-title>
      <v-spacer></v-spacer>
              <v-icon @click="goto('Browse')">mdi-magnify</v-icon>
           <v-menu left bottom> 
        <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-cogs</v-icon>
        </template>

        <ToolList />
      </v-menu>
    </v-app-bar>
</template>

<script>
    import ToolList from "@/components/index/ToolList";
    export default {
        name: "MainAppBar",
        props: {
            drawer: Boolean
        },
        components: {
            ToolList,
        },
        methods: {
            goto(name){
                return this.$router.push({name: name});
            },
            isSideBarOpen(){
                this.$store.dispatch('isSideBarOpen')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>