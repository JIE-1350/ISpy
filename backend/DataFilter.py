import pandas as pd


class DataFilter:
    def __init__(self):
        self.filters = []
        self.sorts = {}
        self.valid_type = ['equal', 'less', 'greater', 'null', 'not_null']

    def __call__(self, data):
        try:
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
        except Exception as exception:
            self.filters.pop()
            raise Exception('Incompatible filter: ' + str(exception))

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
        indexInt = int(index)
        self.filters.pop(indexInt)

    def sort(self, data, feature):
        # https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.sort_values.html
        # perform the sort INPLACE using pandas
        if not self.sorts:
            for feature in list(data.columns):
                self.sorts[feature] = None
        if self.sorts[feature]:
            # perform non-default sort here
            self.sorts[feature] = False
        else:
            # perform default sort here
            self.sorts[feature] = True
        # no need to return because of inplace operation

    def reset_sort(self):
        self.sorts = {}

    def __str__(self):
        return self.filters.__str__()

