import "./NotificationOfSendingStatus.css";

const NotificationOfSendingStatus = ({ notification, statusSending }) => {
  return (
    <div>
      {notification && (
        <div>
          {statusSending ? (
            <h3 className="notification">
              Email sent successfully!
              <i className="fa-solid fa-xmark"></i>
            </h3>
          ) : (
            <h3 className="notification">
              Failed to send email! <i className="fa-solid fa-xmark"></i>
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationOfSendingStatus;
