const FilterFormStyle = () => {
    return {
        popover: {
            padding: '10px',
            border: 'solid 1px gray',
            borderRadius: '4px',
            width: '200px'
        },
        TextFieldContainer: {
            paddingBottom: '10px'
        },
        textField: {
            width: "200px"
        },
        addButtonContainer: {
            paddingRight: '5px',
            alignSelf: 'center',
        },
        addButton: {
            '&.MuiButton-root': {
                minWidth: "0px",
            }
        },
    };
};

export default FilterFormStyle;