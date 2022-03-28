import os
import json


class Singleton(object):
    def __new__(cls, *args, **kw):
        if not hasattr(cls, '_instance'):
            orig = super(Singleton, cls)
            cls._instance = orig.__new__(cls, *args, **kw)
        return cls._instance


class Setting(Singleton):
    def __init__(self):
        self.file_name = "settings.json"
        self.settings = None
        self.load_settings()

    def __call__(self, key, *args, **kwargs):
        return self.settings[key]

    def load_settings(self):
        try:
            with open(self.file_name) as json_file:
                self.settings = json.load(json_file)
        except FileNotFoundError as error:
            self.set_default()
            self.save_settings()

    def save_settings(self):
        with open(self.file_name, 'w') as json_file:
            json.dump(self.settings, json_file, indent=4)

    def set_default(self):
        self.settings = {
            'Data Path': os.getcwd() + '/data/',
            'Insights Path': os.getcwd() + '/insights/',
            'Searching number of old rows': 5,
            'Searching number of new rows': 5
        }
        self.save_settings()

    def update_setting(self, new_settings):
        self.settings = new_settings
        self.settings['Searching number of old rows'] = int(self.settings['Searching number of old rows'])
        self.settings['Searching number of new rows'] = int(self.settings['Searching number of new rows'])
        self.save_settings()

