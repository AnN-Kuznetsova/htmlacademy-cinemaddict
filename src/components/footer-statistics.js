export const createFooterStatisticsTemplate = (filmsCount) => {
  return (
    `<p>${filmsCount.toLocaleString(`ru-RU`)} movies inside</p>`
  );
};
