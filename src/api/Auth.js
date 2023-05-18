import {generateParams} from "../helpers/helpers";
import {client_secret} from "./Vacancies";

export default async function getToken() {
    const token = JSON.parse(localStorage.getItem("token"))
    const expires_in = JSON.parse(localStorage.getItem("expires_in"))

    if (!token || !expires_in || expires_in < Date.now()) {
        const {access_token, expires_in} = await Auth()
        localStorage.setItem("token", JSON.stringify(access_token))
        localStorage.setItem("expires_in", JSON.stringify(Date.now() + expires_in))
        return access_token
    }

    return token
}

export async function Auth() {


    const config = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-App-Id': client_secret,
            'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        }
    };


    const params = generateParams({
        login: "sergei.stralenia@gmail.com",
        password: "paralect123",
        client_id: 2356,
        client_secret,
        hr: 0
    })

    const result = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password?${params}`, config)
    return await result.json()
}