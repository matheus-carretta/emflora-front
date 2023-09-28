import { AxiosError } from 'axios'
import { api } from './api'

export const getWithAuth = async (
  urlRequest: string,
  headers = {},
  extraConfig = {},
) => {
  const config = {
    ...extraConfig,
    headers: {
      ...headers,
    },
  }

  try {
    const response = await api.get(urlRequest, config)
    if (response.status === 200 || response.status === 201) {
      return response
    }
  } catch (error) {
    const err = error as AxiosError

    throw Error(err.message)
  }
}

export const deleteWithAuth = async (urlRequest: string, headers = {}) => {
  const config = {
    headers: {
      ...headers,
    },
  }
  try {
    const response = await api.delete(urlRequest, config)
    if (response.status === 200 || response.status === 201) {
      return response
    }
  } catch (error) {
    const err = error as AxiosError

    throw Error(err.message)
  }
}

export const postWithAuth = async <T>(
  urlRequest: string,
  params: T,
  headers = {},
) => {
  const config = {
    headers: {
      ...headers,
    },
  }
  try {
    const response = await api.post(urlRequest, params, config)
    if (response.status === 200 || response.status === 201) {
      return response
    }
  } catch (error) {
    const err = error as AxiosError

    throw err.message
  }
}

export const putWithAuth = async <T>(
  urlRequest: string,
  params?: T,
  headers = {},
) => {
  const config = {
    headers: {
      ...headers,
    },
  }
  try {
    const response = await api.put(urlRequest, params, config)
    if (response.status === 200 || response.status === 201) {
      return response
    }
  } catch (error) {
    const err = error as AxiosError

    throw err.message
  }
}
