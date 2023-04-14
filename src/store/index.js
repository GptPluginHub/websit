import { createStore } from "vuex";
const store = createStore({
    state: {
        userInfo: {
            name: 'myname'
        }
    },
    mutations: {
        getUserInfo(state,name){
            state.userInfo.name = name
        }
    },
    actions: {
        asyncGetUserInfo({commit}){
            setTimeout(()=>{
                commit("getUserInfo", +new Date() + 'action')
            })
        }
    },
    getters:{

    }
})
export default store