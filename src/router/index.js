import router from './routers'
import store from '../store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {isEmpty} from '../utils/common'
import {get} from '../api/menu'
import {getUserApi} from '../api/person'
import {menu_admin, menu_school} from './menu'

NProgress.configure({showSpinner: false});

import index from '../views/index'
import home from '../views/home/index'
import person from '../views/person/index'

const layout = {
  path: '/index',
  component: index,
  children: [
    {path: '/home', name: 'home', component: home},
    {path: '/person', name: 'person', component: person}
  ]
};

//动态添加路由
function generateRouter(menu) {
  let list = layout.children;
  let view = '';
  const authority = store.getters.user.authorities[0].authority;
  authority === 'ROLE_ADMIN'
      ? view = 'views'
      : view = 'views_school';
  menu.forEach(fistItem => {
    //一级菜单
    let firstObj = {};
    firstObj.path = `/${fistItem.path}`;
    firstObj.name = fistItem.path;
    firstObj.component = () => {
      return import(`@/${view}${firstObj.path}/index`)
    };
    //二级菜单
    if (fistItem.children && fistItem.children.length !== 0) {
      fistItem.children.forEach(secondItem => {
        let secondObj = {};
        secondObj.path = `/${fistItem.path}/${secondItem.path}`;
        secondObj.name = secondItem.path;
        secondObj.component = () => {
          return import(`@/${view}${secondObj.path}/index`)
        };
        //三级菜单
        if (secondItem.children && secondItem.children.length !== 0) {
          secondItem.children.forEach(thirdItem => {
            let thirdObj = {};
            thirdObj.path = `/${fistItem.path}/${secondItem.path}/${thirdItem.path}`;
            thirdObj.name = thirdItem.path;
            thirdObj.component = () => {
              return import(`@/${view}${thirdObj.path}/index`)
            };
            //三级菜单
            list.push(thirdObj)
          })
        } else {
          //二级菜单
          list.push(secondObj)
        }
      })
    } else {
      //一级菜单
      list.push(firstObj)
    }
  })
}

export function getRouter() {
  return new Promise(resolve => {
    getUserApi().then(result => {
      let user = result.data.resultParm.user;
      store.dispatch('setUser', user);
      let role = user.authorities[0].authority;
      let menu;
      if (role === 'ROLE_SCHOOL') {
        menu = menu_school;
        get().then(result => {
          let schoolId = result.data.resultParm.schoolId;
          store.dispatch('setSchoolId', schoolId)
        })
      } else {
        menu = menu_admin;
      }
      store.dispatch('setMenu', menu);
      generateRouter(menu);
      router.addRoutes([layout]);
      router.addRoutes([{
        path: "*",
        redirect: "/404"
      }]);
      router.addRoutes([{
        path: "",
        redirect: "/home"
      }]);
      resolve()
    });
  });
}

//添加路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  let token = store.getters.token;
  let isLogin = !isEmpty(token);
  if (to.path === "/") {
    next('/login');
    return
  }
  if (to.path === "/login") {
    next()
  } else {
    if (isLogin) {
      if (layout.children.length === 2) {
        getRouter();
        next()
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});

export default router
