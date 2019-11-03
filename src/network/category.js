import {request} from './request'
export function getCategory() {
    return request({
        url: '/category',
    })
}
export function getCategoryItem() {
    return request({
      url: '/category',
      params: {
          mainKey:582
      }
    })
  }
