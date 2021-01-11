<template>
  <router-view />
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  created() {
    const currentPath = this.$router.history.current.path;

    if (window.localStorage.getItem('authenticated') === 'false') {
      if(this.$router.url !== '/login'){
        this.$router.push('/login');
      }
    }
    else if (currentPath === '/' || currentPath === '/app') {
      this.$router.push('/app/dashboard');
    }
  },  
  computed: {
    ...mapState('layout', {
      authToken: state => state.authToken,
    }),
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
