import VacancyCard from "../../components/VacancyCard/VacancyCard";
import {createStyles, em, LoadingOverlay, Pagination} from "@mantine/core";
import {useQuery} from "react-query";
import {getFavorites} from "../../api/Favorites";
import favorites from "../../store/Favorites/Favorites";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import Empty from "../Empty/Empty";

const useStyles = createStyles((theme) => ({
    wrapper: {
        width: "70vw",
        display: "flex",
        flexDirection: "column",
        marginBottom: "2vh",
        minHeight: "80vh",
        [`@media (max-width: ${em(800)})`]: {
            width: "85vw",
        },
    }
}));


const Favorites = () => {

    const {classes} = useStyles();


    const {data, isFetching, isRefetching} = useQuery(
        'getFavorites',
        () => getFavorites(favorites.active)
    );

    useEffect(() => {
        if (data) favorites.InitFavorites(data.objects)
    }, [data])

    const [page, setPage] = useState(1)


    if (!favorites.cards || favorites.cards.length === 0) return <Empty/>

    if (isFetching) return <LoadingOverlay visible={isRefetching} overlayBlur={2}/>

    return (
        <>
            <div className={classes.wrapper}>
                {!isFetching && favorites.cards.slice((page - 1) * 4, page * 4).map(obj => <VacancyCard id={obj.id}
                                                                                                        from={obj.payment_from}
                                                                                                        to={obj.payment_to}
                                                                                                        key={obj.id}
                                                                                                        title={obj.profession}
                                                                                                        desc={obj.type_of_work.title}
                                                                                                        location={obj.town.title}/>)}
            </div>
            {favorites.active.length > 4 &&
                <Pagination onChange={(number) => setPage(number)} total={Math.ceil(data.objects.length / 4)}/>}
        </>

    )
}

export default observer(Favorites)