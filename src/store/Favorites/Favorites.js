import {makeAutoObservable} from "mobx";


class Favorites {
    active = []

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
    }

    setActive() {
        localStorage.setItem("favorites", JSON.stringify(this.active))
    }

    InitActives() {
        const storageData = localStorage.getItem("favorites")
        this.active = storageData ? JSON.parse(storageData) : []
    }

    checkActive(id) {
        return this.active.indexOf(id) > -1
    }
}

export default new Favorites()