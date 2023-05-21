import {createStyles} from "@mantine/core";
import {IconMapPin, IconStar, IconPointFilled} from "@tabler/icons-react"
import {observer} from "mobx-react-lite";
import favorites from "../../store/Favorites/Favorites";
import Pricer from "../Pricer/Pricer";
import {Link} from "wouter";

const useStyles = createStyles((theme,{titleColor}) => ({
    card: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 6%",
        background: "#FFFFFF",
        borderRadius: 12,
        border: "1px solid #EAEBED",
        minHeight: 120,
        marginTop: "2vh"
    },

    title: {
        fontSize: 20, color: titleColor
    },

    mapPin: {
        height: 20, width: 20, color: "#ACADB9"
    },

    location: {
        display: "flex", alignItems: "center"
    },

    star: {
        strokeWidth: 1.5,
    },
    activeStar: {
        fill: "#5E96FC", color: "#5E96FC"
    },
    desc: {
        display: "flex",
        alignItems: "center",
        fontSize:17
    }, point: {
        width: "13px", height: "13px", color: "#7B7C88", margin: "0 4%", paddingTop: "1%"
    },

    content: {
        width: "90%", "p, h3": {
            marginTop: "0.7rem", marginBottom: "0.7rem"
        }
    }
}));

const VacancyCard = ({title, location, desc, from, id, to,titleColor="#5E96FC"}) => {

    const {classes} = useStyles({titleColor});

    return (
        <div className={classes.card}>
            <div className={classes.content}>
                <Link className={classes.link} to={`/vacancy/${id}`}>
                    <h3 className={classes.title}>{title}</h3>
                </Link>
                <p className={classes.desc}><b>з/п <Pricer from={from} to={to}/></b>
                    <IconPointFilled className={classes.point}/> {desc}</p>
                <p className={classes.location}>
                    <IconMapPin className={classes.mapPin}/>
                    {location}
                </p>
            </div>
            <p><IconStar onClick={() => favorites.toggleActive(id)}
                         className={`${classes.star} ${favorites.checkActive(id) && classes.activeStar}`}
                         data-elem={`vacancy-${id}-shortlist-button`}
            /></p>
        </div>
    )
}

export default observer(VacancyCard)