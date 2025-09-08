export const SITE = {
  name: "SMS TRAVELS",
  phone: "93464 42660",
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
