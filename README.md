# Update the data in Voiceflow

## Why ? 
The data in Voiceflow is used to answer out of flow questions, meaning if the AI from openAI gets lost, the AI from voiceflow can answer the question. The second reason is for the "Inspire me" and "Show me 3 courses" options.

## What do I need ? 
You need a CSV file that contains data about various JCOIN courses, webinars, and quick lessons. It includes the following key columns:
- Title: The name of the course or lesson.
- Permalink: The URL link to the course.
- Image Featured: URL to the featured image of the course.
- Tags: Various tags related to the course, often separated by a delimiter like '|'.
- Course Tags: More detailed tags specific to the course.
- Course Categories: Categories under which the course is listed.
- Content Type: Specifies if it is a course, webinar, or quick lesson.
- Subject: Topics the course covers, often involving addiction treatment and justice-related themes.
- Audience: The intended audience for the course (e.g., researchers, practitioners).
- Partners: The organizations associated with the course.
- Completion Certificate: Whether or not a certificate is awarded upon completion (yes/no).
- Content: A detailed description of the course's content.

## How to do it ?  

This procedure explains how you can update the data in voiceflow

- Step 1: Load the CSV file named "Courses-Webinars-amp-Quick-Lessons-Export with content.xlsx" into ChatGPT using model 4o.
- Step 2: Navigate to the useful prompts folder and locate the file called Prompt translates excel file to API body.txt.
- Step 3: Use the prompt in that file and press enter to run it. Download the JSON file and inspect the content.
- Step 4: Once the file is processed, check the resulting file to ensure:
>- The summary for each item is not truncated (doesn't end with "...").
>- The summary is not the same as the content.
- Step 5 (optional): If the summary is either truncated or exactly the same as the content, write: "The summaries don't respect the instructions that were initially given. Make them more engaging." and press enter.
- Copy paste the content of the resulting JSON file in Voiceflow
>- start voiceflow and navigate to the JCOIN project
>- double click the "home" workflow
>- underneath the start button there is a banner labelled "UPLOAD TABLE DATA", click on the block underneath that banner. 
>- Once you click on the block a menu will open on the left hand side, scroll down and go into the body and copy paste the content of the JSON file. If you get 200 OK at the bottom of the API request you are good, if not follow one of the two optional steps (step 5 and/or step 10)
>- The AI is not always consistent, so you might need an extra step to remove NaN values. Go back to the chatGPT window from which you just downloaded the JSON file and type: "The json file you gave me still has NaN values, go through it again and make sure you respect step 7 from the initial instructions"
>- if there are still errors, just copy paste the error message into the chatgpt window and tell it to fix the error for you and return the corrected file (repeat until you can upload the content with a 200 response)



# Update the data in OpenAI Playground


# Setting up the Google Cloud

In the Google Cloud folder, open the Deployment Google Cloud Procedure file and follow the steps exactly.