export const formatCurrency = (value) => {
  if (!value) return "0"
  if (typeof value !== 'number') {
    return value; // Trả về giá trị gốc nếu không phải là số
  }

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  const formattedValue = formatter.format(value);

  return formattedValue.replace(/₫/g, 'đ');
}
export const formatNumberWithDots = (number) => {
  // Chuyển số thành chuỗi
  if (!number) return 0
  let numStr = number.toString();

  // Sử dụng regex để thêm dấu chấm sau mỗi 3 chữ số
  let formattedStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formattedStr;
}
export const hasEmptyField = (obj) => {
  for (let key in obj) {
    if (obj[key] === '') {
      return true;
    }
  }
  return false;
}
export const hasEmptyOrNullField = (obj) => {
  for (let key in obj) {
    if (obj[key] === ''||obj[key] === null) {
      return true;
    }
  }
  return false;
}