import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PhotosView from '@/views/PhotosView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/photos', name: 'photos', component: PhotosView }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
