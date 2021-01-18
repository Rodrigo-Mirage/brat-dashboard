import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Typography from '@/pages/Typography/Typography';
import Tables from '@/pages/Tables/Tables';
import Notifications from '@/pages/Notifications/Notifications';
import Icons from '@/pages/Icons/Icons';
import Charts from '@/pages/Charts/Charts';
import Dashboard from '@/pages/Visits/Visits';
import Admin from '@/pages/Admin/Admin';
import Login from '@/pages/Login/Login';
import UserView from '@/pages/UserView/UserView';
import Signup from '@/pages/Signup/Signup';
import RunSubmit from '@/pages/RunSubmit/RunSubmit';
import ErrorPage from '@/pages/Error/Error';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography,
        },
        {
          path: 'tables',
          name: 'Tables',
          component: Tables,
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: Notifications,
        },
        {
          path: 'components/icons',
          name: 'Icons',
          component: Icons,
        },
        {
          path: 'components/charts',
          name: 'Charts',
          component: Charts,
        },
        {
          path: 'admin',
          name: 'Admin',
          component: Admin,
        },
        {
          path: 'user/:id',
          name: 'UserView',
          component: UserView,
        },
        {
          path: 'submitrun',
          name: 'Submitrun',
          component: RunSubmit,
        },
      ],
    },
    {
      path: '*',
      name: 'ErrorPage',
      component: ErrorPage,
    }
  ],
});
