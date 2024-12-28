import React, { useState, useEffect } from "react";
import axios from "axios";

function QuizApp() {
  
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/question/");
        const data = response.data;

        if (
          !data.questions ||
          !data.reponses ||
          data.questions.length === 0 ||
          data.reponses.length < 4
        ) {
          setError("Données insuffisantes pour afficher le quiz.");
          return;
        }

        const shuffledQuestions = shuffleArray(data.questions);
        setQuestions(shuffledQuestions);
        setAnswers(data.reponses);

        generateChoices(shuffledQuestions[0], data.reponses);
      } catch (err) {
        setError("Erreur lors du chargement des données. Vérifiez l'API.");
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const generateChoices = (question, allAnswers) => {
    const correctAnswer = allAnswers.find(
      (answer) => answer.id === question.id_reponce
    );

    if (!correctAnswer) {
      setError("Impossible de trouver la bonne réponse pour cette question.");
      return;
    }

    const nextAnswers = allAnswers.filter(
      (answer) =>
        answer.id > question.id_reponce &&
        answer.id <= question.id_reponce + 3
    );

    if (nextAnswers.length < 3) {
      setError("Pas assez de réponses disponibles pour cette question.");
      return;
    }

    const shuffledChoices = [correctAnswer, ...nextAnswers].sort(
      () => Math.random() - 0.5
    );

    setChoices(shuffledChoices);
  };

  const handleAnswerSelection = (selectedChoice) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedChoice.id === currentQuestion.id_reponce) {
      setScore(score + 1);
    }

    setIsTransitioning(true);

    setTimeout(() => {
      handleNextQuestion();
      setIsTransitioning(false);
    }, 500); // Délai pour la transition
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      generateChoices(questions[nextIndex], answers);
    } else {
      alert(`Quiz terminé ! Votre score est de ${score+1}/${questions.length}`);
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (questions.length === 0 || answers.length === 0) {
    return <p>Chargement...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 Quiz Anime 🎉</h1>
      <p style={styles.score}>Score : {score}</p>
      <div style={styles.progressBarContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${progressPercentage}%`,
          }}
        ></div>
      </div>
      <div
        style={{
          ...styles.questionContainer,
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateX(-50px)" : "translateX(0)",
          transition: "all 0.5s ease",
        }}
      >
        <h2 style={styles.question}>{currentQuestion.phrase}</h2>
        <ul style={styles.choicesContainer}>
          {choices.map((choice) => (
            <li
              key={choice.id}
              onClick={() => handleAnswerSelection(choice)}
              style={styles.choice}
              className="choice"
            >
              {choice.mot}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    margin: "50px auto",
    color: "#fff",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#fff",
  },
  score: {
    fontSize: "1.5rem",
    color: "#ffd700",
    marginBottom: "20px",
  },
  progressBarContainer: {
    backgroundColor: "#ddd",
    borderRadius: "10px",
    height: "10px",
    width: "100%",
    marginBottom: "20px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.3s ease",
  },
  questionContainer: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
  },
  question: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#444",
  },
  choicesContainer: {
    listStyleType: "none",
    padding: 0,
  },
  choice: {
    cursor: "pointer",
    padding: "15px",
    margin: "10px auto",
    backgroundColor: "#f4a261",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.2rem",
    transition: "all 0.3s ease",
    maxWidth: "300px",
    textAlign: "center",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
  },
};


export default QuizApp
