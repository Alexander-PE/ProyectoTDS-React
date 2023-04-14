export const fetchApi = (setData) => {

  fetch('http://localhost:3001/desaparecidos').then(res => res.json()).then( data => {
    // console.log(data)
    setData(data)
  }).catch(err => console.log(err))

}
