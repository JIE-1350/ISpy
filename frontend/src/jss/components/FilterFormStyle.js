const FilterFormStyle = () => {
    return {
        addButtonContainer: {
            paddingRight: '5px',
            alignSelf: 'center'
        },
        addButton: {
            '&.MuiButton-root': {
                minWidth: "0px",
            }
        },
        popover: {
            padding: '5px',
            border: 'solid 1px gray',
            borderRadius: '4px',
            width: '200px'
        },
        textField: {
            width: "200px",
        }
    };
};

export default FilterFormStyle;