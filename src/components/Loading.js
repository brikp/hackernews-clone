/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

function Loading({ text = 'Loading', speed = 250 }) {
  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      content === `${text}...`
        ? setContent(text)
        : setContent((prevContent) => `${prevContent}.`);
    }, speed);

    return () => {
      window.clearInterval(interval);
    };
  }, [content, speed, text]);

  return (
    <p style={styles.content}>
      {content}
    </p>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

export default Loading;
