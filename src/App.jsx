import React, { useState, useEffect, useRef } from "react";
import "./EditableTable.css";

function App() {
  const cardList = [
    {
      id: 1,
      date: "2024-01-30",
      numberChange: 2,
      master: "Иванов И.И.",
      controlSystems: "РПТКМ-120",
      type: "Персонал",
      quantity: "100500 человек",
      comment: "Комментарий в 3-5 строчек, который тоже можно редактировать.",
      model: "КТП 2000 321",
      status: "Работает",
      quantityWorkers: 24,
      standard: "SPI 3432",
      percent: 98.4,
      commentWork: "Функционирует, но не бьет",
    },
  ];

  const [cardData, setCardData] = useState(cardList);
  const [editedFields, setEditedFields] = useState(new Set());
  const [counter, setCounter] = useState(10);
  const [progress, setProgress] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const progressIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetTimers = () => {
    clearTimeout(timeoutRef.current);
    clearInterval(progressIntervalRef.current);
    clearInterval(countdownIntervalRef.current);
    setCounter(0);
    setProgress(0);
    setShowCounter(false);
    setShowProgressBar(false);
    setIsCompleted(false);
  };

  const startTimers = () => {
    setShowCounter(true);
    setShowProgressBar(true);
    setCounter(10);
    setProgress(0);
    setIsCompleted(false);

    countdownIntervalRef.current = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 1) {
          return prevCounter - 1;
        } else {
          setShowCounter(false);
          setShowProgressBar(false);
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
      });
    }, 1000);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          setIsCompleted(true);
          clearInterval(progressIntervalRef.current);
          return 100;
        }
      });
    }, 1000);
  };

  const logEditedData = () => {
    console.log("Отредактированные данные:");
    editedFields.forEach((field) => {
      const item = cardData[0];
      console.log(`ID: ${item.id}, Поле: ${field}, Значение: ${item[field]}`);
    });
  };

  useEffect(() => {
    if (isCompleted && counter === 0) {
      logEditedData();
    }
  }, [isCompleted, counter]);

  const handleInputChange = (id, field, value) => {
    const originalValue = cardData[0][field];

    const updatedData = cardData.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setCardData(updatedData);

    // Если новое значение отличается от оригинального
    if (value !== originalValue) {
      setEditedFields((prev) => new Set(prev).add(field));
      resetTimers();
      timeoutRef.current = setTimeout(() => {
        startTimers();
      }, 5000);
    } else {
      // Если значение совпадает, сбрасываем таймеры и скрываем прогресс
      resetTimers();
    }
  };

  useEffect(() => {
    return resetTimers; // Очистка таймеров при размонтировании компонента
  }, []);

  return (
    <div className="for-box center">
      {cardData.map((item) => (
        <div className="table" key={item.id}>
          <div className="cell_table cell_table_date">
            <input
              type="date"
              value={item.date}
              onChange={(e) =>
                handleInputChange(item.id, "date", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_numberChange">
            <span>Смена</span>
            <input
              type="number"
              min="1"
              max="2"
              value={item.numberChange}
              onChange={(e) =>
                handleInputChange(item.id, "numberChange", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_master">
            <span>Мастер</span>
            <input
              type="text"
              value={item.master}
              onChange={(e) =>
                handleInputChange(item.id, "master", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_controlSystems">
            <input
              type="text"
              value={item.controlSystems}
              onChange={(e) =>
                handleInputChange(item.id, "controlSystems", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_type">
            <input
              type="text"
              value={item.type}
              onChange={(e) =>
                handleInputChange(item.id, "type", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_quantity">
            <input
              type="text"
              value={item.quantity}
              onChange={(e) =>
                handleInputChange(item.id, "quantity", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_comment">
            <textarea
              type="text"
              value={item.comment}
              onChange={(e) =>
                handleInputChange(item.id, "comment", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_model">
            <input
              type="text"
              value={item.model}
              onChange={(e) =>
                handleInputChange(item.id, "model", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_status">
            <input
              type="text"
              value={item.status}
              onChange={(e) =>
                handleInputChange(item.id, "status", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_quantityWorkers">
            <input
              type="number"
              value={item.quantityWorkers}
              onChange={(e) =>
                handleInputChange(item.id, "quantityWorkers", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_standard">
            <input
              type="text"
              value={item.standard}
              onChange={(e) =>
                handleInputChange(item.id, "standard", e.target.value)
              }
            />
          </div>
          <div className="cell_table cell_table_percent">
            <input
              type="number"
              step={0.1}
              value={item.percent}
              onChange={(e) =>
                handleInputChange(item.id, "percent", e.target.value)
              }
            />
            <span>%</span>
          </div>
          <div className="cell_table cell_commentWork">
            <input
              type="text"
              value={item.commentWork}
              onChange={(e) =>
                handleInputChange(item.id, "commentWork", e.target.value)
              }
            />
          </div>
        </div>
      ))}
      {showCounter && (
        <div className="counter">
          Данные будут отправлены через: {counter} секунд
        </div>
      )}
      {showProgressBar && (
        <div
          style={{
            width: "100%",
            background: "#FFAE12",
            borderRadius: "34px",
          }}
        >
          <div
            style={{
              height: "20px",
              width: `${progress}%`,
              background: "#E3E3E3",
              transition: "width 1s",
              borderRadius: "34px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
