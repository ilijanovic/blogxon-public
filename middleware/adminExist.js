import { config } from '~/config'

export default async function ({ $axios, redirect }) {
  let host =
    process.env.NODE_ENV === 'production'
      ? config.domain
      : `http://localhost:3000`
  let adminExist = await $axios.$get(host + '/api/internal/adminExist')
  if (adminExist) return redirect('/')
}
