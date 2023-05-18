import {makeAutoObservable} from "mobx";


class Favorites {
    active = []
    cards = []

    constructor() {
        makeAutoObservable(this)
    }

    toggleActive(id) {
        if (this.checkActive(id)) {
            this.active = this.active.filter(el => el !== id)
        } else {
            this.active.push(id)
        }
        this.setActive()
        this.checkCards()
    }

    setActive() {
        localStorage.setItem("favorites", JSON.stringify(this.active))
    }

    InitActives() {
        const storageData = localStorage.getItem("favorites")
        this.active = storageData ? JSON.parse(storageData) : []
    }

    InitFavorites(favorites) {
        this.cards = favorites
    }

    checkActive(id) {
        return this.active.indexOf(id) > -1
    }

    checkCards() {
        this.cards = this.cards.filter(({id}) => this.checkActive(id))
    }
}

export default new Favorites()