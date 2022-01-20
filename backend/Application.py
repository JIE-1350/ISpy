import os
from DataFilter import DataFilter
import pandas as pd


class Application:
    def __init__(self):
        self.data_filters = {}
        self.data_filter = None
        self.files = []
        self.data = None
        self.data_path = '../backend/data/'
        self.update_files()
        if self.files:
            self.open_file(self.files[0])

    def open_file(self, file):
        self.update_files()
        if file in self.files:
            if file not in self.data_filters:
                self.data_filters[file] = DataFilter()
            self.data_filter = self.data_filters[file]
            self.data = pd.read_csv(self.data_path + file)
        else:
            raise Exception("File not found")

    def add_filter(self, type, feature, value):
        self.data_filter.add(type, feature, value)
        self.data = self.data_filter(self.data)

    def remove_filter(self, index):
        self.data_filter.remove(index)
        self.data = self.data_filter(self.data)

    def update_files(self):
        self.files = os.listdir(self.data_path)

    def state(self):
        return {'files': self.files,
                'filters': self.data_filter.filters,
                'data': self.data.to_json(orient="index")}


if __name__ == '__main__':
    application = Application()
    application.add_filter('equal', 'fd', 1)
    print(application.files)
    print(application.data_filter)
    print(application.data)


