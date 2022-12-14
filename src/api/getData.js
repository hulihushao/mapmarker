/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-01 17:16:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 16:31:12
 */
import request from '../utils/request/request'
export default {
  getAllPoint(params){
   return request('/api/map-base/all-point','get',params)
  },
  getPic(params){
    return request('/api/map-base/all-pic','get',params)
  },
  postPic(data,progress){
    return request('/api/map-base/add-pic','post',data, {
                    "Content-Type": "multipart/form-data",},progress
)
  },
  postPoint(data){
    return request('/api/map-base/add-point','post',data)
  }
}
