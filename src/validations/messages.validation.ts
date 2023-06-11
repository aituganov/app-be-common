const makeValidationOpts = (message: string) => ({ message });

export const validationRequiredMessage = makeValidationOpts('The $property is required');
export const validationBooleanMessage = makeValidationOpts('The $property must be a boolean');
export const validationNumberMessage = makeValidationOpts('The $property must be a number');
export const validationStringMessage = makeValidationOpts('The $property must be a string');
export const validationLengtgMinMessage = makeValidationOpts('The $property must be at least $constraint1 characters');
export const validationLengthMaxMessage = makeValidationOpts('The $property must be at most $constraint1 characters');
export const validationNumberMinMessage = makeValidationOpts('The $property value must be at least $constraint1');
export const validationNumberMaxMessage = makeValidationOpts('The $property value must be at most $constraint1');