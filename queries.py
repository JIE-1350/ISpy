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


def search_recent(days, limit=10, output="data", save_cvs=True):
    pass



