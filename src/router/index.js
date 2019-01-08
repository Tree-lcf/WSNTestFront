import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import Index from '@/components/index'
import Configuration from '@/components/configuration'
import Example from '@/components/example'
import Items from '@/components/items'
import Port from '@/components/port'
import Report from '@/components/report'
import AddPort from '@/components/addport'
import AddExample from '@/components/addExample'
import ReportDetails from '@/components/reportDetails'
import EditorPort from '@/components/editorPort'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/Index',
          name: 'Items',
          component: Items
        },
        {
          path: '/Example',
          name: 'Example',
          component: Example
        },
        {
          path: '/Configuration',
          name: 'Configuration',
          component: Configuration
        },
        {
          path: '/Port',
          name: 'Port',
          component: Port
        },
        {
          path: '/Report',
          name: 'Report',
          component: Report
        },
      ]
    },
    {
      path: '/ReportDetails',
      name: 'ReportDetails',
      component: ReportDetails
    },
    {
      path: '/AddPort',
      name: 'AddPort',
      component: AddPort
    },
    {
      path: '/AddExample',
      name: 'AddExample',
      component: AddExample
    },
    {
      path: '/EditorPort',
      name: 'EditorPort',
      component: EditorPort
    },
  ]
})
