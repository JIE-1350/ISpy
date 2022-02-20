const SearchBarStyle = () => {
    return {
        searchBar: {
            display: "flex",
            width: "100%",
            paddingBottom: "10px",
            flexWrap: 'wrap',
            paddingTop: "10px",
            paddingLeft: "5px"
        },
        searchDay: {
            width: "28%",

        },
        searchRange: {
            width: "28%",
            display: 'inherit'
        },
        textField: {
            width: "14%",
        },
        textFieldDay: {
            width: "50%",
        },
        textFieldRange: {
            width: "50%",
        },
    };
};

export default SearchBarStyle;