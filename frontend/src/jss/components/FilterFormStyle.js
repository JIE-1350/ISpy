const FilterFormStyle = () => {
    return {
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
        }
    };
};

export default FilterFormStyle;