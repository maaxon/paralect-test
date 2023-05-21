import {Route, Router} from "wouter";
import {Container, createStyles} from "@mantine/core";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import {useEffect} from "react";

import AppHeader from "./components/Header/Header";
import Vacancies from "./pages/Vacancies/Vacancies";
import Favorites from "./pages/Favorites/Favorites";
import Vacancy from "./pages/Vacancy/Vacancy";

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
        <Router base={'/paralect-test'}>
            <AppHeader links={links}/>
            <Container className={classes.mainWrapper} fluid>
                <QueryClientProvider client={queryClient}>
                        <Route path={'/'} component={Vacancies}/>
                        <Route path={'/favorites'} component={Favorites}/>
                        <Route path="/vacancy/:id">{({id}) => <Vacancy id={id}/>}</Route>
                </QueryClientProvider>
            </Container>
        </Router>
    );
}

export default App;
