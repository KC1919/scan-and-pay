// Function to check if a date is valid
export const isValidDate = (dateString: string | undefined): boolean => {
    return !!dateString && !isNaN(new Date(dateString).getTime());
};