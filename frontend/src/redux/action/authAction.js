import { BEARER_TOKEN, USER_DATA } from '../../constants/constants'
import { api } from '../../api/api'
import toast from 'react-hot-toast'
import { globalVariables } from '../../constants/globalVariables'
export const login = data => {
  return async dispatch => {
    try {
      const response = await api(globalVariables?.authLogin, data, 'post')

      if (response?.data?.status === 200) {
        localStorage.setItem(BEARER_TOKEN, response?.data?.data?.authToken)
        dispatch({
          type: USER_DATA,
          payload: [response?.data?.data]
        })
        return response
      } else {
        toast.error(response?.data?.message)
      }
      return response
    } catch (error) {
      return error
    }
  }
}
export const logout = () => {
  return async dispatch => {
    const response = await api(globalVariables?.authLogout, {}, 'post')
    dispatch({
      type: USER_DATA,
      payload: []
    })
    localStorage.removeItem(BEARER_TOKEN)
    return response
  }
}
export const registration = data => {
  return async () => {
    const response = await api(globalVariables?.authRegister, data, 'post')

    if (response?.status === 200) {
      toast.success(response?.data?.message)

      return response
    }
    return response
  }
}
export const forgotPassowrd = data => {
  return async () => {
    // const response = { data, status: 200 }

    const response = await api(globalVariables?.login, data, 'post')
    // if (response?.status === 200) {
    //   const rememberData = {
    //     ...data,

    //     remember: data?.remember
    //   }
    //   localStorage.setItem(BEARER_TOKEN, encryptData(response?.data?.data?.token))
    //   localStorage.setItem(REMEMBER, encryptData(JSON.stringify(rememberData)))
    //   dispatch({
    //     type: USER_DATA,
    //     payload: response?.data?.data
    //   })
    //   toast.success(response?.data?.message)

    //   return response
    // }
    return response
  }
}

export const authChangePassword = data => {
  return async () => {
    const response = await api(globalVariables?.authChangePassword, data, 'post')

    if (response?.status === 200) {
      toast.success(response?.data?.message)

      return response
    }
    return response
  }
}
