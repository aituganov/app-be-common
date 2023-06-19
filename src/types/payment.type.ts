export enum AvailableCurrencies {
  RUB = 'rub'
};

export enum PaymentMethodTypes {
  Alfabank = 'alfabank',
  Card = 'bank_card',
  Cash = 'cash',
  SBP = 'sbp',
  Sberbank = 'sberbank',
  SberbankB2B = 'b2b_sberbank',
  Installments = 'installments',
  Mobile = 'mobile_balance',
  Tinkoff = 'tinkoff_bank',
  Qiwi = 'qiwi',
  YooMoney = 'yoo_money'
};

export enum PaymentReceiptStatuses {
  Canceled = 'canceled',
  Pending = 'pending',
  Succeeded = 'succeeded'
};

export enum PaymentStatuses {
  Success = 'success',
  Refund = 'refund',
  Reject = 'reject',
  Wait = 'wait'
};