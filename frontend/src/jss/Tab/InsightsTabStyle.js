const InsightsTabStyle = () => {
    return {
        insightsTab: {
            width: "100%",
            height: "calc(100vh - 52px)",
            display: "flex"
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
    };
};

export default InsightsTabStyle;