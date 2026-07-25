
import { QuestionCard } from "../../components/QuestionCard";
import cls from "./HomePage.module.css"

const cards = [
    {
      "id": "1",
      "question": "What is React?",
      "answer": "React is a JavaScript library for building user interfaces.",
      "description": "React helps developers build reusable UI components and efficiently update the DOM.",
      "resources": [
        "https://react.dev",
        "https://react.dev/learn"
      ],
      "level": 1,
      "completed": false,
      "editDate": "25.07.2026, 17:41"
    },
    {
      "id": "2",
      "question": "What is JSX?",
      "answer": "JSX is a syntax extension for JavaScript.",
      "description": "JSX lets you write HTML-like markup inside JavaScript that React transforms into function calls.",
      "resources": [
        "https://react.dev/learn/writing-markup-with-jsx"
      ],
      "level": 1,
      "completed": false,
      "editDate": "25.07.2026, 17:41"
    },
    {
      "id": "3",
      "question": "What is a component?",
      "answer": "A component is a reusable piece of UI.",
      "description": "Components are JavaScript functions that return JSX.",
      "resources": [
        "https://react.dev/learn/your-first-component"
      ],
      "level": 1,
      "completed": false,
      "editDate": "25.07.2026, 17:41"
    },
    {
      "id": "4",
      "question": "What are props?",
      "answer": "Props are inputs passed to components.",
      "description": "Props allow parent components to pass data to child components.",
      "resources": [
        "https://react.dev/learn/passing-props-to-a-component"
      ],
      "level": 1,
      "completed": false,
      "editDate": "25.07.2026, 17:41"
    },
    {
      "id": "5",
      "question": "What is state?",
      "answer": "State stores data that can change over time.",
      "description": "Updating state causes React to re-render the component.",
      "resources": [
        "https://react.dev/learn/state-a-components-memory"
      ],
      "level": 1,
      "completed": false,
      "editDate": "25.07.2026, 17:41"
    },
    {
      "id": "6",
      "question": "How do you update state?",
      "answer": "Use the setter returned by useState.",
      "description": "Never modify state directly.",
      "resources": [
        "https://react.dev/reference/react/useState"
      ],
      "level": 1,
      "completed": false,
      "editDate": "25.07.2026, 17:41"
    }
];

export const HomePage = () => {
    return (
        <>
            HomePage
            
            {cards.map(( card, index ) => {
                return <QuestionCard card={card} key={index} /> 
            })}
            <p>Demo text</p>
        </>
    );
};