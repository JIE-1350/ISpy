

def get_title(string):
    title = string.replace("_", " ")
    title = title.title()
    return title


def get_table(data_frame):
    columns = []
    for column in data_frame.columns:
        columns.append({'title': get_title(column), 'field': column})
    return {'columns': columns, 'data': data_frame.to_dict('records')}
