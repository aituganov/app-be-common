export const FieldsValidation = {
  Length: {
    Name: 64,
    Description: 256,
    Cover: 256,
    Email: 320,
    Pnone: {
      Code: 5,
      Number: 10
    },
    Telegram: {
      Message: 4096
    }
  },
  Price: {
    Min: 1,
    Max: 150000
  }
};