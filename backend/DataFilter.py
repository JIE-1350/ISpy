import pandas as pd


class DataFilter:
    def __init__(self):
        self.filters = []
        self.valid_type = ['equal', 'less', 'greater', 'null', 'not_null']

    def __call__(self, data):
        for filter in self.filters:
            if filter['type'] == "equal":
                data = data[data[filter['feature']] == filter['value']]
            elif filter['type'] == "less":
                data = data[data[filter['feature']] < int(filter['value'])]
            elif filter['type'] == "greater":
                data = data[data[filter['feature']] > int(filter['value'])]
            elif filter['type'] == "null":
                data = data[data[filter['feature']].isnull()]
            elif filter['type'] == "not_null":
                data = data[data[filter['feature']].notnull()]
        return data

    def add(self, type, feature, value):
        if not type and not feature:
            raise Exception("Type or feature can not be null")
        if type not in self.valid_type:
            raise Exception("Invalid filter type")
        if "null" not in type and not value:
            raise Exception("Value can not be null")

        self.filters.append({
            'type': type,
            'feature': feature,
            'value': value
        })

    def remove(self, index):
        self.filters.pop(index)

    def __str__(self):
        return self.filters.__str__()


if __name__ == '__main__':
    df = pd.read_csv('../backend/data/elonmusk.csv')
    print(df.iloc[0])
    my_data_filter = DataFilter()
    # my_data_filter.add('less', 'replies_count', 100)
    my_data_filter.add('not_null', 'quote_url', None)
    # my_data_filter.add('equal', 'hashtags', '[]')
    # my_data_filter.remove(3)
    new_df = my_data_filter(df)
    print(df['hashtags'])
    print(new_df['hashtags'])
