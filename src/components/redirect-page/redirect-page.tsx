import styled from "styled-components";
import React from "react";

const text = "Redirecting";

const RedirectPage = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [ count, setCount ] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => (count + 1) % 4);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    if(ref?.current) {
      ref.current.innerHTML = `${text}${".".repeat(count)}`;
    }
  }, [count]);

  return <RedirectPageStyle>
    <h2 ref={ref}>{text}</h2>
  </RedirectPageStyle>;
};

export { RedirectPage };

const RedirectPageStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;