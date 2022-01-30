const SearchTabStyle = () => {
    return {
        searchTab: {
            width: "100%",
            display: "flex",
            paddingTop: "10px"
        },
        directoryWindow: {
            height: "100%",
            width: "20%",
        },
        mainWindow: {
            height: "100%",
            width: "80%",
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
        },
        filterBar: {
            height: "50px",
            width: "100%",
            borderTop: "solid 1px gray",
            borderBottom: "solid 1px gray",
            paddingTop: "10px"
        }
    };
};

export default SearchTabStyle;