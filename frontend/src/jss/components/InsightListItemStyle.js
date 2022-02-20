const InsightListItemStyle = () => {
    return {
        item: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '5px'
        },
        text: {
            paddingLeft: '7px'
        },
        redCircle: {
            width: '10px',
            height: '10px',
            background: 'red',
            borderRadius: '50%'
        },
        greenCircle: {
            width: '10px',
            height: '10px',
            background: 'green',
            borderRadius: '50%'
        },
        grayCircle: {
            width: '10px',
            height: '10px',
            background: 'gray',
            borderRadius: '50%'
        },
        yellowCircle: {
            width: '10px',
            height: '10px',
            background: 'yellow',
            borderRadius: '50%'
        },

    };
};

export default InsightListItemStyle;