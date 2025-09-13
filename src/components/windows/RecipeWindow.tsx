'use client';

import styles from './Windows.module.css';

const RecipeWindow = () => {
  return (
    <div className={styles.textEditor}>
      <pre>{`Birthday Cake Recipe 🎂

Ingredients:
- 2½ cups all-purpose flour
- 2½ tsp baking powder
- ½ tsp salt
- ½ cup unsalted butter, softened
- 1½ cups sugar
- 3 large eggs
- 2 tsp vanilla extract
- 1¼ cups whole milk

Instructions:
1. Preheat oven to 350°F (175°C)
2. Mix dry ingredients in a bowl
3. Cream butter and sugar until fluffy
4. Add eggs one at a time, then vanilla
5. Alternate adding dry ingredients and milk
6. Pour into prepared pans
7. Bake for 25-30 minutes
8. Cool completely before frosting

Enjoy your special day! 🎉`}</pre>
    </div>
  );
};

export default RecipeWindow;
