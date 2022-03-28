import os
from DataFilter import DataFilter
from InsightsGen import InsightsGen
import pandas as pd
import numpy as np
from Setting import Setting
from queries import twint_search
from utils import get_table, get_file_name, read_file, mk_list_dir


class Application:
    def __init__(self):
        self.data_filters = {}
        self.data_filter = None
        self.insights_gens = {}
        self.insights_gen = None
        self.files = []
        self.file = ''
        self.data = None
        self.setting = Setting()
        self.update_files()
        if self.files:
            self.file = self.files[0]
            self.open_file(self.file)

    def open_file(self, file):
        self.update_files()
        if file in self.files:
            self.file = file
            self.data = read_file(self.setting('Data Path') + file)
            self.data = self.data.where((pd.notnull(self.data)), None)
            if file not in self.data_filters:
                self.data_filters[file] = DataFilter()
            if file not in self.insights_gens:
                self.insights_gens[file] = InsightsGen(self.setting('Insights Path'), file)
            self.data_filter = self.data_filters[file]
            self.insights_gen = self.insights_gens[file]
            return self.state()
        else:
            return self.state()

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
        files = mk_list_dir(self.setting('Data Path'))
        self.files = []
        for file in files:
            try:
                _, file_type = file.split('.')
                if 'csv' == file_type or 'json' == file_type or 'xlsx' == file_type:
                    self.files.append(file)
            except ValueError as error:
                pass

        insight_files_remove = mk_list_dir(self.setting('Insights Path'))
        for file in self.files:
            insight_file = file + ".pkl"
            try:
                insight_files_remove.remove(insight_file)
            except ValueError:
                pass
        for file in insight_files_remove:
            os.remove(self.setting('Insights Path') + file)

    def save(self, file_type):
        file_name = self.setting('Data Path') + get_file_name([self.file.split('.')[0]], file_type, self.files)
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
        filters = self.data_filter.filters if self.data_filter is not None else []
        table = get_table(self.data) if self.data is not None else {}
        insights = self.insights_gen.get_insights() if self.insights_gen is not None else []
        return {'files': self.files,
                'filters': filters,
                'table': table,
                'insights': insights,
                'settings': self.setting.settings}

    def twitter_search(self, userid=None, word=None, since=None, until=None, days=None):
        self.file = get_file_name([userid, word], '.csv', self.files)
        self.files.append(self.file)
        try:
            twint_search(self.file, userid, word, since, until, days, path=self.setting('Data Path'))
            return self.open_file(self.file)
        except FileNotFoundError as error:
            return self.state()

    def get_table_searching(self):
        num_lines = sum(1 for _ in open(self.setting('Data Path') + self.file, encoding='utf-8'))
        old = np.arange(self.setting("Searching number of old rows") + 1)
        new = np.arange(num_lines - self.setting("Searching number of new rows"), num_lines)
        index_list = np.append(old, new).tolist()
        to_exclude = [i for i in range(num_lines) if i not in index_list]
        data_frame = pd.read_csv(self.setting('Data Path') + self.file, skiprows=to_exclude)
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
            os.remove(self.setting('Data Path') + self.files[index])
            self.files.pop(index)
            if len(self.files):
                return self.open_file(self.files[0])
            else:
                self.__init__()
                return {'files': [],
                        'filters': [],
                        'table': {},
                        'insights': []}
        except Exception as error:
            raise error

    def update_settings(self, settings):
        self.setting.update_setting(settings)
        self.update_files()
        return self.open_file(self.files[0])

    def reset_settings(self):
        self.setting.set_default()
        self.update_files()
        return self.open_file(self.files[0])


if __name__ == '__main__':
    application = Application()
    application.generate_insight("frequency")


