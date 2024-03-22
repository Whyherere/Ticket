import api from './api'

export const ticketState = {
    state: {
        tickets: JSON.parse(localStorage.getItem('tickets')) ?? [
            // {
            //     id: 1, 
            //     summary: 'Vue doesnt work!!!',     
            //     status: 'DONE', 
            //     priority: 'Высокая', 
            //     content: 'Vue doesnt work!!!Vue doesnt work!!!Vue doesnt work!!!', 
            //     from: 'Max', 
            //     create_date: '20.12.2024 ,18:15:23', 
            //     update_date: '20.12.2024 ,18:20:24', 
            //     answ: 'Delete your project, Max'
            // },
            // {
            //     id: 2,  
            //     summary: 'Vue doesnt work!!!',   
            //     status: 'DONE', 
            //     priority: 'Средняя', 
            //     content: 'Vue doesnt work!!!Vue doesnt work!!!Vue doesnt work!!!', 
            //     from: 'Max', 
            //     create_date: '20.12.2024,18:15:23', 
            //     update_date: '20.12.2024,18:20:24', 
            //     answ: 'Delete your project, Max'
            // },
            // {
            //     id: 3, 
            //     summary: 'Vue doesnt work!!!', 
            //     status: 'DONE', 
            //     priority: 'Низкая', 
            //     content: 'Vue doesnt work!!!Vue doesnt work!!!Vue doesnt work!!!', 
            //     from: 'Max', 
            //     create_date: '20.12.2024,18:15:23', 
            //     update_date: '20.12.2024,18:20:24', 
            //     answ: 'Delete your project, Max'
            // },
            // {
            //     id: 4, 
            //     summary: 'Vue doesnt work!!!', 
            //     status: 'DONE', 
            //     priority: 'Низкая', 
            //     content: 'Vue doesnt work!!!Vue doesnt work!!!Vue doesnt work!!!', 
            //     from: 'Max', 
            //     create_date: '20.12.2024,18:15:23', 
            //     update_date: '20.12.2024,18:20:24', 
            //     answ: 'Delete your project, Max'
            // },
            // {
            //     id: 5, 
            //     summary: 'Vue doesnt work!!!', 
            //     status: 'UNDONE', 
            //     priority: 'Средняя', 
            //     content: 'Vue doesnt work!!!Vue doesnt work!!!Vue doesnt work!!!', 
            //     from: 'Max', 
            //     create_date: '20.12.2024,18:15:23', 
            //     update_date: '20.12.2024,18:20:24', 
            //     answ: 'Delete your project, Max'
            // },
        ]
    },
    mutations: {
        ADD_TICKET(state, payload) {
            let date1 = Date.now()
            let date2 = new Date()
            const ticket = {
                id: date1,
                summary: payload.summary,
                status: "Created",
                priority: payload.priority,
                content: payload.content,
                from: payload.from,
                create_date: date2.toLocaleString(),
                update_date: "",
                answ: ""
            }

            state.tickets.push(ticket);
            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
        DELETE_TICKET(state, id) {
            state.tickets = state.tickets.filter((ticket) => {
                if (ticket.id != id) {
                    return ticket
                }
            })
            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
        REPLY_TICKET(state, payload) {
            state.tickets.forEach((ticket) => {
                if (ticket.id == payload.id) {
                    let date = new Date();
                    let update_date = date.toLocaleString()
                    ticket.answ = payload.ticketData.answ;
                    ticket.status = 'Done';
                    ticket.update_date = update_date;
                }
            })
            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
        SET_TICKET(state, payload) {

            state.tickets = payload
            localStorage.setItem('tickets', JSON.stringify(state.tickets))
            payload.forEach((time) => {
                time.create_date = new Date(time.create_date).toLocaleString()
                time.update_date = new Date(time.update_date).toLocaleString()
            })
        }
    },
    
    actions: {
        async getAllTickets({ commit }) {
            try {
                const res = await api.get("ticket/all")
                // console.log(res.data);
                commit("SET_TICKET", res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        },
        async editProfile ({ commit }) {
            try {
                const res = await api.get("user/")
                // console.log(res.data);
                commit("SET_TICKET", res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        },
        async getUserTickets({ commit }, username) {
            try {
                const res = await api.get("ticket/user/" + username)
                // console.log(res.data);
                commit("SET_TICKET", res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        },
        async addTicket({ commit }, ticketData) {
            try {
                await api.post("ticket", ticketData)
                commit("ADD_TICKET", ticketData)
                return res.data
            } catch (error) {
                console.log(error)
            }
        },
        async updateTicket({ commit }, { id, ticketData }) {
            try {
                await api.put("ticket/" + id, ticketData)
                commit("REPLY_TICKET", { id, ticketData })

            } catch (error) {
                console.log(error)
            }
        },
        async deleteTicket({ commit }, id) {
            try {
                await api.delete("ticket/" + id)
                commit("DELETE_TICKET", id)
            } catch (error) {
                console.log(error)
            }
        },
    }
}