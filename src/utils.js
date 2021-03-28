import moment from "moment";

export const stockSymbols = {
  ADBE: [100, 200],
  AMZN: [80, 160],
  MSFT: [120, 240],
  GOOGL: [150, 250],
  WMT: [50, 200],
  MMYT: [10, 90]
};

const colors = [
  "#B21F00",
  "#C9DE00",
  "#2FDE00",
  "#00A6B4",
  "#6800B4",
  "#501800",
  "#4B5000",
  "#175000",
  "#003350",
  "#35014F"
];

export const getRandomColor = () => {
  const range = [0, colors.length];
  const idx = Math.floor(Math.random() * (range[1] - range[0])) + range[0];
  return colors[idx];
};

export const getColorByIdx = (idx) => {
  return colors[idx];
};

export const getStockPriceAPI = (symbol) => {
  const range = stockSymbols[symbol];
  return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
};

export const getAllStockSymbols = () => {
  return Object.keys(stockSymbols);
};

const getAllStockPrices = () => {
  let result = {};
  getAllStockSymbols().forEach((symbol) => {
    result[symbol] = getStockPriceAPI(symbol);
  });

  return result;
};

const getStockPriceByType = (stockInfoByTime, type, count) => {
  Array(count)
    .fill(1)
    .forEach(() => {
      stockInfoByTime[type].push(getAllStockPrices());
    });
};

const countMap = {
  current: 30,
  "1 day": 24,
  "1 month": 30,
  "1 year": 24
};

const stockInfoByTime = {
  current: [],
  "1 day": [],
  "1 month": [],
  "1 year": []
};

export const getStockPrices = (timeVal) => {
  if (stockInfoByTime[timeVal].length) return stockInfoByTime[timeVal];

  getStockPriceByType(stockInfoByTime, timeVal, countMap[timeVal]);

  return stockInfoByTime[timeVal];
};

export const getLabelsByDate = (date) => {
  const hmap = {
    current: Array(countMap[date])
      .fill(1)
      .map((_, idx, arr) => {
        const maxVal = arr.length - 1;
        const pastDate = moment().subtract(maxVal - idx, "minutes");
        return `${pastDate.hours()}:${pastDate.minutes()}`;
      }),

    "1 day": Array(countMap[date])
      .fill(1)
      .map((_, idx, arr) => {
        const maxVal = arr.length - 1;
        const pastDate = moment().subtract(maxVal - idx, "hours");
        return `${pastDate.hours()}`;
      }),

    "1 month": Array(countMap[date])
      .fill(1)
      .map((_, idx, arr) => {
        const maxVal = arr.length - 1;
        const pastDate = moment().subtract(maxVal - idx, "days");
        return `${pastDate.date()}/${pastDate.month() + 1}`;
      }),

    "1 year": Array(countMap[date])
      .fill(1)
      .map((_, idx, arr) => {
        const maxVal = arr.length - 1;
        const pastDate = moment().subtract(maxVal - idx, "months");
        return `${pastDate.month() + 1}/${pastDate.year()}`;
      })
  };
  return hmap[date];
};

export const getTitleByDate = (date) => {
  const hmap = {
    current: "Stock prices for past 30 minutes",
    "1 day": "Stock prices for past 24 hours",
    "1 month": "Stock prices for past 1 month",
    "1 year": "Stock prices for past 1 year"
  };

  return hmap[date];
};
