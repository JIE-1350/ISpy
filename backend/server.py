from queries import user_search
from flask import Flask, request
import pandas as pd
from flask_cors import cross_origin

app = Flask(__name__)


@app.route("/")
@cross_origin()
def search():
    try:
        user = request.args.get('user')
        keyword = request.args.get('keyword')
        since = request.args.get('since')
        until = request.args.get('until')
        file = user_search(user, since=since, until=until, word=keyword)
        return pd.read_csv('../backend/data/' + file).to_json(orient="index")
        # try:
        #     return pd.read_csv('../backend/data/2021-01-1.csv').to_json(orient="index")
        # except FileNotFoundError:
        #     user_search("JoeBiden", "2021-01-1", "2022-01-1", "covid")
        #     return pd.read_csv('../backend/data/2021-01-1.csv').to_json(orient="index")
    except Exception as exception:
        return str(exception)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8000)

