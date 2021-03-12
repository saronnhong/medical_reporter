# Medical Reporter

This app takes inspiration from the GMail setup in order to perform searches on TXT files and display all reports of all matching results. The user has the ability to add and remove tags to each report. The user can also view the entire report by clicking on the item. Currently it searches through 50 books from gutenberg.org.

## How it was built?
I used React.js to build this frontend application for Segmed. The app has super fast search speeds due to using a Hash table to store the words for each text document which gives it O(1) look up speed.

## Install Locally
If you want to run it on your local computer,
1. `git clone https://github.com/saronnhong/medical_reporter.git` Clone the repository
2. `npm install`  To install the dependencies
3. `npm start`    To start the app   


## Deployed
The App is hosted here: [https://saronnhong.github.io/gmail_for_medical_reports](https://saronnhong.github.io/gmail_for_medical_reports)
