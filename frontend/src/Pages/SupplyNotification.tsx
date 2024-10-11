import React from 'react';

// Define the type for the component props
interface SupplyNotificationProps {
    name: string;
    qty: number;
    onApprove: () => void; // Function to handle approval
    onReject: () => void;  // Function to handle rejection
}

function SupplyNotification(props: SupplyNotificationProps) {
    return (
        <div>
            <h1>Pending Supplies Alert: Action Required</h1>
            <div>
                <div>
                    <h3>
                        We received the item {props.name}.<br />
                        The supplied quantity is {props.qty}
                    </h3>
                </div>
                <div>
                    <button onClick={props.onApprove}>Noted</button>
                    <button onClick={props.onReject}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SupplyNotification;
