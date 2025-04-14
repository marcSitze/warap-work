const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "XAF",
  }).format(amount);
};

export default formatAmount;
