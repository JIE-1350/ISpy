import nltk
import pandas as pd
import numpy as np
from nltk.sentiment import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')


def get_sentiment_color(value, threshold1, threshold2):
    if value <= threshold1:
        return "red"
    elif value <= threshold2:
        return "gray"
    else:
        return "green"


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
        sentiment_color = get_sentiment_color(analysis_mean[3], -1.0/3.0, 1.0/3.0)
        data = {'type': 'Sentiment Analysis',
                'list': [{'color': sentiment_color, 'string': str(round(analysis_mean[3], 3)) + ' sentiment score'},
                         {'color': 'green', 'string': str(round(analysis_mean[2] * 100)) + '% positive tweets'},
                         {'color': 'gray', 'string': str(round(analysis_mean[1] * 100)) + '% neutral tweets'},
                         {'color': 'red', 'string': str(round(analysis_mean[0] * 100)) + '% negative tweets'}],
                'graph': [{'name': 'Negative', 'Negative Count': round(analysis_count[0])},
                          {'name': 'Neutral', 'Neutral Count': round(analysis_count[1])},
                          {'name': 'Positive', 'Positive Count': round(analysis_count[2])}]}
        self.insights.append(data)

    def get_influence_score(self, data: pd.DataFrame):
        data = {'type': 'Influence Score'}
        self.insights.append(data)

    def get_tweet_frequency(self, data: pd.DataFrame):
        data = {'type': 'Tweets Frequency'}
        self.insights.append(data)

    def get_top_hashtags(self, data: pd.DataFrame):
        data = {'type': 'Top Hashtags'}
        self.insights.append(data)

    def get_time_of_tweets(self, data: pd.DataFrame):
        data = {'type': 'Time of Tweets'}
        self.insights.append(data)

    def get_feature_stats(self, data: pd.DataFrame, feature: str):
        data = {'type': 'Stats'}
        self.insights.append(data)

    def remove(self, index: int):
        self.insights.pop(index)

    def get_insights(self, insight_type=None, data=None, feature=None):
        if insight_type == "sentiment":
            self.get_sentiment_analysis(data)
        elif insight_type == "influence":
            self.get_influence_score(data)
        elif insight_type == "frequency":
            self.get_tweet_frequency(data)
        elif insight_type == "topHashtags":
            self.get_top_hashtags(data)
        elif insight_type == "time":
            self.get_time_of_tweets(data)
        elif insight_type == "stats":
            self.get_feature_stats(data, feature)
        return self.insights

    def save_insights(self):
        pass
