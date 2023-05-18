export function generateParams(params) {
    let res = ''
    if (params === null) return res

    for (const [key, value] of Object.entries(params)) {
        res += `${key}=${value}&`
    }

    return res
}

export function generateArrayParams(title, params) {
    let res = ''
    for (let i in params) {
        res += `${title}=${params[i]}&`
    }
    return res
}

