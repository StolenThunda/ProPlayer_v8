<template>
<v-card>
    <v-row>
      <AppBar />
    </v-row>
    <v-row>
      <v-col cols="3"><SearchPanels /></v-col>
      <v-col cols="9">
        <RandoCard />
      </v-col>
    </v-row>
</v-card>
</template>

<script>
import RandoCard from "@/components/base/RandoCard";
import AppBar from "@/components/browse/appBar";
import SearchPanels from "@/components/browse/searchPanels";
export default {
  name: "Browse",
  components: {
    AppBar,
    RandoCard,
    SearchPanels
  }
};
</script>