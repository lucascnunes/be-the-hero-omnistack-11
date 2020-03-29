import { store } from '../store'

const isAuthenticated = () => {
    const expire_at = store.state.expire_at
    const isLogged = store.state.isLogged
    const now = new Date()

    if (!isLogged) {

        return false

    } else if (isLogged && expire_at !== null && now < expire_at) {

        return true
        
    } else {

        store.commit('SET_EXPIRED', true)
        
        return false

    }

}

export default isAuthenticated