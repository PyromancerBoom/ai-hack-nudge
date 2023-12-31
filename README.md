# Project Nudge

Deployed Project: [projectnudge.vercel.app/](https://projectnudge.vercel.app/)

### Table of Contents

1. [About and re-imagining future of education](#about)
2. [Features](#features)
   - [Personalised Questions and feedback](#persQues)
   - [Recommendations](#recom)
3. [Demo](#example)
4. [Azure Services](#azure)
5. [Software Engineering Practices](#swepractice)
6. [Testing](#test)
7. [Challenges](#challenges)
8. [What's next?](#misc)

## About and re-imagining future of education <a name="about"></a>

Nudge, our innovative web application, is designed with an innovative mission: to revolutionize the way people of all ages and educational backgrounds engage with and comprehend complex concepts effectively and concisely. Rooted in the powerful Feynman technique, Nudge is not just a tool; **it's a learning companion that aspires to guide users through a journey of understanding within the framework of five carefully crafted questions.**

At its core, the Feynman technique is a proven learning methodology consisting of four transformative steps: selecting a concept, teaching it to a child, reviewing and refining understanding, and organizing notes for regular revisitation. Nudge takes inspiration from these steps, focusing primarily on the initial three to create an immersive learning experience.

The application invites users to input prompts on any given topic, and in return, it provides them with a thoughtful selection of five questions. These questions serve as prompts for users to articulate their understanding of the topic, fostering a deep and comprehensive grasp of the subject matter.

More than just a learning tool, Nudge is built on the fundamental belief that learning should be accessible, engaging, and tailored to individual needs. Whether you're a seasoned learner or just starting your educational journey, Nudge is here to empower you with a dynamic and personalized approach to understanding complex topics.

Embark on a learning adventure with Nudge, where the pursuit of knowledge is transformed into an enjoyable and enlightening experience.

## Features <a name="features"></a>

Our web application has the following main features:

> **Personalised Questions and feedback** <a name="persQues"></a>
> User will input a topic or a topic paragraph and the AI
> will respond with 5 questions that test your understanding
> on the topic.
> The User then has to answer those questions and AI will provide them
> feedback on their understanding.

> **Recommendations** <a name="recom"></a>
> The AI then also gives them recommendations
> as clickable links to learn more!

## Demo <a name="example"></a>

On entering the website, the user will be greeted with a home page that will prompt them to enter a topic or some text
![Example](/documentationImages/home.jpg)

After entering the topic, the user will receive 5 questions that will test their understanding of the topic and they can answer them.
![image](https://github.com/PyromancerBoom/ai-hack-nudge/assets/58062202/7097747b-3abb-403b-b35c-5cb5f722b01b)

The AI will then give them feedback on their understanding of the topic.
![image](https://github.com/PyromancerBoom/ai-hack-nudge/assets/58062202/5818b3c3-4284-42af-947d-d00b2efd32cc)

Once finished they can choose to retry with another text.
![image](https://github.com/PyromancerBoom/ai-hack-nudge/assets/58062202/8ac142c0-41e9-4d3d-a3e7-ae22dcc757c3)


## Azure Services <a name="azure"></a>

> **Azure AI | Language Studio: Find Linked Entities:** [_Find Linked Entities_](https://language.cognitive.azure.com/tryout/linkedEntities) is used to generate Wikipedia-linked entities during the feedback generation phase. The AI detects nouns that have corresponding Wikipedia articles where users can conduct further research. Our team followed the documentation for using this service on Node.js through Azure AI's Text Analysis Client which we then returned as a string through our [LinkedEntities](/cinnamonroll//src/components/LinkedEntities.js) function.

> **Bing Resources:** [_Bing Search_](/cinnamonroll/src/components/BingSearch.js) is used to generate recommended resources through a call to Bing's browser search function.

## Software Engineering Practices <a name="swepractice"></a>

###### Abstraction Examples

**Question**
`Question.js` is an abstraction of a Question function used to map
onto each of the 5 questions generated. A previously implemented inferior design of the AI response in the [OpenAIPromptGenerator](/cinnamonroll//src/OpenAIPromptGenerator.js) file is:

```
{aiResponseArray.map((question, index) => (
<div key={index} className="flex flex-col mt-4">
<h3 className="text-lg text-gray-300">
Question {index + 1}:
</h3>
<p className="text-base text-gray-300 mt-2">{question}</p>
<button
onClick={() => handleButtonPress(index)}
className={`rounded-lg px-3 py-0.5 border-1 border-gray-300 text-white ${
                pressedQuestions[index] ? "bg-green-500" : "bg-gray-900"
              } hover:bg-gray-700 hover:text-white duration-300`} >
{pressedQuestions[index] ? "Pressed" : "Press Me"}
</button>
</div>
))}
```

which is inferior to a Question object abstraction seen in our [Question](/cinnamonroll/src/components/Question.js) function. This is because by turning Question into a function, it is conveniently scalable for future use of AI response requesting.

**Demo Abstraction**
Our team made it a habit to avoid cluttering the main page. To achieve this, we created several different components stored in the component folder and implemented them in our [Demo](/cinnamonroll/src/components/Demo.js) page through parameterized import functions.

###### DRYS Examples

[DRYS](https://www.baeldung.com/cs/dry-software-design-principle#:~:text=Definition,only%20once%20in%20the%20codebase.) denotes the concept of utilizing functional programming to avoid repeated code.
An example of this can be seen in our [createPrompt](/cinnamonroll/src/components/createPrompt.js) function that was implemented instead of unnecessary rewriting of the same code.

## Testing <a name="test"></a>

Unit and Integration Testing throughout testing frameworks were not set up during the designing phase. However, User Testing through the `console.log()` function to display successful API calls and successful method runs proved invaluable for debugging errors. An example of a preventative measure for errors includes the implementation of [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statements to ensure that there are not any unnecessary API calls that will deny access permission.

## Challenges <a name="challenges"></a>

AI bugs were the common errors we faced throughout the process of designing the web application. The prompt would have to be carefully constructed to ensure that the formatting of the AI response fits our team's requirements. Although quite rare, there were times when even with very specific prompts, the AI output would return wrong results such as blank questions. This is the reason why a better AI model would be desirable.

Additionally, our team was under significant time pressure as our availability to start working on this application was hindered. We also received news of this Hackathon late into the submission period so we needed to act within a week.

Lastly, calls to the OpenAI API incurred a billing which meant that only a finite amount of queries could be done before we ran out of free access.

Although there were several challenges, most of the challenges did not significantly change the course of action to such an extent that our team needed to change our primary design objectives.

## What's Next For Nudge <a name="misc"></a>

> A backend server for storing user data.

> An input for customizing the number of questions generated with a maximum limit.

> An upgrade to a better AI model to reduce the likelihood of informational errors.

> A progress tracker to determine a user's weaknesses and strengths.

> Adding more machine learning models to increase the dependency of the web application on multiple AI services.
