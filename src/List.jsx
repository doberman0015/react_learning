import { } from 'react';

const items = [
    {
        task: "Learn React",
        icon: "😁",
        isCompleted: false,
    },
    {
        task: "repeat JavaScript",
        icon: "👌",
        isCompleted: true,
    },
    {
        task: "Keep learning",
        icon: "😒",
        isCompleted: true,
    },
]

export const List = () => {
    return (
        <div>
            {
                items.map((item, index) => {
                    return (
                        <section key={index} className={item.isCompleted ? "completed" : ""}>
                            <span>{item.icon}</span>
                            <h4>{item.task}</h4>
                        </section>
                    )
                })
            }
        </div>
    );
};