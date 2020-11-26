export const state = () => ({
  logged: false,
  token: null,
  user: null,
})

export const mutations = {
  SET_LOGIN(state, payload) {
    state.logged = payload
  },
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { req, route, redirect }) {
    let [{ cookieService }, { tokenService }] = await Promise.all([
      import('../api/internal/service/cookie'),
      import('../api/internal/service/token'),
    ])

    let token = cookieService.getTokenFromCookie(req)
    if (!token) return

    let { _id } = tokenService.decode(token)
    if (await tokenService.verifyToken(token)) {
      commit('SET_LOGIN', true)
      commit('SET_TOKEN', token)
      commit('SET_USER', _id)
      if (route.path == '/admin') redirect('/dashboard')
    }
  },
}
export const getters = {
  logged: (state) => state.logged,
}
