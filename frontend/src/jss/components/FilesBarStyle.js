const FilesBarStyle = () => {
    return {
        filesBar: {
            height: "auto",
            padding: "0",
            overflow: "hidden",
            lineClamp: "1",
            wordBreak: "break-all",
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