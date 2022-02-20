import twint
from datetime import date, timedelta


def twint_search(file_name, word=None, userid=None, since=None, until=None, days=None, path=None):
    c = twint.Config()
    c.Search = word if word else None
    c.Username = userid if userid else None
    if days:
        c.Until = str(date.today() + timedelta(2))
        c.Since = str(date.today() - timedelta(int(days)))
    else:
        c.Since = since if since else None
        c.Until = until if until else None
    c.Store_csv = True
    c.Output = path + file_name
    c.Hide_output = True
    twint.run.Search(c)
    return file_name


if __name__ == "__main__":
    twint_search("test", word="covid", days=1, path='data/')

