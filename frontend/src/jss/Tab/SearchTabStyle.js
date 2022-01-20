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