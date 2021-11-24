# raise Exception(os.getcwd() + c.Output)
import twint


def search_keyword(keyword, limit=10, output="data", save_cvs=True):
    c = twint.Config()
    c.Search = keyword
    c.Limit = limit
    c.Store_csv = save_cvs
    c.Output = output
    twint.run.Search(c)


def search_hashtag(hashtag, limit=10, output="data", save_cvs=True):
    c = twint.Config()
    c.Search = "#" + hashtag
    c.Limit = limit
    c.Store_csv = save_cvs
    c.Output = output
    twint.run.Search(c)


def user_search(userid, since=None, until=None, word='', limit=None, output="data/", save_cvs=True):
    c = twint.Config()

    c.Search = word
    c.Username = userid

    c.Limit = limit

    c.Since = since
    c.Until = until
    c.Lang = "en"

    c.Store_csv = save_cvs
    file_name = userid + ".csv"
    c.Output = output + file_name
    twint.run.Search(c)
    return file_name


# user("JoeBiden", "2020-01-1", "2021-01-1")
# user("JoeBiden", "2021-01-1", "2022-01-1")

# user("JoeBiden", "2020-01-1", "2021-01-1", "covid mask")
# user("JoeBiden", "2021-01-1", "2022-01-1", "covid")


