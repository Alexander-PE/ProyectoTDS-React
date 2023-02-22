
export const getAnimalById = (data, id) => {
    return data.find(item => (item.id === parseInt(id) && item.type === "Animal"))
}
