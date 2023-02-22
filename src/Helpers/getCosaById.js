export const getCosaById = (data, id) => {
    return data.find(item => (item.id === parseInt(id) && item.type === "Cosa"))
}
