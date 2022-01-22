# raise Exception(os.getcwd() + c.Output)
from fileinput import filename
from json.tool import main
import twint
from datetime import date, timedelta


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


def user_search(userid, since=None, until=None, word='', limit='', output="data/", save_cvs=True):
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

def twint_search(userid=None, word='', since=None, until=None, days=None, path=None):
    c = twint.Config()
    print("*****************************************")
    filename = str(date.today())
    # filename = "a"
    if userid:
        c.Username = userid
        filename += "_" + userid
    if word:
        c.Search = word
        filename += "_" + word
    if days:
        c.Until = str(date.today() + timedelta(2))
        c.Since = str(date.today() - timedelta(int(days)))
        filename += "_from_" + c.Since
    else:
        c.Since = since
        c.Until = until
        filename += "_" + since + "_to_" + until
    
    filename += ".csv"
    c.Store_json = True
    c.Output = path + filename
    print(filename)
    twint.run.Search(c)



# user_search("JoeBiden", "2022-01-1", "2022-01-5")
if __name__ == "__main__":
   twint_search("elonmusk", "", "", "", 3, "backend/data/")
    # user_search("JoeBiden", "2022-01-01", "2022-01-20")


