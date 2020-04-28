<template>
  <v-app-bar app clipped-right>
     <v-app-bar-nav-icon @click.stop="this.isSideBarOpen" />
    <v-btn to="{name: 'Index'}" >mdi-home</v-btn>
    <v-toolbar-title>Browse...</v-toolbar-title><v-spacer />
    <v-chip-group>
      <v-chip class="ma-2">Courses</v-chip>
      <v-chip class="ma-2">Free Lesson Friday</v-chip>
      <v-chip class="ma-2">Tone Tuesday</v-chip>
      <v-chip class="ma-2">Performances</v-chip>
      <v-chip class="ma-2">Backing Tracks</v-chip>
      <v-chip class="ma-2">Imported</v-chip>
      <v-chip class="ma-2">
        <v-avatar left> <v-icon>mdi-youtube</v-icon> </v-avatar>Youtube
      </v-chip>
    </v-chip-group>
  </v-app-bar>
</template>

<script>
export default {
  name: "BrowseAppBar",
  props: {
    browser: Boolean
  },
  computed: {
    drawer: {
      get(){ return this.$store.state.isSideBarOpen; },
      set(){ this.$store.dispatch("isSideBarOpen"); },
    },
    goto(page){
      return page;
    }
  },
  watch:{
    goto: { 
      handler: name => { 
        this.$router.push({name: name});
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
