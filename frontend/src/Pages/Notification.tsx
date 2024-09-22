import React from 'react';

interface NotificationProps {
  name: string;
  qty: number;
}

const Notification: React.FC<NotificationProps> = (props) => {
  return (
    <div>
      <h1>Low Stock Alert: Action Required</h1>
      <div>
        <div>
          <h3>
            We are currently low on {props.name}. The available quantity is {props.qty}.
          </h3>
        </div>
        <div>
          <button>Noted</button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
