const COHORT_NAME = "2204-FTB-MT-WEB-PT";
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const fetchPosts = async (token) => {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json()
    console.log(result.data.posts)
    return result.data.posts
}

export const registerUser = async (username, password) => {
    const register = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                username: username,
                password: password
            }
        })
    })
    const result = await register.json();
    console.log(result);
    return result.data.token
}

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                username: username,
                password: password
            }
        })
    })

    const result = await response.json()
    console.log(result)
    return result.data.token
}

export const handleSubmitPost = async (token, title, description, price, location) => {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            post: {
                title: title,
                description: description,
                price: price,
                location: location
            }
        })
    })
    const result = await response.json();
    console.log(result)
    return result
}

export const deletePosts = async (token, postId) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("error", error)
    }
}

export const newMessage = async (token, postId, comment) => {
    const response = await fetch(`${API_URL}/posts/${postId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message: {
                content: comment,
            }
        })
    })
    const result = await response.json();
    console.log(result)
    return result.data.post
}

export const fetchUser = async (token) => {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    console.log(result.data, token)
    return result.data
}

/*export const apiCall = async (url, method='GET', token, body) => {

    let data = false;
    try {
        const response = await fetch(
            POSTS_API_URL + url,
            setToken(getFetchOptions(method, body), token)
        );
        data = await response.json();

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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

const setToken = (body, token) => {
    return token ?
    Object.assign(body, {
        headers: Object.assign(body.headers, {'Authorization': `Bearer ${token}`}) 
    }) :
    body;
}

export const fetchPosts = async (token) => {
    const data = await apiCall('/posts', 'GET', token)
    if(!data || !data.data) {
        return []
    }
    return data.data.posts || [];
}

export const fetchPost = async(token, postId) => {

}

export const loginUser = async (username, password) => {
    const login = await apiCall("/users/login", "POST", null, {
        guest: {username, password}
    })
    return {
        user: login.data.user,
        token: login.data.token
    }
}

export const registerUser = async (username, password) => {
    const registration = await apiCall("/users/register", "POST", null, {
        user: {username, password}
    })
    return {
        user: registration.data.user,
        token: registration.data.token
    }
}
*/
