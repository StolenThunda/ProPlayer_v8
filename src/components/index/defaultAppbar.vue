<template>
  <v-toolbar>
    <slot name="toggle" />
    <v-icon>mdi-home</v-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title>TXBA ProPlayer v8</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="browser" class="ma-2" text icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="ma-2" text icon>
          <v-icon>mdi-cogs</v-icon>
        </v-btn>
      </template>

      <ToolList />
    </v-menu>
  </v-toolbar>
</template>

<script>
import ToolList from "@/components/index/ToolList";
export default {
  name: "DefaultAppBar",
  components: {
    ToolList
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
