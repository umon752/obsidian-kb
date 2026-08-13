# useImperativeHandle   
[官方文件](https://react.dev/reference/react/useImperativeHandle)   
[youtube](https://www.youtube.com/watch?v=4OHw0CFPWZw)   
元件要從父層取得 ref 值的時候使用   
   
父層：   
```
import { useRef } from 'react';
import Input from './Input.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    // This won't work because the DOM node isn't exposed:
    // ref.current.style.opacity = 0.5;
  }

  return (
    <form>
      <MyInput placeholder="Enter your name" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}

```
   
元件：   
```
import { useRef, useImperativeHandle } from 'react';

function Input({ ref, ...props }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
};

export default Input;


```
