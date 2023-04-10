export const fetchApi = (setData) => {

  fetch('http://localhost:3001/desaparecidos').then(res => res.json()).then( data => {
    console.log(data)
    setData(data)
  }).catch(err => console.log(err))

  // Promise.all([
  //   fetch('https://localhost:7286/api/people').then(value => value.json()),
  //   fetch('https://localhost:7286/api/Other').then(value => value.json()),
  //   fetch('https://localhost:7286/api/pet').then(value => value.json())
  // ])
  //   .then((value) => {
  //     const personas = value[0]; const cosas = value[1]; const animales = value[2]

  //     personas.map(item => item.type = 'Persona')
  //     cosas.map(item => item.type = 'Cosa')
  //     animales.map(item => item.type = 'Animal')

  //     const all = personas.concat(cosas, animales)
  //     console.log(all)
  //     setData(all)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
}
