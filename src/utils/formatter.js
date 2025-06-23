export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(price);
};

export const formatMarketCapChange24hr = (change) => {
  const formattedChange = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(Math.abs(change));

  if (change > 0) {
    return `<i class="fa-solid fa-arrow-up text-green-500"></i> +${formattedChange}%`;
  } else if (change < 0) {
    return `<i class="fa-solid fa-arrow-down text-red-500"></i> -${formattedChange}%`;
  } else {
    return `<i class="fa-solid fa-minus text-gray-500"></i> ${formattedChange}%`;
  }
};

export const formatMarketCap = (marketCap) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(marketCap);
};

export const format24hVolume = (volume) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(volume);
};
