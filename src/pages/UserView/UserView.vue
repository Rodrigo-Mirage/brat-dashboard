<template>
  <div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'UserView',
  data() {
      return{
        id: this.$route.params.id,
      }
  },
  created(){
      console.log("usuário: " + this.id);
  },
  computed: {
    ...mapState('layout', {
      userList: state => state.userList
    }),
  },
};
</script>

