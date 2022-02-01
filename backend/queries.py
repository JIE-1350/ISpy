import twint
from datetime import date, timedelta


def twint_search(file_name, word=None, userid=None, since=None, until=None, days=None, path=None):
    c = twint.Config()
    c.Search = word
    c.Username = userid
    if days:
        c.Until = str(date.today() + timedelta(2))
        c.Since = str(date.today() - timedelta(int(days)))
    else:
        c.Since = since
        c.Until = until
    c.Store_csv = True
    c.Output = path + file_name
    c.Hide_output = True
    twint.run.Search(c)
    return file_name

# if __name__ == "__main__":
#    twint_search("elonmusk", "covid", "", "", "", "backend/data/")
#    twint_search("elonmusk", "covid", "", "", "", "")

