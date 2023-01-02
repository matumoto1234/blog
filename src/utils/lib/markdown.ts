import { load, FAILSAFE_SCHEMA } from 'js-yaml'
import { Decoder, object, string } from '@mojotech/json-type-validation'

type MetaData = {
  title: string
  date: Date
}

export const extractMetaData = async (text: string): Promise<MetaData> => {
  const metaRegExp = RegExp(/^---[\r\n](((?!---).|[\r\n])*)[\r\n]---$/m)

  const rawMetaData = metaRegExp.exec(text)

  if (!rawMetaData) {
    return {
      title: '',
      date: new Date(),
    }
  }

  const metaData = load(rawMetaData[1], { schema: FAILSAFE_SCHEMA }) as MetaData

  // validator
  const metaDecoder: Decoder<MetaData> = object({
    title: string(),
    date: string().map((x) => new Date(x)),
  })

  // validate meta data
  return await metaDecoder.runPromise(metaData)
}

export const getBody = (text: string): string => {
  const metaRegExp = RegExp(/^---[\r\n](((?!---).|[\r\n])*)[\r\n]---$/m)
  return text.replace(metaRegExp, '')
}
