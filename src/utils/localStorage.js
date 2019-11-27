export const localStorageSetItem = (cname, cvalue, exdays) => {
  debugger
  console.log(`cname:${cname}`)
  console.log(`cvalue:${cvalue}`)
  console.log(`exdays:${exdays}`)
    let d = new Date();
    let expires_time = d.getTime() + exdays * 1000;
    let cookieObj = {
      value: cvalue,
      expires: expires_time,
    };
    localStorage.setItem(cname, JSON.stringify(cookieObj));
  }

 export const localStorageGetItem = (c_name) => {
    debugger
    let cookieStr = localStorage.getItem(c_name);
    if (cookieStr) {
      let cookieObj = JSON.parse(cookieStr);
      let currentTime = new Date().getTime();
      if (currentTime - cookieObj.expires > 0) {
        localStorage.removeItem(c_name);
        return '';
      } else {
        return cookieObj.value;
      }
    }
    return '';
  }

  