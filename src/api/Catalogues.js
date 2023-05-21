import {getHeaders, mainUrl} from "./Vacancies";

export async function getCatalogues() {
    const headers = await getHeaders()
    const response = await fetch(
        `${mainUrl}catalogues`, {
            method: "GET",
            headers,
        }
    )

    return await response.json()
}