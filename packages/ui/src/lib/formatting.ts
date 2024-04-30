
export function formattCurrency(amount:number){


  const formattedAmount = (amount / 100).toFixed(2);
  const formattedCurrency = new Intl.NumberFormat("en-IN",{
    style:"currency",
    currency:"INR"
  }).format(Number(formattedAmount));


  return formattedCurrency;
}