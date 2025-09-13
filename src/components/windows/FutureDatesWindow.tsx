'use client';

import { useState } from 'react';
import styles from './Windows.module.css';

interface DateIdea {
  category: string;
  ideas: string[];
}

const dateIdeas: DateIdea[] = [
  {
    category: "Car Date",
    ideas: [
      "FIND A SECLUDED PLACE",
      "EAT THE COOKIES THAT I WILL BAKE FOR YOU",
      "EAT CHILLI MILLIS AND LAYS",
      "CUDDLE AND KISSES",
      "MIGHT GET A LIL FREAKY"
    ]
  },
  {
    category: "Shalwar kameez Date",
    ideas: [
      "MATCHING BLACK SHALWAR KAMEEZ",
      "ROAM AROUND A LITTLE",
      "GO ON A DINNER DATE",
      "ALOT OF KISSES",
    ]
  },
  {
    category: "Casual Date",
    ideas: [
      "ALL CASUAL",
      "WE WILL EAT SNACKS",
      "GO TO BOWLING ARENA",
      "TRY ARCADE GAMES",
      "ALOT OF PICTURES, ALOT OF KISSES"
    ]
  },
  
];

const FutureDatesWindow = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const selectedCategoryData = dateIdeas.find(cat => cat.category === selectedCategory);

  return (
    <div className={styles.futureDatesContainer}>
      <h2 className={styles.futureDatesTitle}>💕 Future Date Ideas</h2>
      
      <div className={styles.dateSelector}>
        <div className={styles.selectGroup}>
          <label className={styles.selectLabel}>Choose a Category:</label>
          <select 
            className={styles.categorySelect}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select date type...</option>
            {dateIdeas.map((category, index) => (
              <option key={index} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && selectedCategoryData && (
          <div className={styles.dateAgenda}>
            <h3 className={styles.agendaTitle}>Date Agenda:</h3>
            <ul className={styles.ideaList}>
              {selectedCategoryData.ideas.map((idea, index) => (
                <li key={index} className={styles.ideaItem}>
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FutureDatesWindow;
