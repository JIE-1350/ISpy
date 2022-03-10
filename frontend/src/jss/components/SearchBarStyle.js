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
        textFieldBar: {
            display: "flex",
            width: "calc(100% - 156.75px)",
        },
        searchDay: {
            width: "calc(33.3%)",

        },
        searchRange: {
            width: "calc(33.3%)",
            display: 'inherit'
        },
        textField: {
            width: "calc(16.6% - 5px)",
        },
        textFieldDay: {
            width: "calc(50% - 5px)",
        },
        textFieldRange: {
            width: "calc(50% - 5px)",
        },
    };
};

export default SearchBarStyle;