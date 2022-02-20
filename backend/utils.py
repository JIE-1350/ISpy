from datetime import date, datetime


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


def get_file_name(words=None, file_type='', files=None):
    if files is None:
        files = []

    def get_default_name():
        name = str(date.today())
        now = datetime.now()
        name += "_" + now.strftime("%H-%M-%S")
        return name + file_type

    if words:
        words = [i for i in words if i]
        if not words:
            return get_default_name()
        filename = ""
        for i, word in enumerate(words):
            filename += word + '_' if i < len(words) - 1 else word
        new_filename = filename + file_type
        count = 0
        while new_filename in files:
            count += 1
            new_filename = filename + '(' + str(count) + ')' + file_type
        filename = new_filename
        return filename
    return get_default_name()