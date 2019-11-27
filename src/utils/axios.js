import axios from 'axios'

export const axiosed = (url, options) => {
    debugger
  return new Promise((resolve, reject) => {
    if (options.method === 'POST' || options.method === 'post' ) {
        //post请求
        axios({
            method:'post',
            url,
            headers:options.headers,
            data: options.data.params
        })
          .then (res => {
              let data = Object.assign({code: res.status}, res.data)
              resolve(data)
          })
          .catch(res => {
              reject(res)
          })

    } else if( options.method === 'GET' || options.method === 'get' ) {
        //get请求
        axios({
            method:'get',
            url,
            params: options.data.params
        })
        .then (res => {
            resolve(res)
        })
        .catch(res => {
            reject(res)
        })

    }
    //  else if( options.method === 'PATCH' || options.method === 'patch' ) {

    //     axios.patch(url, options.data)
    //      .then (res => {
    //          resolve(res)
    //      })
    //      .catch(res => {
    //          reject(res)
    //      })
    //  } else if( options.method === 'PUT' || options.method === 'put' ) {
    //     axios.put(url, options.data)
    //      .then (res => {
    //          resolve(res)
    //      })
    //      .catch(res => {
    //          reject(res)
    //      })
    //  }
  })
}

