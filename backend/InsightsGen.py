import nltk
import pandas as pd
import numpy as np
from nltk.sentiment import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')


class InsightsGen:
    def __init__(self):
        self.insights = []

    def get_sentiment_analysis(self, data: pd.DataFrame):
        sia = SentimentIntensityAnalyzer()
        sentiments = []
        for tweet in data['tweet'].to_numpy():
            analysis = sia.polarity_scores(tweet)
            sentiments.append([analysis['neg'], analysis['neu'], analysis['pos'], analysis['compound']])

        sentiments = np.array(sentiments)
        analysis_count = np.sum(sentiments, axis=0)
        analysis_mean = np.mean(sentiments, axis=0)
        data = {'list': [{'color': 'green', 'string': str(round(analysis_mean[3], 3)) + ' sentiment score'},
                         {'color': 'green', 'string': str(round(analysis_mean[2] * 100)) + '% positive tweets'},
                         {'color': 'yellow', 'string': str(round(analysis_mean[1] * 100)) + '% neutral tweets'},
                         {'color': 'red', 'string': str(round(analysis_mean[0] * 100)) + '% negative tweets'}],
                'graph': [{'name': 'Negative', 'count': round(analysis_count[0])},
                          {'name': 'Neutral', 'count': round(analysis_count[1])},
                          {'name': 'Positive', 'count': round(analysis_count[2])}]}
        self.insights.append(data)

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
