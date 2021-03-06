import pickle
import nltk
import pandas as pd
import numpy as np
from nltk.sentiment import SentimentIntensityAnalyzer
from datetime import datetime, timedelta
from time import mktime

nltk.download('vader_lexicon')


def get_sentiment_color(value, threshold1, threshold2):
    if value <= threshold1:
        return "red"
    elif value <= threshold2:
        return "gray"
    else:
        return "green"


class InsightsGen:
    def __init__(self, path: str, file: str):
        self.insights_path = path
        self.file = file
        self.insights = []
        self.generated_insights = set()
        self.load_insights()

    def get_sentiment_analysis(self, df: pd.DataFrame):
        sia = SentimentIntensityAnalyzer()
        sentiments = []
        for tweet in df['tweet'].to_numpy():
            analysis = sia.polarity_scores(tweet)
            sentiments.append([analysis['neg'], analysis['neu'], analysis['pos'], analysis['compound']])

        sentiments = np.array(sentiments)
        analysis_count = np.sum(sentiments, axis=0)
        analysis_mean = np.mean(sentiments, axis=0)
        sentiment_color = get_sentiment_color(analysis_mean[3], -1.0 / 3.0, 1.0 / 3.0)
        data = {'type': 'Sentiment Analysis',
                'list': [{'color': sentiment_color, 'string': str(round(analysis_mean[3], 3)) + ' sentiment score'},
                         {'color': 'green', 'string': str(round(analysis_mean[2] * 100)) + '% positive tweets'},
                         {'color': 'gray', 'string': str(round(analysis_mean[1] * 100)) + '% neutral tweets'},
                         {'color': 'red', 'string': str(round(analysis_mean[0] * 100)) + '% negative tweets'}],
                'graph': [{'name': 'Negative', 'Negative Count': round(analysis_count[0])},
                          {'name': 'Neutral', 'Neutral Count': round(analysis_count[1])},
                          {'name': 'Positive', 'Positive Count': round(analysis_count[2])}],
                'layout': self.get_layout()}
        self.insights.append(data)

    def get_influence_score(self, df: pd.DataFrame):
        replies = df['replies_count'].to_numpy()
        retweets = df['retweets_count'].to_numpy()
        likes = df['likes_count'].to_numpy()

        replies_mean = int(np.mean(replies))
        retweets_mean = int(np.mean(retweets))
        likes_mean = int(np.mean(likes))

        influence_score = int(np.mean([replies_mean, retweets_mean, likes_mean]))

        data = {'type': 'Influence Score',
                'list': [{'color': 'green', 'string': str(round(influence_score)) + ' influence score'},
                         {'color': 'green', 'string': str(round(replies_mean)) + ' average replies'},
                         {'color': 'green', 'string': str(round(retweets_mean)) + ' average retweets'},
                         {'color': 'green', 'string': str(round(likes_mean)) + ' average likes'}],
                'layout': self.get_layout()}

        self.insights.append(data)

    def get_tweet_frequency(self, df: pd.DataFrame):
        dates = df['date'].to_numpy()
        dates = [datetime.strptime(date, "%Y-%m-%d") for date in dates]

        oldest_date = min(dates)
        newest_date = max(dates)
        delta = newest_date - oldest_date
        date_counts = {oldest_date + timedelta(days=i): 0 for i in range(delta.days + 1)}
        for date in dates:
            if date in date_counts:
                date_counts[date] += 1
            else:
                date_counts[date] = 1

        graph = []
        for date in date_counts:
            unix_time = mktime(date.timetuple())
            graph.append({'time': unix_time, 'value': date_counts[date]})

        data = {'type': 'Tweets Frequency',
                'graph': graph,
                'layout': self.get_layout()}
        self.insights.append(data)

    def get_top_hashtags(self, data: pd.DataFrame):
        n = 10
        hashtags_col = data['hashtags'].apply(eval)
        hashtags = pd.Series([x for _list in hashtags_col for x in _list])
        top_hashtags = hashtags.value_counts()[:n].index.tolist()
        top_hashtags_count = hashtags.value_counts()[:n].tolist()
        data = {'type': 'Top Hashtags',
                'list': [{'color': 'green', 'string': top_hashtags[0]},
                         {'color': 'green', 'string': top_hashtags[1]},
                         {'color': 'green', 'string': top_hashtags[2]},
                         {'color': 'green', 'string': top_hashtags[3]},
                         {'color': 'green', 'string': top_hashtags[4]},
                         {'color': 'green', 'string': top_hashtags[5]}],
                'graph': [{'name': top_hashtags[0], 'CountA': top_hashtags_count[0]},
                          {'name': top_hashtags[1], 'CountB': top_hashtags_count[1]},
                          {'name': top_hashtags[2], 'CountC': top_hashtags_count[2]},
                          {'name': top_hashtags[3], 'CountD': top_hashtags_count[3]},
                          {'name': top_hashtags[4], 'CountE': top_hashtags_count[4]},
                          {'name': top_hashtags[5], 'CountF': top_hashtags_count[5]}],                         
                'layout': self.get_layout()}
        self.insights.append(data)

    def get_time_of_tweets(self, df: pd.DataFrame):
        dates = df['time'].to_numpy()
        dates = [datetime.strptime(date, '%H:%M:%S').time() for date in dates]
        time_dict = {}

        for hour in range(24):
            time_dict[hour] = 0

        for time in dates:
            time_dict[time.hour] += 1

        graph = []

        for key, value in time_dict.items():
            time_str = str(key) + ":00"
            entry = {'time': time_str, 'value': value}
            graph.append(entry)

        data = {'type': 'Time of Tweets',
                'graph': graph,
                'layout': self.get_layout()}
        self.insights.append(data)

    def get_insights(self, insight_type=None, data=None):
        if insight_type and insight_type in self.generated_insights:
            raise Exception(insight_type + " already generated")
        if insight_type == "Sentiment Analysis":
            self.get_sentiment_analysis(data)
        elif insight_type == "Influence Score":
            self.get_influence_score(data)
        elif insight_type == "Tweets Frequency":
            self.get_tweet_frequency(data)
        elif insight_type == "Top Hashtags":
            self.get_top_hashtags(data)
        elif insight_type == "Time of Tweets":
            self.get_time_of_tweets(data)
        self.generated_insights.add(insight_type)
        self.save_insights()
        return self.insights

    def remove(self, index: int):
        insight = self.insights.pop(index)
        self.generated_insights.remove(insight["type"])
        self.save_insights()

    def save_insights(self):
        pickle.dump(self.insights, open(self.insights_path + self.file + '.pkl', 'wb'))

    def load_insights(self):
        try:
            self.insights = pickle.load(open(self.insights_path + self.file + '.pkl', 'rb'))
            for insight in self.insights:
                self.generated_insights.add(insight['type'])
        except FileNotFoundError as error:
            self.insights = []

    def get_layout(self):
        index = len(self.insights)
        if index % 2 == 0:
            return {'x': 0, 'y': 99, 'w': 6, 'h': 3, 'i': index}
        else:
            return {'x': 6, 'y': 99, 'w': 6, 'h': 3, 'i': index}

    def update_layout(self, layouts):
        for layout in layouts:
            _, insight_type = layout['i'].split(':')
            for i in range(len(self.insights)):
                if self.insights[i]['type'] == insight_type:
                    self.insights[i]['layout'] = layout
        self.save_insights()
