import {makeAutoObservable} from "mobx";


class Filters{
    catalogue='';
    from ='';
    to ='';
    search = '';

    constructor() {
        makeAutoObservable(this)
    }

    setFrom(from){
        this.from = from
    }

    setTo(to){
        this.to = to
    }


    setCatalogue(catalogue){
        this.catalogue = catalogue
    }

    setSearch(search){
        this.search = search
    }

    clear(){
        console.log(this.catalogue)
        this.catalogue='';
        this.from ='';
        this.to ='';
    }
}

export default new Filters()