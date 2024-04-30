import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
// const storedToken = localStorage.getItem("accessToken");
// const storedExpiration = localStorage.getItem("accessTokenExpiration");

// if (storedToken && storedExpiration) {
//     const expirationTime = parseInt(storedExpiration);
//     if (new Date().getTime() > expirationTime) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("accessTokenExpiration");
//     }
// }

// removeExpiredToken();

const getToken = () => {
    return `Bearer ${localStorage.getItem("accessToken")}`;
};


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

const userRequest = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: { token: `${getToken()}`}
    })
}

export { userRequest };
