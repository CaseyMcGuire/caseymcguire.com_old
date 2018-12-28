export default {
  parseIntOrNum(num: string, other: number): number {
    const parsedNum = parseInt(num, 10);
    if (isNaN(parsedNum)) {
      return other;
    }
    return parsedNum;
  }
}