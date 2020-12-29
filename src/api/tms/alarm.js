import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-electric/alarm/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-electric/alarm/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-electric/alarm/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-electric/alarm/update',
    method: 'post',
    data: row
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-electric/alarm/detail',
    method: 'get',
    params: {
      id
    }
  })
}

