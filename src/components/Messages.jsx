import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import SERVER_BASE_URL from './server/serURL.js'

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `${SERVER_BASE_URL}/getallmessage`,
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // deleteMessage
  const deleteMessage = async (id) => {
    try {
      const response = await axios.delete(`${SERVER_BASE_URL}/delete-message/${id}`);
      alert(response.data.message || "Message Deleted!");
      // Update the appointments list in the UI
      setMessages((prevAppointments) =>
        prevAppointments.filter((message) => message._id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete the appointment.");
    }
  };


  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
                <li id="they" key={element._id}>
           
            <button id="hem1" onClick={() => deleteMessage(element._id)}>Delete</button>
          </li>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
