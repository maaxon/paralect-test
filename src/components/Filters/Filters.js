import {
    createStyles,
    Button,
    Container,
    Select,
    NumberInput,
    em,
} from '@mantine/core';
import {IconChevronDown, IconX} from '@tabler/icons-react';
import {useQuery} from "react-query";
import {observer} from "mobx-react-lite";

import filters from "../../store/Filters/Filters";
import {getCatalogues} from "../../api/Catalogues";


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

    const {data,isLoading} = useQuery(
        'catalogues',
        () => getCatalogues()
    );

    const onClear = () => filters.clear()

    const onFromChange = (number) => filters.setFrom(number)

    const onToChange = (number) => filters.setTo(number)

    const onCatalogueChange = (catalogue) => filters.setCatalogue(catalogue)


    return (
        <Container className={classes.filters}>
            <div className={classes.title}>
                <h4>Фильтры</h4>
                <p className={classes.clear} onClick={onClear}>Сбрость все <IconX/></p>
            </div>
            <Select
                label="Отрасль"
                placeholder="Выберить отрасль"
                rightSection={<IconChevronDown size="1rem"/>}
                rightSectionWidth={30}
                styles={{rightSection: {pointerEvents: 'none'}}}
                data={
                    !isLoading
                    ? data.map(el => {return {value: el.key, label: el.title_rus}})
                    : []
                }
                className={classes.select}
                value={filters.catalogue}
                onChange={onCatalogueChange}
                data-elem="industry-select"
            />
            <div className={classes.numberInputs}>
                <h4>Оклад</h4>
                <NumberInput
                    placeholder="от"
                    value={filters.from}
                    onChange={onFromChange}
                    data-elem="salary-from-input"
                />
                <NumberInput
                    placeholder="до"
                    value={filters.to}
                    onChange={onToChange}
                    data-elem="salary-to-input"
                />
            </div>
            <Button onClick={onSubmit} className={classes.button}>
                Применить
            </Button>
        </Container>
    );
}

export default observer(Filters)