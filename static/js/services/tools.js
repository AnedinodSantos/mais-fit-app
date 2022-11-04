export function getCookie(name) {
    let cookie = {};
    
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    
    return cookie[name];
    
}


export async function makeRequest(url, method, body){

  let csrfToken = getCookie("csrftoken")
  
  let headers = {
      "X-Request-Width": "XMLHttpRequest",
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken
  }

  fetch(url, {
      method: method,
      headers: headers,
      body: body
  }).then(response => {
    if(response.ok){
      return response.json()
    }
  }).then(data => {
    console.log(data)
    if (JSON.parse(data) != null){
      window.location = "/sucesso/" + data
  }
  })
}