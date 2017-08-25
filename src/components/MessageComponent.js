import React from 'react';
//import './index.css';

function renderLabels(labels) {
  return labels.map(label => {
    return (
      <span className="label label-warning">
        {label}
      </span>
    );
  });
}

export default function MessageComponent({ selected, message }) {
  const readClass = message.read ? 'read' : 'unread';
  //const selectedClass = message.selected ? 'selected' : '';
  const starClass = message.starred ? 'star fa fa-star' : 'star fa fa-star-o';

  return (
    <div className={`row message ${readClass}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={selected === true ? 'checked' : null}
            />
          </div>
          <div className="col-xs-2">
            <i className={starClass} />
          </div>
        </div>
      </div>
      <div className="col-xs-11 text-left">
        {renderLabels(message.labels)}
        <a href="index.html">
          {message.subject}
        </a>
      </div>
    </div>
  );
}
