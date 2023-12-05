## Project Nudge

Nudge, our innovative web application, is designed with a singular mission: to revolutionize the way people of all ages and educational backgrounds engage with and comprehend complex concepts effectively and concisely. Rooted in the powerful Feynman technique, Nudge is not just a tool; **it's a learning companion that aspires to guide users through a journey of understanding within the framework of five carefully crafted questions.**

At its core, the Feynman technique is a proven learning methodology consisting of four transformative steps: selecting a concept, teaching it to a child, reviewing and refining understanding, and organizing notes for regular revisitation. Nudge takes inspiration from these steps, focusing primarily on the initial three to create an immersive learning experience.

The application invites users to input prompts on any given topic, and in return, it provides them with a thoughtful selection of five questions. These questions serve as prompts for users to articulate their understanding of the topic, fostering a deep and comprehensive grasp of the subject matter.

More than just a learning tool, Nudge is built on the fundamental belief that learning should be accessible, engaging, and tailored to individual needs. Whether you're a seasoned learner or just starting your educational journey, Nudge is here to empower you with a dynamic and personalized approach to understanding complex topics.

Embark on a learning adventure with Nudge, where the pursuit of knowledge is transformed into an enjoyable and enlightening experience.

# Features

Our web application has the following main features:

> **Question Generator**
> User will input a topic or a topic paragraph and the AI
> will respond with 5 questions that test your understanding
> on the topic.

> **Linked Entities Generator**
> After feedback is generated, proper nouns contained in the
> feedback will be clickable links to their wikipedia pages.

# Functionalities

# Azure Services

> **Azure AI | Language Studio: Find Linked Entities** > [_Find Linked Entities_](https://language.cognitive.azure.com/tryout/linkedEntities) is used to generate Wikipedia-linked entities during the feedback generation phase. The AI detects nouns that have corresponding Wikipedia articles where users can condust further research on. Our team followed the documentation for using this service on Node.js through Azure AI's Text Analysis Client which we then returned as string through our [LinkedEntities](/cinnamonroll//src/components/LinkedEntities.js) function.

> **Bing Resources** > _Bing Search_ is to generate recommended resources.

# Software Engineering Practices

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

which is inferior to a Question object abstraction seen in our [Question](/cinnamonroll/src/components/Question.js) function. This is because by turning Question into a function, it is conveniently scalable for future use of a AI response requesting.

**Demo Abstraction**
Our team made it habit to avoid cluttering the main page. To achieve this, we created several different components stored in the component folder and implemented them in our [Demo](/cinnamonroll/src/components/Demo.js) page through parameterized import functions.

###### DRYS Examples

[DRYS](https://www.baeldung.com/cs/dry-software-design-principle#:~:text=Definition,only%20once%20in%20the%20codebase.) denotes the concept of utilizing functional programming to avoid repeated code.
An example of this can be seen in our [createPrompt](/cinnamonroll/src/components/createPrompt.js) function that was implemented instead of unnecessary rewriting of the same code.

# Testing

Unit and Integration Testing throught testing frameworks were not set up during the designing phase. However, User Testing through the usage of the `console.log()` function to display successful API calls and successful method runs proved invaluable for debugging errors. An example of a preventative measure for errors include the implementation of [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statements to ensure that there are not any unnecessary API calls that will deny access permission.

## Challenges

> AI bugs/ wrong information
> Time crunch
> AI not free

## Accomplishments

## What we learned

## What's Next For Nudge

> A backend server for storing user data.

> An input for customizing the number of questions that can be generated with a maximum limit.

> An upgrade to a better AI model to reduce the likelihood of informational errors.

> A progress tracker to determine a users weakness and strengths.

> Adding more machine learning models to increase the dependency of the web application to multiple AI services.
