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
        search_type = request.args.get('type')

        if search_type == "Hashtag" and word:
            word = "#" + word
        
        data = application.twitter_search(word, user, since, until, days)

        return {'status': 'success',
                'status_msg': "Search successfully",
                'data': data}
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
        fileType = request.args.get('fileType')
        data = application.save(fileType)
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


@app.route("/sort")
def sort_table():
    try:
        feature = request.args.get('feature')
        data = application.sort(feature)
        return {'status': 'success',
                'status_msg': "Successfully sorted feature",
                'data': data}
    except Exception as exception:
        return {'status': 'fail',
                'status_msg': str(exception)}


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8000)

