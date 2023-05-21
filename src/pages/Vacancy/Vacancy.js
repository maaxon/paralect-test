import {createStyles, Card, em, LoadingOverlay} from "@mantine/core";
import {useQuery} from "react-query";
import { getVacancy} from "../../api/Vacancies";
import {Parser} from 'html-to-react'
import {IconMapPin} from "@tabler/icons-react";
import VacancyCard from "../../components/VacancyCard/VacancyCard";

const useStyles = createStyles((theme) => ({
    wrapper: {
        width: "50vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",


        [`@media (max-width: ${em(800)})`]: {
            width: "90vw"
        },
    },
    title: {
        "h1": {
            marginBottom: 0,
            marginTop: 0
        },
        marginBottom: "3vh"
    },

    mapPin: {
        height: 20, width: 20, color: "#ACADB9"
    },

    main: {
        margin: "3vh 0"
    }
}));


export default function Vacancy({id}) {

    const {classes} = useStyles();

    const {isLoading, data, isFetching} = useQuery(
        [id],
        () => getVacancy(id)
    );


    if (isFetching) return <LoadingOverlay visible={isFetching} overlayBlur={2}/>


    return (
        <main className={classes.wrapper}>

            {!isLoading &&
                <VacancyCard
                id={id}
                title={data.profession}
                location={data.town.title}
                desc={data.type_of_work.title}
                from={data.payment_from}
                to={data.payment_to}
                titleColor={"black"}
                />
            }

            {!isLoading &&
                <Card className={classes.main}>
                    {Parser().parse(data.vacancyRichText)}
                </Card>
            }


        </main>
    )
}