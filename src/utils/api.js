const VACATIONS_API_URL = 'http://localhost:4000/api/2204-FTB-MT-WEB-PT'

export const apiCall = async (url, method='GET', token, body) => {

    let data = false;
    try {
        const response = await fetch(
            VACATIONS_API_URL + url,
            setToken(getFetchOptions(method, body), token)
        );
        data = await response.json;

        if(data.error) {
            throw data.error;
        }
    } catch(error) {
        console.log(error);
    }
    return data;
}

const getFetchOptions = (method, body) => {
    return {
        method: method.toUpperCase(),
        headers: {
            'Conten-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

const setToken = (body, token) => {
    return token ?
    Object.assign(body, {'Authorization': `Bearer ${token}`}) :
    body;
}

export const fetchVacations = async () => {
    const data = await apiCall('/vacations')
    if(!data || !data.data) {
        return []
    }
    return data.data.vacations || [];
}

export const loginUser = async () => {

}

export const registerUser = async () => {

}