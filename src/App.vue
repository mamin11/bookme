<template>
  <v-app >
    <!-- <navigation></navigation> -->
    <!-- <v-main style="background-color: #121212 !important;" class="bg-gray-100"> -->
    <v-main class="bg-gray-100">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// import Navigation from './components/App/Navigation.vue'

export default {
  // components: {Navigation},
  name: 'App',
  computed: {
    routeName() {
      return this.$route.name
    }
  },
  mounted(){
    this.$session.start()
  },
  watch: {
    routeName() {
      if(this.routeName == 'Login') {
        this.$store.dispatch('setHideNav', true)
      } else {
        this.$store.dispatch('setHideNav', false)
      }
    }

  }
};
</script>
