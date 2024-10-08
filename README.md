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

>- Step 1: Load the CSV file named "Courses-Webinars-amp-Quick-Lessons-Export with content.xlsx" into ChatGPT using model 4o.
>- Step 2: Navigate to the useful prompts folder and locate the file called Prompt translates excel file to API body.txt.
>- Step 3: Use the prompt in that file and press enter to run it.
>- Step 4: Once the file is processed, check the resulting file to ensure:
- The summary for each item is not truncated (doesn't end with "...").
- The summary is not the same as the content.
>- Step 5: If the summary is either truncated or exactly the same as the content, write: "The summaries don't respect the instructions that were initially given" and press enter.



# Update the data in OpenAI Playground