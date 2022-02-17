
def get_title(string):
    title = string.replace("_", " ")
    title = title.title()
    return title


def get_table(data_frame):
    columns = []
    samples = data_frame.head(20)
    for column in data_frame.columns:
        min_length = len(column) + 5
        for sample_feature in samples[column]:
            min_length = max(min_length, len(str(sample_feature)))
        num_pixel = (min_length * 10) + 20
        num_pixel = min(num_pixel, 500)
        columns.append({
            'title': get_title(column),
            'field': column,
            'cellStyle': {
                'textAlign': 'center',
                'borderRight': "0.5px solid lightgrey",
                'minWidth': str(num_pixel) + 'px',
                'fontSize': '14px'
            }
        })
    return {'columns': columns, 'data': data_frame.to_dict('records')}
