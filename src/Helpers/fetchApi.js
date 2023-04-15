export const fetchApi = (setData) => {

  fetch('http://localhost:3001/desaparecidos').then(res => res.json()).then( data => {
    setData(data)
  }).catch(err => console.log(err))

}
