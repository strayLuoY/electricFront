import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-electric/overhaul/page',
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
    url: '/api/blade-electric/overhaul/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-electric/overhaul/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-electric/overhaul/update',
    method: 'post',
    data: row
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-electric/overhaul/detail',
    method: 'get',
    params: {
      id
    }
  })
}

