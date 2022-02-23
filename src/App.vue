<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="text-center"
    >
    <h3>Modelo de lengua de señas colombiana</h3>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>