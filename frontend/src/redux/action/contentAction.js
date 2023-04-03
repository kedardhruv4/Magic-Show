import { api } from '../../api/api'
import toast from 'react-hot-toast'
import { globalVariables } from '../../constants/globalVariables'
import { USER_DATA } from '../../constants/constants'

export const contentAdd = data => {
  return async () => {
    const response = await api(globalVariables?.contentAdd, data, 'postMultipart')
    if (response?.data?.status === 200) {
      return response
    } else {
      toast.error(response?.data?.message)
      return response
    }
  }
}

export const contentGet = (type, page, limit) => {
  return async () => {
    const response = await api(`${globalVariables?.contentGet}?type=${type}&page=${page}&limit=${limit}`, {}, 'get')
    if (response?.data?.status === 200) {
      return response
    } else {
      toast.error(response?.data?.message)
      return response
    }
  }
}
export const contentGetById = id => {
  return async () => {
    const response = await api(`${globalVariables?.contentGetById}?id=${id}`, {}, 'get')
    if (response?.data?.status === 200) {
      return response
    } else {
      toast.error(response?.data?.message)
      return response
    }
  }
}
export const contentUpdate = (id, data) => {
  return async () => {
    const response = await api(`${globalVariables?.contentUpdate}?id=${id}`, data, 'put')
    if (response?.data?.status === 200) {
      return response
    } else {
      toast.error(response?.data?.message)
      return response
    }
  }
}
export const contentDelete = id => {
  return async () => {
    const response = await api(`${globalVariables?.contentDelete}?id=${id}`, {}, 'delete')
    if (response?.data?.status === 200) {
      return response
    } else {
      toast.error(response?.data?.message)
      return response
    }
  }
}
export const subscription = (value, cardInput = '', cardName = '', cvv = '', expDate = '') => {
  return async dispatch => {
    const response = await api(
      `${globalVariables?.subscription}?isPaid=${value}&cardInput=${cardInput}&cardName=${cardName}&cvv=${cvv}&expDate=${expDate}`,
      {},
      'put'
    )
    if (response?.data?.status === 200) {
      dispatch({
        type: USER_DATA,
        payload: [response?.data?.data]
      })
      toast.success('You have successfully upgraded your plan')
      return response
    } else {
      toast.error(response?.data?.message)
      return response
    }
  }
}
export const coverImageUpload = data => {
  return async () => {
    const response = await api(globalVariables?.coverImageUpload, data, 'postMultipart')
    if (response?.data?.status === 200) {
      return response
    } else {
      toast.error(response?.data?.message)
      return response
    }
  }
}
