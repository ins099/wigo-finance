export const formatBalance = (balance: any) => {
  let numStr = String(balance);

  // Split the string into parts before and after the decimal point (if any)
  let parts = numStr.split(".");

  // Insert commas every three digits in the part before the decimal point
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Join the parts back together, with a decimal point if necessary
  return parts.join(".");
};

