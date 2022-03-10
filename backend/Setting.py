import os


class Singleton(object):
    def __new__(cls, *args, **kw):
        if not hasattr(cls, '_instance'):
            orig = super(Singleton, cls)
            cls._instance = orig.__new__(cls, *args, **kw)
        return cls._instance


class Setting(Singleton):
    def __init__(self):
        self.data_path = os.getcwd() + '/data/'
        self.insights_path = os.getcwd() + '/insights/'
        self.searching_display_old = 5
        self.searching_display_new = 5
