
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('pages/admin/Index.vue') },
      { path: 'inputbarang', name: 'inputBarang', component: () => import('pages/admin/InputBarang.vue') },
      { path: 'datauser', name: 'dataUser', component: () => import('pages/admin/DataUser.vue') },
      { path: 'dataTiket', name: 'dataTiket', component: () => import('pages/admin/DataTiket.vue') },
      { path: 'formedit', name: 'formEdit', component: () => import('pages/admin/FormEdit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'userPage', component: () => import('pages/user/Index.vue') },
      { path: '/MyOrder', name: 'MyOrder', component: () => import('pages/user/MyOrder.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/guest/Login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/guest/Register.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
