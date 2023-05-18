import {getHeaders, mainUrl} from "./Vacancies";
import {generateArrayParams} from "../helpers/helpers";

export async function getFavorites(ids) {
    if (ids.length < 1) return []

    const list = generateArrayParams("ids[]", ids)
    const headers = await getHeaders()

    const response = await fetch(
        `${mainUrl}vacancies?${list}`, {
            method: "GET",
            headers,
        }
    )

    return await response.json()
}