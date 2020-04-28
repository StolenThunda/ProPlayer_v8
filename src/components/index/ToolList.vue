<template>
<v-card>
  <v-list >
    <v-list-item-title>Tools</v-list-item-title>
        <v-list-item><v-icon left>mdi-music</v-icon>
          Guitar Tuner
          </v-list-item>
        <v-list-item><v-icon left>mdi-bug</v-icon>     
          Spider Drills Tool</v-list-item>
    <v-divider inset/>
    <v-list-item-title>Import</v-list-item-title>
        <v-list-item><v-icon left>mdi-youtube</v-icon>     
    Load Youtube Video</v-list-item>
    
    <v-divider inset/>
    <v-list-item-title>Account</v-list-item-title>
      <v-list-item @click="account"><v-icon left>mdi-account-circle</v-icon>
      Account Dashboard
      <sup><v-icon small right>mdi-open-in-new</v-icon></sup>
      </v-list-item>
      <v-list-item @click="forum"><v-icon left>mdi-account-group</v-icon>
      Local Forums
      <sup><v-icon small right>mdi-open-in-new</v-icon></sup>
      </v-list-item>
    
    <v-divider inset/>
    <v-list-item-title>Update</v-list-item-title>
      <v-list-item @click="refresh"><v-icon left>mdi-refresh</v-icon>
        Force Refresh
    </v-list-item>
  </v-list>
</v-card>
</template>

<script>
    export default {
        methods:{
          refresh(){
            window.location.reload(true);
          },
          forums(){
            window.open('https://texasbluesalley.com/forums');
          },
          account(){
            window.open('https://texasbluesalley.com/account');
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>