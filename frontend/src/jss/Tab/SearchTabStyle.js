const SearchTabStyle = () => {
    return {
        searchTab: {
            width: "100%",
            height: "calc(100vh - 52px)",
            display: "flex"
        },
        directoryWindow: {
            height: "100%",
            width: "15%",
        },
        mainWindow: {
            height: "100%",
            width: "85%",
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
        },
        filterBar: {
            height: "50px",
            width: "100%",
            borderTop: "solid 1px gainsboro",
            borderBottom: "solid 1px gainsboro",
            paddingTop: "10px"
        }
    };
};

export default SearchTabStyle;