import os
from DataFilter import DataFilter
from InsightsGen import InsightsGen
import pandas as pd
import numpy as np

from queries import twint_search
from utils import get_table, get_file_name, read_file, mk_list_dir

DISPLAY = 5


class Application:
    def __init__(self):
        self.data_filters = {}
        self.data_filter = None
        self.insights_gens = {}
        self.insights_gen = None
        self.files = []
        self.file = ''
        self.data = None
        self.data_path = os.getcwd() + '/data/'
        self.insights_path = os.getcwd() + '/insights/'
        self.update_files()
        if self.files:
            self.file = self.files[0]
            self.open_file(self.file)

    def open_file(self, file):
        self.update_files()
        if file in self.files:
            self.file = file
            self.data = read_file(self.data_path + file)
            self.data = self.data.where((pd.notnull(self.data)), None)
            if file not in self.data_filters:
                self.data_filters[file] = DataFilter()
            if file not in self.insights_gens:
                self.insights_gens[file] = InsightsGen(self.insights_path, file)
            self.data_filter = self.data_filters[file]
            self.insights_gen = self.insights_gens[file]
            return self.state()
        else:
            raise FileNotFoundError("File not found:" + file)

    def add_filter(self, type, feature, value):
        self.data_filter.add(type, feature, value)
        filtered_data = self.data_filter(self.data)
        return {'filters': self.data_filter.filters,
                'table': get_table(filtered_data)}

    def remove_filter(self, index):
        self.data_filter.remove(index)
        filtered_data = self.data_filter(self.data)
        return {'filters': self.data_filter.filters,
                'table': get_table(filtered_data)}

    def update_files(self):
        self.files = mk_list_dir(self.data_path)
        insight_files_remove = mk_list_dir(self.insights_path)
        for file in self.files:
            insight_file = file + ".pkl"
            try:
                insight_files_remove.remove(insight_file)
            except ValueError:
                pass
        for file in insight_files_remove:
            os.remove(self.insights_path + file)

    def save(self, file_type):
        file_name = self.data_path + get_file_name([self.file.split('.')[0]], file_type, self.files)
        if file_type == ".csv":
            self.data.to_csv(file_name)
        elif file_type == ".xlsx":
            self.data.to_excel(file_name)
        elif file_type == ".json":
            self.data.to_json(file_name)
        self.update_files()
        return {'files': self.files}

    def state(self):
        self.update_files()
        return {'files': self.files,
                'filters': self.data_filter.filters,
                'table': get_table(self.data),
                'insights': self.insights_gen.get_insights()}

    def twitter_search(self, userid=None, word=None, since=None, until=None, days=None):
        self.file = get_file_name([userid, word], '.csv', self.files)
        self.files.append(self.file)
        try:
            twint_search(self.file, userid, word, since, until, days, path=self.data_path)
            return self.open_file(self.file)
        except FileNotFoundError as error:
            return self.state()

    def get_table_searching(self):
        num_lines = sum(1 for _ in open(self.data_path + self.file, encoding='utf-8'))
        index_list = np.append(np.arange(num_lines - DISPLAY, num_lines), np.arange(DISPLAY + 1)).tolist()
        to_exclude = [i for i in range(num_lines) if i not in index_list]
        data_frame = pd.read_csv(self.data_path + self.file, skiprows=to_exclude)
        data_frame = data_frame.where((pd.notnull(data_frame)), None)
        self.update_files()
        return {'files': self.files, 'table': get_table(data_frame), 'selectedIndex': self.files.index(self.file)}

    def generate_insight(self, insight_type: str):
        data = self.insights_gen.get_insights(insight_type, self.data)
        return {'insights': data}

    def remove_insight(self, index: int):
        self.insights_gen.remove(index)
        data = self.insights_gen.get_insights()
        return {'insights': data}

    def update_layout(self, data):
        self.insights_gen.update_layout(data)

    def remove_file(self, index):
        try:
            print(index)
            os.remove(self.data_path + self.files[index])
            self.files.pop(index)
            if len(self.files):
                return self.open_file(self.files[0])
            else:
                return {'files': [],
                        'filters': [],
                        'table': {},
                        'insights': []}
        except Exception as error:
            raise error


if __name__ == '__main__':
    application = Application()
    application.generate_insight("frequency")


