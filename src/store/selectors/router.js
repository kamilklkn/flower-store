const getRouter = state => state.router
const getRuoterUrl = state => getRouter(state)
export const getProductSlug = state => state.router

// todo здесь явно делаю плохо, смотри в reselect
//  Восстанови уже нормальный сон и рабочее время