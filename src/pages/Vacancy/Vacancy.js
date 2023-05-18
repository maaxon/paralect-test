import {createStyles, Card, em, LoadingOverlay} from "@mantine/core";
import {useQuery} from "react-query";
import { getVacancy} from "../../api/Vacancies";
import {Parser} from 'html-to-react'

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

    main: {

        marginBottom: "3vh"
    }
}));


export default function Vacancy({id}) {

    const {classes} = useStyles();

    const {isLoading, data, isFetching} = useQuery(
        'getVacancy',
        () => getVacancy(id)
    );


    if (isFetching) return <LoadingOverlay visible={isFetching} overlayBlur={2}/>


    return (
        <main className={classes.wrapper}>

            {!isLoading &&
                <Card className={classes.title}>
                    <h2>{data.profession}</h2>
                    <p>з/п от {data.payment_from} rub</p>
                    <p>{data.town.title}</p>
                </Card>
            }

            {!isLoading &&
                <Card className={classes.main}>
                    {Parser().parse(data.vacancyRichText)}
                </Card>
            }


        </main>
    )
}