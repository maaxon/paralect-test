import {useEffect} from 'react';
import {createStyles, Header, Group, Burger, rem, em} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import logo from '../../misc/images/Unionlogog.svg'
import {Link, useLocation} from "wouter";


const useStyles = createStyles((theme, {opened}) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        border: "none",
        marginBottom: "3vh",
        [`@media (max-width: ${em(800)})`]: {
            justifyContent: 'space-around'
        }
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: "0 25% 0 10%",
    },

    burger: {
        marginRight: "10%",
        [`@media (min-width: ${em(800)})`]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            color: "#5E96FC",
        },
    },

    menu: {
        [`@media (max-width: ${em(800)})`]: {
            display: opened ? 'flex' : 'none',
            backgroundColor: "#FFFFFF",
            height: "25vh",
            width: "100vw",
            position: "fixed",
            top: "7%",
            zIndex: "1000",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
    }
}));


export default function AppHeader({links}) {
    const [opened, {toggle, close}] = useDisclosure(false);
    const {classes, cx} = useStyles({opened});

    const [location] = useLocation();


    useEffect(() => {
        window.addEventListener("scroll", () => close());
        return () => window.removeEventListener("scroll", () => close());
    }, []);

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={cx(classes.link, {[classes.linkActive]: location === link.link})}
            onClick={toggle}
        >
            {link.label}
        </Link>
    ));


    return (
        <Header height={60} className={classes.header}>

            <Link to={'/'}><Group spacing={10} className={classes.logoContainer}><img src={logo} alt="logo"/> <h2>Jobored</h2></Group></Link>
            <Group spacing={5} className={classes.menu}>
                {items}
            </Group>

            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>

        </Header>
    );
}