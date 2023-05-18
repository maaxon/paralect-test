import empty from '../../misc/images/Frametest.svg'
import {createStyles, Button} from "@mantine/core";
import {Link} from "wouter";

const useStyles = createStyles((theme) => ({
    mainWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "65vh"
    }
}));

export default function Empty() {

    const {classes} = useStyles();

    return (
        <main className={classes.mainWrapper}>
            <img src={empty} alt="empty"/>
            <h2>Упс, здесь еще ничего нет!</h2>
            <Link to={'/'}><Button variant={"light"}>Поиск вакансий</Button></Link>
        </main>
    )
}