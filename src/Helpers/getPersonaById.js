
export const getPersonaById = (data, id) => {
    return data.find(item => (item.id === parseInt(id) && item.type === "Persona"))
}
