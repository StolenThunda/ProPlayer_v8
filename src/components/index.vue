<template>
  <v-card>
    <v-row>
      <v-col>
        <Welcome />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Resume />
      </v-col>
    </v-row>
    <v-row>
      <v-col offset-md="2" md="8">
        <InfoTabs />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Welcome from "@/components/index/Welcome";
import Resume from "@/components/index/Resume";
import InfoTabs from "@/components/index/InfoTabs";
export default {
  name: "Default",
  components: {
    Welcome,
    Resume,
    InfoTabs,
  },
};
</script>

<style lang="scss" scoped></style>
