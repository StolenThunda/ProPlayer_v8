<template>
  <v-row>
    <v-col>
      <div class="resume">
        <v-row>
          <v-col>
            <v-btn color="primary">
              <v-icon left>mdi-play-circle </v-icon>Resume
            </v-btn>
            <br />
            <b>Albert’s Influence: Rockin Blues: Lesson 2 - Demonstration</b>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.resume {
  width: 100vw;
  height: 20vh;
  border: 1px solid rgb(66, 66, 66);
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  text-align: center;
}
.resume p,
.resume button {
  flex: 0.5;
  margin-bottom: 1rem;
}
</style>
