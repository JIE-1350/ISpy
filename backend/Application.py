import os
from datetime import date, datetime
from DataFilter import DataFilter
import pandas as pd
import numpy as np
from queries import twint_search

DISPLAY = 5


def get_file_name():
    filename = str(date.today())
    now = datetime.now()
    filename += "_" + now.strftime("%H-%M-%S")
    filename += ".csv"
    return filename


class Application:
    def __init__(self):
        self.data_filters = {}
        self.data_filter = None
        self.files = []
        self.file = ''
        self.data = None
        self.filtered_data = None
        self.data_path = os.getcwd() + '/data/'
        self.update_files()
        if self.files:
            self.file = self.files[0]
            self.open_file(self.file)

    def open_file(self, file):
        self.update_files()
        if file in self.files:
            self.data = pd.read_csv(self.data_path + file)
            self.data = self.data.where((pd.notnull(self.data)), None)
            if file not in self.data_filters:
                self.data_filters[file] = DataFilter()
            self.data_filter = self.data_filters[file]
            self.filtered_data = self.data
        else:
            raise FileNotFoundError("File not found:" + file)

    def add_filter(self, type, feature, value):
        self.data_filter.add(type, feature, value)
        self.filtered_data = self.data_filter(self.data)
        self.filtered_data = self.filtered_data.head(DISPLAY).append(self.filtered_data.tail(DISPLAY))
        return {'filters': self.data_filter.filters,
                'table': self.get_table()}

    def remove_filter(self, index):
        self.data_filter.remove(index)
        self.filtered_data = self.data_filter(self.data)
        self.filtered_data = self.filtered_data.head(DISPLAY).append(self.filtered_data.tail(DISPLAY))
        return {'filters': self.data_filter.filters,
                'table': self.get_table()}

    def update_files(self):
        self.files = os.listdir(self.data_path)

    def save(self):
        self.data.to_csv(self.data_path + get_file_name())
        self.update_files()
        return {'files': self.files}

    def state(self):
        return {'files': self.files,
                'filters': self.data_filter.filters,
                'table': self.get_table()}

    def twitter_search(self, userid=None, word=None, since=None, until=None, days=None):
        self.file = get_file_name()
        try:
            twint_search(self.file, userid, word, since, until, days, path=self.data_path)
            self.open_file(self.file)
            return {'files': self.files,
                    'filters': self.data_filter.filters,
                    'table': self.get_table()}
        except FileNotFoundError as error:
            return {'files': self.files,
                    'filters': [],
                    'table': {'cols': 0, 'rows': 0, 'data': {}}}

    def get_table(self):
        num_row, num_col = self.filtered_data.shape
        self.filtered_data = self.filtered_data.head(DISPLAY).append(self.filtered_data.tail(DISPLAY))
        return {'data': self.filtered_data.to_dict(),
                'rows': num_row,
                'cols': num_col}

    def get_table_searching(self):
        num_lines = sum(1 for _ in open(self.data_path + self.file))
        index_list = np.append(np.arange(num_lines - DISPLAY, num_lines), np.arange(DISPLAY + 1)).tolist()
        to_exclude = [i for i in range(num_lines) if i not in index_list]
        self.filtered_data = pd.read_csv(self.data_path + self.file, skiprows=to_exclude)
        self.filtered_data = self.filtered_data.where((pd.notnull(self.filtered_data)), None)
        return {'table': self.filtered_data.to_dict()}


# if __name__ == '__main__':
#     application = Application()


