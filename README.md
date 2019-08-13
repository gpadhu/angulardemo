# EmblTest

Thank you for providing me opportunity to work in this technical task.


App consists of 4 main components, 

1. main search component (it will render user input component and transcript list component)
2. user input component (used to get user inputs)
3. transcript lists component. (it will render transcript item component)
4. transcript item component. (used to render results to user)

I have created all components inside mainsearch folder to be more modular, It will be helpful to keep separate as modules to update/extend the project or to add new modules.

## Logical Approach: 

Task 1: I'm calling symbol lookup rest api to get all data for that gene. Once data retrieved, I'm calling sequence rest api to get all protein sequence. From the protein sequence result I'm validating if the transcripts match with the position and amino acid value user entered in the form and displaying the results to the user.

Task 2: Using user's hgvs input value i'm calling hgvs notation rest api to see if the variant is available and if it is available, If it's matches with 
​input hgvs notation, I'm calling identifier lookup rest api to get all matched transcription data and displaying in the view.

​Due to time constraints I'm not able to focus on test cases, sorry about that but I understand the importance of testing.

## Instructions to Run application : 

## Method 1:
1. Please extract the zip file and navigate into the folder `embl-test-project`.
2. Run `npm install` in terminal to install all dependent libraries.
3. Run `ng serve --open` in terminal to run the application.  
​
If above method does not working due to any library/node packages issues, please use the method 2. I have compiled the project, you can run using any simple server.

​## Method 2:​ 
​1. Please extract the zip file and navigate into the folder `embl-test-project`.
2. Compiled project is in `dist` directory, please navigate into the folder.
3. Now you can run the project from this directory using any server. Eg., https://www.npmjs.com/package/simple-server

Thank you