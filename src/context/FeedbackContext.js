import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is test Item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This is test Item 2',
      rating: 7,
    },
    {
      id: 3,
      text: 'This is test Item 3',
      rating: 8,
    },
  ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const deleteFeedback =  (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
     

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback =  (newFeedback) => {
     newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
   
  };

 const updatedFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
       setFeedbackEdit({
         item: {},
         edit: false,
       });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updatedFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
