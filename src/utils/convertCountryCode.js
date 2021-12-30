import { isoCountries } from 'Constants'

const convertCountryCode = (code) => {
  // eslint-disable-next-line no-prototype-builtins
  if (isoCountries.hasOwnProperty(code)) {
    return isoCountries[code]
  } else {
    return code
  }
}

export default convertCountryCode
