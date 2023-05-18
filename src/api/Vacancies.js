import {generateParams} from "../helpers/helpers";
import getToken from "./Auth";

export const mainUrl = "https://startup-summer-2023-proxy.onrender.com/2.0/"
export const client_secret = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948"


export async function getHeaders() {
    const token = await getToken();

    return {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "Content-Type": "application/json",
        "X-Api-App-Id": client_secret,
        Authorization: "Bearer " + token
    };
}

export async function getVacancies(params = null) {
    const list = generateParams(params)
    const headers = await getHeaders()
    const response = await fetch(
        `${mainUrl}vacancies?${list}`, {
            method: "GET",
            headers,
        }
    )

    return await response.json()
}

export async function getVacancy(id) {
    const headers = await getHeaders()
    const response = await fetch(
        `${mainUrl}vacancies/${id}`, {
            method: "GET",
            headers,
        }
    )

    return await response.json()
}