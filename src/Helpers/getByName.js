export const GetByName = (data, name='') => {
    if(name === ''){
        return [];
    }
    name = name.toLowerCase();
    return data.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
};