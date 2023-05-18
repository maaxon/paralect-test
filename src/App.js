import './App.css';
import HeaderSimple from "./components/Header/Header";
import {Route} from "wouter";
import {Container, createStyles} from "@mantine/core";
import Vacancies from "./pages/Vacancies/Vacancies";
import Favorites from "./pages/Favorites/Favorites";
import Vacancy from "./pages/Vacancy/Vacancy";
import Empty from "./pages/Empty/Empty";

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import {useEffect} from "react";
import favorites from "./store/Favorites/Favorites";


const queryClient = new QueryClient();

const useStyles = createStyles((theme) => ({
    mainWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

function App() {


    const links = [
        {
            "link": "/",
            "label": "Поиск Вакансий"
        },
        {
            "link": "/favorites",
            "label": "Избранное"
        }
    ]

    const {classes} = useStyles();

    useEffect(() => {
        favorites.InitActives()
    })

    return (
        <>
            <HeaderSimple links={links}/>
            <Container className={classes.mainWrapper} fluid>
                <QueryClientProvider client={queryClient}>
                    <Route path={'/'} component={Vacancies}/>
                    <Route path={'/favorites'} component={Favorites}/>
                    <Route path="/vacancy/:id">{({id}) => <Vacancy id={id}/>}</Route>
                    <Route path={'/empty'} component={Empty}/>
                </QueryClientProvider>
            </Container>
        </>
    );
}

export default App;
