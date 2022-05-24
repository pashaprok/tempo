import React from 'react';

type TitleProps = {
  text: string;
  cls: string;
};

export const HeadingOne: React.FC<TitleProps> = ({ text, cls }) => {
  const classes = `heading-one ${cls}`;
  return <h1 className={classes}>{text}</h1>;
};
