import { TypedMoney } from '@commercetools/platform-sdk';

export const formatCommercetoolsMoney = (money?: TypedMoney) => {
  return (money?.centAmount ?? 0) / Math.pow(10, money?.fractionDigits ?? 2);
};
