// imports from axios
import axios from 'axios'

//imports from file
import { globalVariables } from '../constants/globalVariables'
import { BEARER_TOKEN, PERSIST_KEY } from '../constants/constants'
import { toast } from 'react-hot-toast'
import storage from 'redux-persist/lib/storage'

export const api = async (endpoint, data, type) => {
  let response

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(BEARER_TOKEN)}`
  }

  try {
    switch (type) {
      case 'post':
        response = await axios.post(
          `${globalVariables.API_BASE_URL}${endpoint}`,
          { ...data },
          {
            headers
          }
        )
        break

      case 'postMultipart':
        headers['Content-Type'] = 'multipart/form-data'
        response = await axios.post(`${globalVariables.API_BASE_URL}${endpoint}`, data, {
          headers
        })
        break
      case 'get':
        response = await axios.get(`${globalVariables.API_BASE_URL}${endpoint}`, {
          headers
        })
        break
      case 'put':
        response = await axios.put(`${globalVariables.API_BASE_URL}${endpoint}`, data, {
          headers
        })
        break
      case 'patch':
        response = await axios.patch(`${globalVariables.API_BASE_URL}${endpoint}`, data, {
          headers
        })
        break
      case 'delete':
        response = await axios.delete(`${globalVariables.API_BASE_URL}${endpoint}`, {
          data,
          headers
        })
        break
      default:
        return true
    }
  } catch (error) {
    if (error?.response?.status === 403) {
      localStorage.removeItem(BEARER_TOKEN)
      localStorage.removeItem(PERSIST_KEY)
      storage.removeItem(PERSIST_KEY)
    }
    toast.error(error?.response?.data?.message || error?.response?.data?.error)

    return error?.response
  }

  return response
}
