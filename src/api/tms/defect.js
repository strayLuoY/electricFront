import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-electric/defect/page',
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
    url: '/api/blade-electric/defect/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-electric/defect/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-electric/defect/update',
    method: 'post',
    data: row
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-electric/defect/detail',
    method: 'get',
    params: {
      id
    }
  })
}

