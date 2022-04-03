import os
from flask import Flask, request
from flask_cors import CORS
from Application import Application

app = Flask(__name__)
CORS(app)
application = Application()


@app.route("/search")
def search():
    try:
        os.environ["TWINT_RUN_SEARCH"] = "1"
        word = request.args.get('word')
        user = request.args.get('user')
        days = request.args.get('days')
        since = request.args.get('since')
        until = request.args.get('until')
        search_type = request.args.get('type')

        if search_type == "Hashtag" and word:
            word = "#" + word

        data = application.twitter_search(word, user, since, until, days)

        os.environ["TWINT_RUN_SEARCH"] = "0"
        return {'status': 'success',
                'status_msg': "Search successfully",
                'data': data}
    except Exception as exception:
        os.environ["TWINT_RUN_SEARCH"] = "0"
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/cancel-search")
def cancel_search():
    try:
        os.environ["TWINT_RUN_SEARCH"] = "0"
        application.open_file(application.file)
        return {'status': 'success',
                'status_msg': "Canceled search successfully",
                'data': application.state()}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/filter/add")
def add_filter():
    try:
        filter_type = request.args.get('type')
        feature = request.args.get('feature')
        value = request.args.get('value')
        data = application.add_filter(filter_type, feature, value)
        return {'status': 'success',
                'status_msg': "Successfully added filter",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/filter/remove")
def remove_filter():
    try:
        remove_index = request.args.get('index')
        data = application.remove_filter(remove_index)
        return {'status': 'success',
                'status_msg': "Successfully removed filter",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/state")
def get_state():
    try:
        return {'status': 'success',
                'status_msg': "Successfully retrieved state",
                'data': application.state()}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/save")
def save():
    try:
        file_type = request.args.get('fileType')
        data = application.save(file_type)
        return {'status': 'success',
                'status_msg': "Successfully saved csv file",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/update-table")
def update_table():
    try:
        data = application.get_table_searching()
        return {'status': 'success',
                'status_msg': "Successfully updated table",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/select-file")
def select_file():
    try:
        file_name = request.args.get('filename')
        data = application.open_file(file_name)
        return {'status': 'success',
                'status_msg': "Successfully selected file",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/generate-insight")
def generate_insight():
    try:
        insight_type = request.args.get('type')
        data = application.generate_insight(insight_type)
        return {'status': 'success',
                'status_msg': "Successfully generated insight",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/insight/remove")
def remove_insight():
    try:
        remove_index = int(request.args.get('index'))
        data = application.remove_insight(remove_index)
        return {'status': 'success',
                'status_msg': "Successfully removed insight",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/insight/update-layout", methods=['POST'])
def update_layout():
    try:
        data = request.get_json()
        application.update_layout(data)
        return {'status': 'success',
                'status_msg': "Successfully update layout"}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


@app.route("/remove-file")
def remove_file():
    try:
        file_index = int(request.args.get('index'))
        data = application.remove_file(file_index)
        return {'status': 'success',
                'status_msg': "Successfully removed file",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8000)
