import React from 'react';
import dayjs from 'dayjs';

const RecipeDate = ({ recipe }) => {
  // Assuming recipe.date is a valid date string or a Date object
  //TODO cambiar esto a el cambo last updated at
  const year = dayjs(recipe.date).utc().year();
  const month = dayjs(recipe.date).utc().month() + 1; // Months are 0-indexed in dayjs
  const day = dayjs(recipe.date).utc().date();

  return (
    <div>
      <p>Fecha: {year}/{month}/{day}</p>
    </div>
  );
};

export default RecipeDate;
