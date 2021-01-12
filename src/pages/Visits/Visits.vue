<template>
  <div class="visits-page">
    <h1 class="page-title">Dashboard &nbsp;
      <small>
        <small>Template</small>
        <p>{{ this.first_name }}</p>
      </small>
    </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Visits',
  data() {
  },
  methods: {

  },
  computed: {
    ...mapState('layout', {
      first_name: state => state.first_name
    }),
  },
  mounted () {

  },
};
</script>

<style src="./Visits.scss" lang="scss" />
