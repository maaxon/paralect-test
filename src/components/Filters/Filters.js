import {
    createStyles,
    Button,
    Container,
    Select,
    NumberInput,
    em,
    LoadingOverlay
} from '@mantine/core';
import {IconChevronDown, IconX} from '@tabler/icons-react';
import {useQuery} from "react-query";
import {observer} from "mobx-react-lite";
import filters from "../../store/Filters/Filters";


const useStyles = createStyles((theme) => ({


    filters: {
        width: "100%",
        height: "50vh",
        background: "#FFFFFF",
        borderRadius: 12,
        border: "1px solid #EAEBED",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        [`@media (max-width: ${em(800)})`]: {
            width: "88%"
        },
    },


    title: {
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    select: {
        width: "80%",
        lineHeight: "2.5"
    },

    numberInputs: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "37%",
        marginBottom: "10%",
        width: "80%",
        "h4": {
            marginBottom: 0
        },

        [`@media (max-width: ${em(800)})`]: {
            marginBottom: "4%"
        },
    },

    button: {
        width: "80%"
    },

    clear: {
        display: "flex",
        color: "grey",
        alignItems: "end",
        fontSize: "0.9rem",
        cursor: "pointer",
        "svg": {
            height: "0.9rem",
            marginBottom: "1%"
        }
    }
}));


const Filters = ({onSubmit}) => {


    const {classes} = useStyles();

    const {isLoading, data, isFetching} = useQuery(
        'catalogues',
        () =>
            fetch(
                'https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/', {
                    headers: {
                        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
                        "Content-Type": "application/json",
                        "X-Api-App-Id": "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948"
                    }
                }
            ).then((response) => response.json())
    );


    if (isLoading) return <LoadingOverlay visible={isFetching} overlayBlur={2}/>

    return (
        <Container className={classes.filters}>
            <div className={classes.title}>
                <h4>Фильтры</h4>
                <p className={classes.clear} onClick={() => filters.clear()}>Сбрость все <IconX/></p>
            </div>
            <Select
                label="Отрасль"
                placeholder="Выберить отрасль"
                rightSection={<IconChevronDown size="1rem"/>}
                rightSectionWidth={30}
                styles={{rightSection: {pointerEvents: 'none'}}}
                data={data && data.map(el => {
                    return {value: el.key, label: el.title_rus}
                })}
                className={classes.select}
                value={filters.catalogue}
                onChange={(e) => filters.setCatalogue(e)}
            />
            <div className={classes.numberInputs}>
                <h4>Оклад</h4>
                <NumberInput
                    placeholder="от"
                    value={filters.from}
                    onChange={(e) => {
                        filters.setFrom(e)
                    }}
                />
                <NumberInput
                    placeholder="до"
                    value={filters.to}
                    onChange={(e) => {
                        filters.setTo(e)
                    }}
                />
            </div>
            <Button onClick={onSubmit} className={classes.button}>
                Применить
            </Button>
        </Container>
    );
}

export default observer(Filters)