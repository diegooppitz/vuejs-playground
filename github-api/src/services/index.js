import axios from 'axios';

export const getUser = (user) => {
    return axios({
        method: 'GET',
        url: `https://api.github.com/users/${user}`,
    })
}

export const getPublicRepos = (user) => {
    return axios({
        method: 'GET',
        url: `https://api.github.com/users/${user}/repos`,
    })
}

export const getStarredRepos = (user) => {
    return axios({
        method: 'GET',
        url: `https://api.github.com/users/${user}/starred`,
    })
}