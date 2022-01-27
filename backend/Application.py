import json
import os
from datetime import date, datetime, timedelta
from DataFilter import DataFilter
import pandas as pd
from queries import twint_search


class Application:
    def __init__(self):
        self.data_filters = {}
        self.data_filter = None
        self.files = []
        self.data = None
        self.filtered_data = None
        self.data_path = os.getcwd() + '/data/'
        self.update_files()
        if self.files:
            self.open_file(self.files[0])

    def open_file(self, file):
        self.update_files()
        print(file)
        if file in self.files:
            if file not in self.data_filters:
                self.data_filters[file] = DataFilter()
            self.data_filter = self.data_filters[file]
            self.data = pd.read_csv(self.data_path + file)
                        # self.data = pd.read_csv('e:/Test/ISpy/backend/data/temp1.csv')

            self.data = self.data.where((pd.notnull(self.data)), None)
            self.filtered_data = self.data
        else:
            raise Exception("File not found:" + file)

    def add_filter(self, type, feature, value):
        self.data_filter.add(type, feature, value)
        self.filtered_data = self.data_filter(self.data)

    def remove_filter(self, index):
        self.data_filter.remove(index)
        self.filtered_data = self.data_filter(self.data)

    def update_files(self):
        self.files = os.listdir(self.data_path)

    def get_file(self):
        self.data.to_csv(self.data_path + self.get_file_name())
        self.update_files()

    def get_file_name(self):
        filename = str(date.today())
        now = datetime.now()
        filename += "_" + now.strftime("%H-%M-%S")
        filename += ".csv"
        return filename

    def state(self):
        return {'files': self.files,
                'filters': self.data_filter.filters,
                'data': self.filtered_data.to_dict()}

    def twitter_search(self, userid=None, word=None, since=None, until=None, days=None):
        filename = twint_search(userid, word, since, until, days, path=self.data_path)
        self.open_file(filename)


if __name__ == '__main__':
    application = Application()
    application.twitter_search("elonmusk", "covid", "", "", "")
    print(application.state())



