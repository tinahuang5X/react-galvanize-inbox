import React from 'react';
//import './index.css';

function renderLabels(labels) {
  return labels.map((label, labelKey) => {
    return (
      <span className="label label-warning" key={labelKey}>
        {label}
      </span>
    );
  });
}

export default function MessageComponent({
  selected,
  message,
  onMarkAsReadMessage,
  onSelectMessage,
  onDeselectMessage,
  onStarMessage,
  onUnstarMessage
}) {
  const readClass = message.read ? 'read' : 'unread';
  const selectedClass = selected ? 'selected' : '';
  const starClass = message.starred ? 'star fa fa-star' : 'star fa fa-star-o';
  //let click = false;
  function handleSelect(event) {
    //event.preventDefault();
    selected ? onDeselectMessage(message.id) : onSelectMessage(message.id);
  }

  function handleStar(event) {
    event.preventDefault();
    message.starred ? onUnstarMessage(message.id) : onStarMessage(message.id);
    //click = true;
    //console.log(click);
  }

  function handleRead(event) {
    event.preventDefault();
    onMarkAsReadMessage(message.id);
  }

  return (
    <div className={`row message ${readClass} ${selectedClass}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={selected === true}
              onChange={handleSelect}
            />
          </div>
          <div className="col-xs-2">
            <i className={starClass} onClick={handleStar} />
          </div>
          {/* {`${click}`}
          {click === true ? <p> Pleae wait one second. </p> : null} */}
        </div>
      </div>
      <div className="col-xs-11 text-left">
        {renderLabels(message.labels)}
        {/* {message.labels.map((label, labelIndex) =>
          <span className="label label-warning" key={labelIndex}>
            {label}
          </span>
        )} */}
        <a href="." onClick={handleRead}>
          {message.subject || 'no subject'}
        </a>
      </div>
    </div>
  );
}
