export const FieldsValidation = {
  Length: {
    Name: 64,
    Description: 256,
    Error: 4096,
    Cover: 256,
    Email: {
      Address: 320,
      Body: 384000,
      Subject: 998
    },
    SMS: {
      Phone: 15,
      SenderName: 11,
      Text: 737
    },
    Payment: {
      Description: 128
    },
    Pnone: {
      Code: 5,
      Number: 10
    },
    Reason: 512,
    Telegram: {
      Message: 4096
    },
    UUID_V4: 36
  },
  Price: {
    Min: 1,
    Max: 150000
  }
};

export const validationBooleanTransform = ({ value}) => ['true', true].indexOf(value) > -1;