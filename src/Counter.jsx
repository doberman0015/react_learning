import { useState } from 'react';
import { Button } from './components/Button/Button';

export const Counter = () => {

    // let count = 1;
    // return (
    //     <button
    //       type="button"
    //       className="counter"
    //       onClick={() => ++count}
    //     >
    //       Count is {count}
    //     </button>
    // );

    const [count, setCount] = useState(0);

    const setCounterHandler = () => {
      setCount(count + 1)
    }

    return (
        <Button
          type="button"
          className="counter"
          onClick={setCounterHandler}
        >
          Count is {count}
        </Button>
    );
};