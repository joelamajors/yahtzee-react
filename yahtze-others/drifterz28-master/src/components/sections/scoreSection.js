import React, { Component} from 'react';

const Section = ({addPoints, index, section}) => {
  const {label, points, description} = section;
  const addPintsEvent = () => {
    addPoints(index);
  }
  return (
    <div className="sectionLabel">
      <div className="label">
        {label}
        <small className="helper">{description}</small>
      </div>
      <div onClick={addPintsEvent} className="scoreBox">
        {points}
        {section.hasBonus && <small className="bonus">+50</small>}
      </div>
      <div className="scoreBox"></div>
    </div>
  );
}

export default Section;
