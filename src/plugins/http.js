import request from "./request";
const url = 'https://a60.ronfu.top'
export function v1alpha1Plugins(data){
    return request({
        method: 'get',
        url: url + '/apis/hub.io/v1alpha1/plugins',
        params: data
    })
}
export function pluginScore(data){
    return request({
        method: 'post',
        url: url + '/apis/hub.io/v1alpha1/plugin/score',
        data: data
    })
}
