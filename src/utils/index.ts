export function sortBySMEFirst(
  a: { product_name: string },
  b: { product_name: string }
) {
  const aIncludesSME = a.product_name.includes("SME");
  const bIncludesSME = b.product_name.includes("SME");

  if (aIncludesSME && !bIncludesSME) {
    return -1; // a comes first
  } else if (!aIncludesSME && bIncludesSME) {
    return 1; // b comes first
  } else {
    return 0; // no preference
  }
}

export function generateRandomId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export function createFormData(data: Record<string, any>) {
  const formData = new FormData();
  for (let key in data) {
    if (data.hasOwnProperty(key) && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }

  return formData;
}

export function getRefId(refId?: string) {
  return refId || generateRandomId(50);
}

export const voiceOtpClasses = {
  THREE_DIGITS_ONCE: "B1DXW4V8YA",
  THREE_DIGITS_TWICE: "Z0C5EW5YYJ",
  FOUR_DIGITS_ONCE: "LXNBWB05H2",
  FOUR_DIGITS_TWICE: "AEYBPV3VKA",
  FIVE_DIGITS_ONCE: "IUQSNAWSRF",
  FIVE_DIGITS_TWICE: "54CMD81FE7",
  SIX_DIGITS_ONCE: "AAYQMYWPFY",
  SIX_DIGITS_TWICE: "M299S1Z6S5",
};
