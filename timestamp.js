// Get the current date and time
const now = new Date();

// Add 2 minutes to the current date and time
now.setMinutes(now.getMinutes() + 4);

// Get the timestamp for the new date and time
const newTimestamp = now.getTime();

console.log(newTimestamp/1000);
