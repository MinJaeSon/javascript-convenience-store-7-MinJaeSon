const getCurrentDate = () => {
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');

  return Number(formattedDate);
}

export default getCurrentDate;