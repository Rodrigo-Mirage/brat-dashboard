<template>
  <router-view />
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'App',
  methods:{
    ...mapActions(
      'layout', ['saveUser'],
    ),
  },
  async created() {
    const currentPath = this.$router.history.current.path;

    if (window.localStorage.getItem('authenticated') === 'true' && window.localStorage.getItem('curUser')) {
      await this.saveUser(window.localStorage.getItem('curUser'));
    }

    if (window.localStorage.getItem('authenticated') === 'false') {
      //if(this.$router.url !== '/login'){
      //  this.$router.push('/login');
      //}
    }
    else if (currentPath === '/' || currentPath === '/app') {
      this.$router.push('/app/dashboard');
    }
  },  
  computed: {
    ...mapState('layout', {
      authToken: state => state.authToken,
      sessionId: state => state.sessionId
    }),
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
