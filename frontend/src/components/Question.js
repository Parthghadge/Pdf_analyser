import React, { useState } from 'react';
import axios from 'axios';

const Question = ({ documentId, onAnswer }) => {
    const [question, setQuestion] = useState('');

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleAsk = async () => {
        const response = await axios.post('/question', {
            document_id: documentId,
            question,
        });

        onAnswer(response.data.answer);
    };

    return (
        <div>
            <input type="text" value={question} onChange={handleQuestionChange} />
            <button onClick={handleAsk}>Ask</button>
        </div>
    );
};

export default Question;
