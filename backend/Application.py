import os
from datetime import date, datetime
from DataFilter import DataFilter
from InsightsGen import InsightsGen
import pandas as pd
import numpy as np

from queries import twint_search
from utils import get_table

DISPLAY = 5


def get_file_name(file_type=".csv"):
    filename = str(date.today())
    now = datetime.now()
    filename += "_" + now.strftime("%H-%M-%S")
    if file_type == ".csv":
        filename += ".csv"
    elif file_type == ".xlsx":
        filename += ".xlsx"
    elif file_type == ".json":
        filename += ".json"
    return filename


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
            if file not in self.insights_gens:
                self.insights_gens[file] = InsightsGen()
            self.data_filter = self.data_filters[file]
            self.insights_gen = self.insights_gens[file]
            return {'files': self.files,
                    'filters': self.data_filter.filters,
                    'table': get_table(self.data)}
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
        self.files = os.listdir(self.data_path)

    def save(self, file_type):
        if file_type == ".csv":
            self.data.to_csv(self.data_path + get_file_name(file_type))
        elif file_type == ".xlsx":
            self.data.to_excel(self.data_path + get_file_name(file_type))
        elif file_type == ".json":
            self.data.to_json(self.data_path + get_file_name(file_type))
        self.update_files()
        return {'files': self.files}

    def state(self):
        return {'files': self.files,
                'filters': self.data_filter.filters,
                'table': get_table(self.data)}

    def twitter_search(self, userid=None, word=None, since=None, until=None, days=None):
        self.file = get_file_name(".csv")
        try:
            twint_search(self.file, userid, word, since, until, days, path=self.data_path)
            return self.open_file(self.file)
        except FileNotFoundError as error:
            return {'files': self.files,
                    'filters': [],
                    'table': {'cols': 0, 'rows': 0, 'data': {}}}

    def get_table_searching(self):
        num_lines = sum(1 for _ in open(self.data_path + self.file, encoding='utf-8'))
        index_list = np.append(np.arange(num_lines - DISPLAY, num_lines), np.arange(DISPLAY + 1)).tolist()
        to_exclude = [i for i in range(num_lines) if i not in index_list]
        data_frame = pd.read_csv(self.data_path + self.file, skiprows=to_exclude)
        data_frame = data_frame.where((pd.notnull(data_frame)), None)
        return {'table': get_table(data_frame)}

    def generate_insight(self, insight_type: str, feature: str = None):
        if insight_type == "sentiment":
            self.insights_gen.get_sentiment_analysis(self.data)
        elif insight_type == "influence":
            self.insights_gen.get_influence_score(self.data)
        elif insight_type == "frequency":
            self.insights_gen.get_tweet_frequency(self.data)
        elif insight_type == "topHashtags":
            self.insights_gen.get_top_hashtags(self.data)
        elif insight_type == "stats":
            self.insights_gen.get_feature_stats(self.data, feature)

if __name__ == '__main__':
    application = Application()


