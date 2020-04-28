<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile> </v-card>
      </v-col>
      <v-col md="auto">
        <v-card>
          <ITabs />
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card class="pa-2" outlined tile> </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ITabs from "@/components/index/InfoTabs";
export default {
  components: {
    ITabs
  }
};
</script>

<style lang="scss" scoped></style>
