export const fetchApi = (setData) => {
    Promise.all([
      fetch("https://localhost:7286/api/people").then(value => value.json()),
      fetch("https://localhost:7286/api/Other").then(value => value.json()),
      fetch('https://localhost:7286/api/pet').then(value => value.json()), 
    ])  
      .then((value) => {
        let personas = value[0], cosas = value[1], animales = value[2]
        personas.map(item => item.type = "Persona" )
        cosas.map(item => item.type = "Cosa")
        animales.map(item => item.type = "Animal")
        let all = personas.concat(cosas, animales)
        console.log(all)
        setData(all)
      })
      .catch((err) => {
        console.log(err);
      });
  }