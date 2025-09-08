export const SITE = {
  name: "Mysa",
  phone: "+1 (555) 555-5555",
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
