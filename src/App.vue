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
      const wsPayload = {"endpoint":"login", "id":this.curReq, "info":{"token": window.localStorage.getItem('token')}};
      await this.$store.commit('layout/SOCKET_SEND', wsPayload);
    }

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
      curReq: state => state.curReq
    }),
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
