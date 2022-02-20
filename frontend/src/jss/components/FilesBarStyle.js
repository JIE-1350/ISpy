const FilesBarStyle = () => {
    return {
        filesBar: {
            minHeight: "100%",
            borderRight: "solid 1px gainsboro",
            paddingRight: "4px"
        },
        fileButton: {
            '&.MuiButton-root': {
                minWidth: "100%",
                maxWidth: "100%",
                display: "flex",
                justifyContent: "flex-start"
            }

        },
        buttonTextSelected: {
            maxWidth: '100%',
            textTransform: 'none',
            fontSize: '16px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        buttonTextRegular: {
            paddingLeft: '5px',
            maxWidth: '100%',
            textTransform: 'none',
            fontSize: '16px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        }
    };
};

export default FilesBarStyle;