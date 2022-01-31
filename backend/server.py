from flask import Flask, request
from flask_cors import CORS
from Application import Application

app = Flask(__name__)
CORS(app)
application = Application()


@app.route("/search")
def search():
    try:             
        word = request.args.get('word')
        user = request.args.get('user')

        days = request.args.get('days')
        since = request.args.get('since')
        until = request.args.get('until')   
        
        application.twitter_search(word, user, since, until, days)

        return {'status': 'success',
                'status_msg': "Search successfully",
                'state': application.state()}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/filter/add")
def add_filter():
    try:
        type = request.args.get('type')
        feature = request.args.get('feature')
        value = request.args.get('value')
        application.add_filter(type, feature, value)
        return {'status': 'success',
                'status_msg': "Successfully added filter",
                'state': application.state()}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/filter/remove")
def remove_filter():
    try:
        remove_index = request.args.get('index')
        application.remove_filter(remove_index)
        return {'status': 'success',
                'status_msg': "Successfully removed filter",
                'state': application.state()}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/state")
def get_state():
    try:
        return {'status': 'success',
                'status_msg': "Successfully retrieved state",
                'state': application.state()}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/save")
def save():
    try:
        application.save()
        return {'status': 'success',
                'status_msg': "Successfully downloaded csv file",
                'state': application.state()}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8000)
    # application.twitter_search("elonmusk", "covid", "", "", "")

