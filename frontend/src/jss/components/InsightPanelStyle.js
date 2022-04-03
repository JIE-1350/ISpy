const InsightPanelStyle = () => {
    return {
        insightPanel: {
            // borderBottom: "solid 1px gainsboro",
            border: "solid 1px gainsboro",
            borderRadius: "5px",
            width: '100%',
            height: '100%',
        },
        insightPanelHeader: {
            display: "flex",
            justifyContent: "space-between",
            width: 'calc(100% - 10px)',
            height: '10%',
            paddingLeft: '10px'
        },
        insightPanelBody: {
            width: '100%',
            height: '90%',
        },
    };
};

export default InsightPanelStyle;