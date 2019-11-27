import  {axiosed} from './axios';
// import {localStorageGetItem,  localStorageSetItem} from './localStorage';
import { appId, appKey } from './defaultSettings'


let isFetchToken = false; //是否获取到Token
//定义请求方式
const request = async (url, options) => {
    if (options.method === 'upload') {
        options.method = 'post';
        options.headers = {
          Accept: 'application/json',
          UserId: sessionStorage.getItem('userid') || -1,
          ...options.headers,
        };
      } else {
        debugger
        options.body = JSON.stringify(options.data || {});
        options.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          UserId: sessionStorage.getItem('userid') || -1,
          ...options.headers,
        };
      }
      let response = {};
      try {
        await axiosed(url, options)
        .then(res => {
          response = res
        })
      } catch (err) {
       console.log(err)
      }
      console.log(`response:${response}`)
      // const data = await response.json();
      return response;
}

//获取Token
function getToken(name, overtimes) {
   let count = 0;
   return new Promise(resolve => {


     if (localStorage.getItem(name)) {
       resolve( localStorage.getItem(c_name));
       return;
     }
     let interval = setInterval(() => {
       count++;
       if (localStorage.getItem(name) || count > overtimes) {
         resolve(localStorage.getItem(name));
         clearInterval(interval);
       }
     }, 300);

     
   });
 }

 export default async function requestWrapper(url, options) {
    let token = '';
    if (!localStorage.getItem('access_token')) {
      if (!isFetchToken) {
        isFetchToken = true;
        let data = await request('./GetToken', {
          method: 'post',
          data: {
            appId: appId,
            appKey: appKey,
          },
        });
        token = data.token_type + ' ' + data.access_token;
        localStorage.setItem('access_token', token, data.expires_in);
        isFetchToken = false;
      } else {
        token = (await getToken('access_token', 200)) || '';
      }
    } else {
      token = localStorage.getItem('access_token');
    }
    options = {
      ...options,
      headers: {
        Authorization: token,
        ...options.headers,
      },
    };
    let response = await request(url, options);
    return response;
  }
  