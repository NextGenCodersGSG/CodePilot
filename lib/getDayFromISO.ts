const dayFromISO = (isoDate: Date): string => {
    const date = new Date(isoDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return dayName;
} 
export default dayFromISO;