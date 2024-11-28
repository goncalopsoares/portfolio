import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactsView from '../views/ContactsView.vue'
import ProjectDetailsView from '@/views/ProjectDetailsView.vue'
import ExperienceView from '../views/ExperienceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/projects/:projectId',
      name: 'projectDetails',
      props: true,
      component: ProjectDetailsView

    },
    {
      path: '/experience',
      name: 'experience',
      component: ExperienceView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView
    },
  ]
})

export default router