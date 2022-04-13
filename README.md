# Intelligent Scraping with Python (ISpy)

The main goal of this project is to provide an easy user interface allowing for a decreased time in searching the web and more time studying and analyzing trends. The collection of information will enable various users (such as social scientists and academics) to view top trends, identify solutions, and perform insight analysis. Looking at the significant impact social media has had on the 21st-century global society, we can see how easily and quickly misinformation can spread through platforms such as Twitter. This misinformation can lead to a significant amount of divisive and harmful opinions. For example, this past year of the global pandemic has shown how misinformation such as conspiracy theories about COVID-19 vaccines can quickly spread and lead to harmful effects like preventing many people from getting vaccinated. Using our python scraper, users will be provided with accurate and unbiased data; as a result, allowing for the common benefit of society. Some of the key features within our application will be collecting data from Twitter, applying filters to sort and organize data, providing various insights on collected data, and saving collected information for later use.

## Download Installer
[Windows Installer download](https://github.com/JIE-1350/ISpy/raw/development/installer/Windows/ISpy%20Setup%200.1.0.exe)

[IOS Installer download](url)

[Linux Installer download](url)

### Search Tab
![](Images/search.png)

### Insight Tab
![](Images/insights.png)

## Release Notes
### Version 1.0.0:
#### New Features
* Scrape data from Twitter by keyword, hashtag, userid, or recent tweets.
* Filter data using interactive user interface
* Save data as a CSV file
* Visualize Data in a formatted Table organized by row for each tweet and column for tweet properties.
* View previously saved data files or open them from directory sidebar.
* Apply multiple filters or filter by keyword/number of likes.
* Search table by keyword/value using table search bar.
* Sort the table alphanumerically by clicking on column headers.
* Save data (filtered or not) as .csv, .json, or .xlsx (Excel) on your local machine
* Ability to customizable insights dashboard in insight tab
* Perform sentiment analysis insight
* Provide influence score insight for a user
* Ability to cancel a search
* Ability to remove the current file
* Add support for reading other file types such as CVS, JSON, or XLSX
* Auto generate readable file name
* View table name as name of file
* View top hashtags list insight
* View top hashtags graph insight
* View time of tweets insight
* View frequency over time insight
* Capability to install using installer
* Ability to adjust advanced user settings
* View insight documentation in tooltip
* Make application intuitive and easy to understand by adding icons to buttons


#### Bug Fixes
* Fix React build script fail to load files
* Fix insight tab not updating when search is completed
* Fix save as drop box not updating
* Fix chart domain and type

#### Known Issues
* Sometime switching to search tab takes a long time; moderate
* Potential problem with filter value data type; moderate
* Some datasets generate graphs with text that are cutoff at default size but are easily resized; minor

## Installation
### Frontend
#### Requirements
* [nodeJS 16.13.0 or newer (LTS)](https://nodejs.org/en/)
* [npm 8.5.0 or newer (comes bundled with node)](https://www.npmjs.com/package/npm/v/8.5.0)

#### Setup

```cd frontend/```

```npm install```

#### Run frontend only
```npm start```

#### Run frontend and backend
```npm run dev```

### Backend
#### Requirements
* [Python 3.8](https://www.python.org/downloads/release/python-380/)
* [pip 22.0.0 or newer](https://pip.pypa.io/en/stable/cli/pip_install/)

#### Setup
Create a virtual environment and install the dependencies:

```cd backend/```

```python3 -m venv venv```

```source venv/bin/activate```

```pip install -r requirements.txt```


#### Run manually for developing:

```python server.py```

## Build Installer
Before you start building the installer, make sure that you can run the application in development setting.

Make sure that your virtual environment is activated, and **pyinstaller** is installed.

Create an executable for the python server.

To start, change directory to `backend/pyinstaller/`

`cd backend/pyinstaller/`

Run the sh script to create the executable for the flask server. 

`sh create_exe.sh`

The executable should be in `backend/pyinstaller/dist/` folder with the name `server.exe`

There should also be a copy of `server.exe` in `frontend/`.

Change directory to `frontend/`

`cd ../../frontend`

Run the script to build the electron application installer

`npm run electron:build`

The installer should be in `frontend/dist/` folder as `ISpy Setup 0.1.0.exe`

## Troubleshooting
### Problem #1
  <Description>

Cause: 
  + Cause 1
  + Cause 2
  
Solution:
  + <Solution 1>
  + <Solution 2>
