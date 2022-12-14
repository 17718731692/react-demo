import Home from '../components/Home/Home';
import LoginHome from '../components/LoginHome/LoginHome'
import Register from '../components/register';
const routers = [
  {
    title: '登录',
    path: '/',
    component: LoginHome,
  },
  {
    title: '注册',
    path: '/register',
    component: Register,
  },
  {
    title: '列表页',
    path: '/list',
    component: Home,
  },
];

export default routers;
