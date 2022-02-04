import pandas as pd


class InsightsGen:
    def __init__(self):
        self.insights = []

    def get_sentiment_analysis(self, data: pd.DataFrame):
        pass

    def get_influence_score(self, data: pd.DataFrame):
        pass

    def get_tweet_frequency(self, data: pd.DataFrame):
        pass

    def get_top_hashtags(self, data: pd.DataFrame):
        pass

    def get_feature_stats(self, data: pd.DataFrame, feature: str):
        pass

    def save_insights(self):
        pass
