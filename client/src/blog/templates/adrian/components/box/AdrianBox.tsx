import React, { FC } from 'react';

interface IAdrianBoxProps {
  iconClassName: string;
  title: string;
  btnText: string;
}

const AdrianBox: FC<IAdrianBoxProps> = ({
  iconClassName,
  title,
  btnText,
  children,
}) => {
  return (
    <div className="card bg-primary text-light">
      <div className="card-body text-center">
        <div className="h1 mb-3">
          <i className={iconClassName}></i>
        </div>
        <h3 className="card-title mb-3">{title}</h3>
        <p className="card-text">{children}</p>
        <a href="#" className="btn btn-info">
          {btnText}
        </a>
      </div>
    </div>
  );
};

export default AdrianBox;

