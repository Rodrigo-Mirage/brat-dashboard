<template>
  <router-view />
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'App',
  methods:{
    ...mapActions(
      'layout', ['loadUser'],
    ),
  },
  async created() {
    const currentPath = this.$router.history.current.path;

    if (window.localStorage.getItem('authenticated') === 'true' && window.localStorage.getItem('curUser')) {
      await this.loadUser(window.localStorage.getItem('curUser'));
      const wsPayload = {"endpoint":"login", "id":this.curReq, "info":{"token": window.localStorage.getItem('token')}};
      await this.$store.commit('layout/SOCKET_SEND', wsPayload);
    }
    if (currentPath === '/') {
      this.$router.push('/login');
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
