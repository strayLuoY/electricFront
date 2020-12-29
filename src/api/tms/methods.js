import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-electric/way/page',
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
    url: '/api/blade-electric/way/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-electric/way/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-electric/way/update',
    method: 'post',
    data: row
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-electric/way/detail',
    method: 'get',
    params: {
      id
    }
  })
}

