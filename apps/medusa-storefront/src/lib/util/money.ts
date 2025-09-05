type ConvertToLocaleParams = {
  amount: number | null | undefined;
  currency_code: string | null | undefined;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = 'en-US',
}: ConvertToLocaleParams) => {
  // Handle null/undefined amount
  if (amount == null) {
    return '0';
  }

  // Handle null/undefined currency_code
  if (!currency_code) {
    return amount.toString();
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency_code,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

// Helper function to check if a value is empty
const isEmpty = (value: any): boolean => {
  return (
    value == null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};
