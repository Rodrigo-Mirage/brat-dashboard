<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
  <nav
    :class="{sidebar: true}"
  >
    <header class="logo">
      <router-link to="/app">Light <span class="fw-semi-bold">Blue</span></router-link>
    </header>
    <ul class="nav">
      <NavLink
        :activeItem="activeItem"
        header="Dashboard"
        link="/app/dashboard"
        iconName="flaticon-home"
        index="dashboard"
        isHeader
      />
      <NavLink
        :activeItem="activeItem"
        header="Submit a Run"
        link="/app/submitrun"
        iconName="flaticon-home"
        index="submitrun"
        isHeader
      />
      <NavLink
        :activeItem="activeItem"
        header="Admin"
        link="/app/admin"
        iconName="flaticon-home"
        index="admin"
        isHeader
      />
      <NavLink
        :activeItem="activeItem"
        header="Events"
        link="/app/events"
        iconName="flaticon-home"
        index="events"
        isHeader
      />
      <NavLink
        :activeItem="activeItem"
        header="Games"
        link="/app/games"
        iconName="flaticon-home"
        index="games"
        isHeader
      />
      <NavLink
        :activeItem="activeItem"
        header="Extras"
        link="/app/extras"
        iconName="flaticon-home"
        index="extras"
        isHeader
      />
    </ul>
  </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'primary',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'danger',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
