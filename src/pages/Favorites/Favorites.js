import VacancyCard from "../../components/VacancyCard/VacancyCard";
import {createStyles, em, LoadingOverlay, Pagination} from "@mantine/core";
import {useQuery} from "react-query";
import {getFavorites} from "../../api/Favorites";
import favorites from "../../store/Favorites/Favorites";
import {observer} from "mobx-react-lite";
import {useState} from "react";
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

    },

    link:{
        textDecoration:"none",
        color:"none"
    }
}));


const Favorites = () => {

    const {classes} = useStyles();


    const {data, isFetching,isLoading} = useQuery(
        [favorites.active],
        () => getFavorites(favorites.active)
    );

    const [page, setPage] = useState(1)

    if (!favorites.active || favorites.active.length === 0) return <Empty/>

    if (isFetching || isLoading) return <LoadingOverlay visible={isFetching || isLoading} overlayBlur={2}/>

    return (
        <>
            <div className={classes.wrapper}>
                {!isFetching && data.objects.slice((page - 1) * 4, page * 4).map(vacancy =>  <VacancyCard
                    id={vacancy.id}
                    from={vacancy.payment_from}
                    to={vacancy.payment_to}
                    key={vacancy.id}
                    title={vacancy.profession}
                    desc={vacancy.type_of_work.title}
                    location={vacancy.town.title}
                    data-elem={`vacancy-${vacancy.id}`}/>)}
            </div>
            {favorites.active.length > 4 &&
                <Pagination onChange={(number) => setPage(number)} total={Math.ceil(data.objects.length / 4)}/>}
        </>

    )
}

export default observer(Favorites)