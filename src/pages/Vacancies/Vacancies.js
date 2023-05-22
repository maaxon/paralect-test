import {useState} from 'react';
import {
    createStyles,
    Button,
    Container,
    Input,
    Pagination,
    em,
    LoadingOverlay
} from '@mantine/core';
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import {IconSearch} from '@tabler/icons-react';
import {useQuery} from "react-query";
import Filters from "../../components/Filters/Filters";
import {observer} from "mobx-react-lite";
import filters from "../../store/Filters/Filters";
import {getVacancies} from "../../api/Vacancies";
import {Link} from "wouter";


const useStyles = createStyles((theme) => ({
    main: {
        display: "grid",
        gridTemplateColumns: "25% 60%",
        gridColumnGap: "10%",
        width: "85%",
        justifyContent: "center",

        [`@media (max-width: ${em(800)})`]: {
            gridTemplateColumns: "100%",
            gridRowGap: "3%",
            width: "100%"
        },

    },

    vacancies: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0
    },

    pagination: {
        alignSelf: "center",
        marginTop: "2vh",
        justifyContent: "center",

        [`@media (max-width: ${em(800)})`]: {
            width: "85vw",
            marginBottom: "2vh"
        },
    },

}));


function Vacancies() {


    const {classes} = useStyles();

    const {data, refetch, isFetching} = useQuery(
        'getVacancies',
        () => getVacancies({
            payment_from: filters.from,
            payment_to: filters.to,
            catalogues: filters.catalogue,
            keyword: filters.search,
            published: 1
        })
    );

    const [page, setPage] = useState(1)

    if (isFetching) return <LoadingOverlay visible={isFetching} overlayBlur={2}/>

    const onFiltersSubmit = () => {
        refetch()
        setPage(1)
    }

    return (
        <main className={classes.main}>
            <Filters onSubmit={onFiltersSubmit}/>

            <Container className={classes.vacancies}>
                <Input
                    icon={<IconSearch size="1rem"/>}
                    placeholder="Введите название вакансии"
                    rightSection={
                        <div style={{right: 20}}><Button onClick={() => refetch()} size={"xs"}
                                                         data-elem="search-button">Поиск</Button></div>
                    }
                    rightSectionWidth={100}
                    value={filters.search}
                    onChange={(e) => filters.setSearch(e.target.value)}
                    data-elem="search-input"
                />

                {data.objects && data.objects.slice((page - 1) * 4, page * 4).map(vacancy =><VacancyCard id={vacancy.id}
                                                                                                      from={vacancy.payment_from}
                                                                                                      to={vacancy.payment_to}
                                                                                                      key={vacancy.id}
                                                                                                      title={vacancy.profession}
                                                                                                      desc={vacancy.type_of_work.title}
                                                                                                      location={vacancy.town.title}
                                                                                                      />)}

                <Pagination siblings={1} defaultValue={1} value={page} total={Math.ceil(data.objects.length / 4)}
                            onChange={(page) => setPage(page)} className={classes.pagination}/>

            </Container>
        </main>
    );
}

export default observer(Vacancies)