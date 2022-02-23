const InsightsTabStyle = () => {
    return {
        insightsTab: {
            width: "100%",
            height: "calc(100vh - 52px)",
            display: "flex"
        },
        directoryWindow: {
            height: "100%",
            width: "15%",
        },
        insightsWindow: {
            height: "calc(100% - 70px)",
            overflow: 'auto',
        },
        mainWindow: {
            height: "100%",
            width: "85%",
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
        },
    };
};

export default InsightsTabStyle;