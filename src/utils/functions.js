export const addComma = (number) => {
  let [integerPart, decimalPart] = number.toString().split(".");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart === undefined
    ? integerPart
    : `${integerPart}.${decimalPart}`;
};

export const getNumberIntervals = (ageGroups) => {
  const intervals = ageGroups.toSorted((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged = [];
  const overlaps = [];
  const notInclude = [];

  for (let i = 0; i < intervals.length; i++) {
    let current = intervals[i];
    if (merged.length === 0 || merged[merged.length - 1][1] < current[0]) {
      merged.push(current);
    } else {
      // 避免輸出與現有 overlaps 重複範圍的資料
      if (
        overlaps.length !== 0 &&
        overlaps[overlaps.length - 1][0] < current[0] &&
        overlaps[overlaps.length - 1][1] > current[1]
      ) {
        continue;
      }
      let last = merged.pop();
      merged.push([last[0], Math.max(last[1], current[1])]);
      overlaps.push([
        Math.max(last[0], current[0]),
        Math.min(last[1], current[1]),
      ]);
    }
  }

  let start = 0;
  for (let i = 0; i < merged.length; i++) {
    let [intervalStart, intervalEnd] = merged[i];
    if (start < intervalStart) {
      notInclude.push([start, intervalStart - 1]);
    }
    start = intervalEnd + 1;
  }
  if (start <= 20) {
    notInclude.push([start, 20]);
  }

  return { overlap: overlaps, notInclude: notInclude };
};
