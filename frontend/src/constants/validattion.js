import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1).required()
})

export const registrationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1).required(),
  terms: yup.bool().oneOf([true], 'Please accept  privacy policy & terms').required()
})
export const resetSchema = yup.object({
  email: yup.string().email().required()
})
export const movieSchema = yup.object({
  file: yup
    .array()
    .test('isFile', 'Please select file', value => {
      return value && value[0]
    })
    .required(),
  title: yup.string().required(),
  description: yup.string().required(),
  isFree: yup.string().required()
})
export const movieEditSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  isFree: yup.string().required()
})
export const songSchema = yup.object({
  file: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  isFree: yup.string().required(),
  cover: yup.string()
})
