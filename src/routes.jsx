
import { Redirect } from "./Views/login/redirect";
import { Welcome } from "./Views/login/welcome";
import { Login } from './Views/login/login';

export const routes = [
    { path: '/', component: <Login /> },
    { path: '/welcome', component: <Welcome /> },
    { path: '/redirect', component: <Redirect />}
]