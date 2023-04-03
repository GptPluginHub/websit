import request from "./request";
export function getList(){
    return request({
        method: 'get',
        url: '/asd'
    })
}