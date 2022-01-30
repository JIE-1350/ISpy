from fileinput import filename
from json.tool import main
import twint
from datetime import date, datetime, timedelta


def twint_search(word=None, userid=None, since=None, until=None, days=None, path=None):
    c = twint.Config()
    filename = str(date.today())
    now = datetime.now()
    filename += "_" + now.strftime("%H-%M-%S")
    if word:
        c.Search = word
        filename += "_" + word
        
    if userid:
        c.Username = userid
        filename += "_" + userid
    
    if days:
        c.Until = str(date.today() + timedelta(2))
        c.Since = str(date.today() - timedelta(int(days)))
        filename += "_f_" + c.Since
    else:
        if since:
            c.Since = since
            filename += "_f_" + since
        if until:
            c.Until = until
            filename += "_t_" + until
    filename += ".csv"
    c.Store_csv = True
    c.Output = path + filename
    twint.run.Search(c)
    return filename

# if __name__ == "__main__":
#    twint_search("elonmusk", "covid", "", "", "", "backend/data/")
#    twint_search("elonmusk", "covid", "", "", "", "")

