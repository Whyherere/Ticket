import api from './api'

export const userState = {
    state: {
        // users: [
        //     {id: 1, full_name: 'Ivan', login: 'user', password: 'user', email: 'ivanator@ivan.ru', role: 'admin'},
        //     {id: 2, full_name: 'Max', login: 'barabanov', password: 'barabanov', email: 'barabanov@max.ru', role: 'user'},
        //     {id: 3, full_name: 'Ramil', login: 'seraphim', password: 'seraphim', email: 'seraphim@ramil.ru', role: 'user'},
        //     {id: 4, full_name: 'Arina', login: 'cheater777', password: ' cheater777', email: 'cheater777@arina.ru', role: 'user'},
        // ],
        curUser: JSON.parse(localStorage.getItem('user')) ?? '',
    },
    mutations: {
        LOGIN(state, payload){
            // state.users.forEach((user) => {
            //     if(user.login == payload.login && user.password == payload.password){
            //         state.curUser = user;
            //     }
            // })
            state.curUser = payload;
            localStorage.setItem('user', JSON.stringify(state.curUser))
        },
        LOGOUT(state){
            state.curUser = '';
            localStorage.removeItem('user')
        },
        EDIT_PROFILE(state, payload){
            if(state.curUser.id == payload.userData.id){
                state.curUser.password = payload.userData.password
                state.curUser.email = payload.userData.email
                state.curUser.full_name = payload.userData.full_name
            }
    },
    SET_USER(state, payload){
        state.curUser = payload
        localStorage.setItem('user', JSON.stringify(state.curUser))
    }
    },
    actions:{
        async login({commit},payload) {
            try{
                const res = await api.post("/login",payload)
               // console.log(res.data.user);
                commit("LOGIN",res.data.user)
                return res.data.user
            } catch(error){
                console.log(error)
            }
        },
        async editProfile({ commit }, {id, userData}) {
            try {
                const res = await api.put("user/" + id, userData)
                commit("EDIT_PROFILE", {id, userData})
            } catch (error) {
                console.log(error)
            }
        },
        async getUser({ commit }, id) {
            try {
                const res = await api.get("/user/" + id.id)
                commit("SET_USER", res.data.user)
                return res.data.user
            } catch (error) {
                console.log(error)
            }
        },
        
    }
}