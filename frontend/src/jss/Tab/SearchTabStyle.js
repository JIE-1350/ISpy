import { padding } from "@mui/system";

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
        searchBar: {
            display: "flex",
            width: "100%",
            paddingBottom: "10px",
            flexWrap: 'wrap'
        },
        textFeild: {
            width: "150px",
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