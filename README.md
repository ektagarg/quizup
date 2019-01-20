## About Project: ##
###### A Quizzing Application: ######
1. Each Quiz has one question, at least two possible options and only one answer. Limit max number of options to 4.
2. Quiz question and possible answers are all text only.
3. A user can answer a quiz only once. Correct answer gives them 10 points and wrong answer gives them -5 points
4. Only admin can create quizzes

## Setup and Run:##
###### Docker setup ######
Run Dockerfile
1. docker build . -t quizup
2. docker run -d -p 3000 #container_id
3. Access localhost:3000

 ###### Localsetup without Dockerfile ######
1. RUN npm install
2. nodemon

## Link to APIs ##
https://www.getpostman.com/collections/2a7f5b7ec16e52586272
