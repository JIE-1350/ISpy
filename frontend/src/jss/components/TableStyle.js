const TableStyle = () => {
    return {
        tableContainer: {
            overflowX: 'auto',
            height: "calc(100vh - 220px)",
        },
        options: {
            headerStyle: {
                backgroundColor: '#1976d2',
                color: '#FFF',
                padding: '10px',
                borderRight: "0.5px solid white",
                textAlign: 'center'
            },
            cellStyle: {
                padding: '10px',
                textAlign: 'center',
                borderRight: "0.5px solid lightgrey",
            },
            columnsButton: true
        }
    };
};

export default TableStyle;