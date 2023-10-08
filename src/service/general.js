import { initialAbility } from "@/libs/acl/config";
import { Ability } from "@casl/ability";
import { zergApi } from "./zerg";
const ability = new Ability();
export function initialize(router){
    zergApi.interceptors.request.use(
        (config)=> {
            const token = localStorage.getItem('accessToken')
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error)=>{
            return Promise.reject(error);
        }
    );

    zergApi.interceptors.response.use(null,(error)=>{
        if (error.response.status == 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            ability.update(initialAbility)
            router.push({name: 'auth-login'})
        }
        return Promise.reject(error);
    })
}