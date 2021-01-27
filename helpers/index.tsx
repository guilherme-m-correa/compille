// import cookie from 'cookie'

// export function parseCookies(req) {
//   return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
// }
import { parse, isDate } from 'date-fns'

export const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'dd/MM/yyyy', new Date())

  return parsedDate
}

export const normalizeCep = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 5) {
    return onlyNums
  }
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`
}

export const normalizeCnpj = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 2) {
    return onlyNums
  }
  if (onlyNums.length <= 5) {
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}`
  }
  if (onlyNums.length <= 8) {
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
      5,
      8
    )}`
  }
  if (onlyNums.length <= 12) {
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
      5,
      8
    )}/${onlyNums.slice(8, 12)}`
  }
  return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
    5,
    8
  )}/${onlyNums.slice(8, 12)}-${onlyNums.slice(12, 14)}`
}

export const normalizeCpf = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}`
  }
  if (onlyNums.length <= 9) {
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(
      6,
      9
    )}`
  }
  return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(
    6,
    9
  )}-${onlyNums.slice(9, 11)}`
}

export const normalizeDate = value => {
  if (!value) {
    return value
  }

  const formated = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1')

  return formated
}

export const normalizeAccBank = value => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/\D/g, '')

  if (onlyNums.length === 1) {
    return onlyNums
  }

  return `${onlyNums.slice(0, onlyNums.length - 1)}-${onlyNums.slice(
    onlyNums.length - 1,
    onlyNums.length
  )}`
}

export const normalizeNumber = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')

  return onlyNums
}

export const normalizePercentage = value => {
  let onlyNums = value.replace(/\D/g, '')

  if (onlyNums.length === 0) {
    onlyNums = ``
  } else if (onlyNums.length === 1) {
    onlyNums = `${onlyNums.slice(0, 1)}`
  } else if (onlyNums.length === 2) {
    onlyNums = `${onlyNums.slice(0, 2)}`
  } else if (onlyNums.length === 3) {
    onlyNums = `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 3)}`
  } else if (onlyNums.length === 4) {
    onlyNums = `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 4)}`
  } else if (onlyNums.length === 5 && onlyNums === '10000') {
    onlyNums = `100.00`
  } else {
    onlyNums = `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 4)}`
  }

  return onlyNums
}

export const normalizeTelephone = value => {
  if (!value) {
    return value
  }

  let onlyNums = value.replace(/\D/g, '')

  if (onlyNums.length === 0) {
    onlyNums = ``
  } else if (onlyNums.length === 1) {
    onlyNums = `(${onlyNums.slice(0, 1)}`
  } else if (onlyNums.length === 2) {
    onlyNums = `(${onlyNums.slice(0, 2)}`
  } else if (onlyNums.length < 7) {
    onlyNums = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}`
  } else if (onlyNums.length < 11) {
    onlyNums = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(
      2,
      6
    )}-${onlyNums.slice(6, 11)}`
  } else {
    onlyNums = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(
      2,
      7
    )}-${onlyNums.slice(7, 11)}`
  }

  return onlyNums
}

export const normalizeDDD = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '').slice(0, 2)

  return onlyNums
}

export const normalizeTelephoneNumber = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '').slice(0, 9)

  return onlyNums
}
