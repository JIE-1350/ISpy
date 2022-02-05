import pandas as pd


class InsightsGen:
    def __init__(self):
        self.insights = []

    def get_sentiment_analysis(self, data: pd.DataFrame):
        self.insights.append("get_sentiment_analysis()")

    def get_influence_score(self, data: pd.DataFrame):
        self.insights.append("get_influence_score()")

    def get_tweet_frequency(self, data: pd.DataFrame):
        self.insights.append("get_tweet_frequency()")

    def get_top_hashtags(self, data: pd.DataFrame):
        self.insights.append("get_top_hashtags()")

    def get_feature_stats(self, data: pd.DataFrame, feature: str):
        self.insights.append("get_feature_stats()")

    def remove(self, index: int):
        self.insights.pop(index)

    def get_insights(self):
        return self.insights

    def save_insights(self):
        pass
