export default function Pricer({from, to}) {
    if (from === 0 && to === 0) return 'договорная'


    if (from === 0) return `до ${to}`

    if (to === 0) return `от ${from}`

    return `от ${from} до ${to}`
}