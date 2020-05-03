<template>
<v-container>
<v-row>
  <v-col>
  <v-toolbar>
    <v-btn to="/" class="ma-2" text icon>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title>Browse...</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-chip-group>
      <v-chip class="ma-2" @click="load('courses')">Courses</v-chip>
      <v-chip class="ma-2">Free Lesson Friday</v-chip>
      <v-chip class="ma-2">Tone Tuesday</v-chip>
      <v-chip class="ma-2">Performances</v-chip>
      <v-chip class="ma-2">Backing Tracks</v-chip>
      <v-chip class="ma-2">Imported</v-chip>
      <v-chip class="ma-2">
        <v-avatar left> <v-icon>mdi-youtube</v-icon> </v-avatar>Youtube
      </v-chip>
    </v-chip-group>
    <v-spacer></v-spacer>
  </v-toolbar>
  </v-col>
</v-row>

</v-container>
</template>

<script>
export default {
  name: "BrowserAppbar",
};
</script>

<style lang="scss" scoped></style>
