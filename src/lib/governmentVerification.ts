// Basic verification utilities - customize as needed
export const verifyAadhar = async (aadharNumber: string) => {
  return {
    isValid: true,
    message: 'Aadhar verification successful',
  };
};

export const verifyPAN = async (panNumber: string) => {
  return {
    isValid: true,
    message: 'PAN verification successful',
  };
};