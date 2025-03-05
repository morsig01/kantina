export const weekdays = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];

export const getToday = () => weekdays[new Date().getDay() - 1] || "Mandag";
