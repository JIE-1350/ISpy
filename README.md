# Intelligent Scraping with Python (ISpy)

The main goal of this project is to provide an easy user interface allowing for a decreased time in searching the web and more time studying and analyzing trends. The collection of information will enable various users (such as social scientists and academics) to view top trends, identify solutions, and perform insight analysis. Looking at the significant impact social media has had on the 21st-century global society, we can see how easily and quickly misinformation can spread through platforms such as Twitter. This misinformation can lead to a significant amount of divisive and harmful opinions. For example, this past year of the global pandemic has shown how misinformation such as conspiracy theories about COVID-19 vaccines can quickly spread and lead to harmful effects like preventing many people from getting vaccinated. Using our python scraper, users will be provided with accurate and unbiased data; as a result, allowing for the common benefit of society. Some of the key features within our application will be collecting data from Twitter, applying filters to sort and organize data, providing various insights on collected data, and saving collected information for later use.

## Release Notes

[//]: # (### Version 0.2.0)

[//]: # (#### New Features)
[//]: # (* Feature 1 for this release)
[//]: # (* feature 2 for this release)

[//]: # ()
[//]: # (#### Bug Fixes)
[//]: # (* Fixed hashtag search not applying hashtag)
[//]: # (* bug fixed 2)

[//]: # (---)

### Version 0.1.0:
#### New Features
* Scrape data from Twitter by keyword, hashtag, userid, or recent tweets.
* Filter data using interactive user interface
* Save data as a CSV file

#### Bug Fixes
* N/A

### Version 0.2.0:
#### New Features
* Visualize Data in a formatted Table organized by row for each tweet and column for tweet properties.
* View previously saved data files or open them from directory sidebar.
* Apply multiple filters or filter by keyword/number of likes.
* Search table by keyword/value using table search bar.
* Sort the table alphanumerically by clicking on column headers.
* Save data (filtered or not) as .csv, .json, or .xlsx (Excel) on your local machine

#### Bug Fixes
* Fixed hashtag search not applying hashtag exactly
* Fixed feature list for filters breaking after changing data format
---

## Installation
### Frontend
#### Requirements
* nodeJS 16.13.0 or newer (LTS)
* npm

#### Setup

```cd frontend/```

```npm install```

#### Run frontend only
```npm start```

#### Run frontend and backend
```npm run dev```

---

### Backend
#### Setup
Create a virtual environment and install the dependencies:

```cd backend/```

```python3 -m venv venv```

```source venv/bin/activate```

```pip install -r requirements.txt```


#### Run manually for testing:

```python server.py```
