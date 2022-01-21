const SearchTabStyle = () => {
    return {
        searchTab: {
            width: "100%",
            display: "flex"
        },
        directoryWindow: {
            height: "100%",
            width: "25%",
        },
        mainWindow: {
            height: "100%",
            width: "75%",
        },
        filterBar: {
            height: "50px",
            width: "100%",
            borderTop: "solid 1px gray",
            borderBottom: "solid 1px gray"
        },
		"@global": {
			"#overlay": {
			
			"visibility": "hidden",
			"position": "absolute",
			"left": "0px",
			"top": "0px",
			"width": "50%",
			"height": "50%",
			"textAlign": "center",
			"zIndex": "1000"
			}
		}
    };
};

export default SearchTabStyle;