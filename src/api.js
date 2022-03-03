 

// Modoules get APIs
  export const getAPIsBase = () => {
    return new Promise(async(resolve, reject) => {
      const respond = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=1&_limit=1000`
      )
      const result = await respond.json();
      setTimeout(() => {
        resolve(result)
      }, 3000)
    })
  }
  
  

 
