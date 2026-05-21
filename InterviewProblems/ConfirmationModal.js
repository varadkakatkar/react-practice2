import React, { useState } from "react";

import "./ConfirmationModal.css";

function ConfirmationModal() {
  const [actionStatus, setActionStaus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="modal-container">
      <button
        className="open-modal-btn"
        onClick={() => setIsOpen(true)}
        data-testid="open-modal-button"
      >
        Open Confirmation Modal
      </button>

      {isOpen && (
        <div className="modal-backdrop" data-testid="confirmation-modal">
          <div className="modal-box">
            <h2 className="modal-title" data-testid="modal-title">
              Confirm Action
            </h2>
            <p className="modal-message" data-testid="modal-message">
              Are you sure you want to proceed?
            </p>

            <div className="modal-buttons">
              <button
                className="confirm-btn"
                onClick={() => {
                  setIsOpen(false);
                  setActionStaus("Confirmed");
                }}
                data-testid="confirm-button"
              >
                Confirm
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setIsOpen(false);
                  setActionStaus("Cancelled");
                }}
                data-testid="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="action-status" data-testid="action-status">
        {actionStatus}
      </div>
    </div>
  );
}

export default ConfirmationModal;
