import { useMemo } from 'react'
// type
import type {
  CouncilSpeechFromRes,
  CouncilSpeechData,
} from '@/types/council-speech'
import type { CouncilDistrict } from '@/types/council'
// utils
import { formatDate } from '@/utils/date-formatters'
import { summaryParser } from '@/utils/string-parser'
import { isValidCouncil } from '@/utils/council'

export const useCouncilSpeechData = (
  speechData: CouncilSpeechFromRes
): CouncilSpeechData => {
  return useMemo(() => {
    return {
      slug: speechData.slug,
      date: formatDate(speechData.date, 'YYYY/M/D'),
      title: speechData.title,
      attendee: speechData.attendee || '',
      summary: speechData.summary ? summaryParser(speechData.summary) : '',
      content: speechData.content || '',
      relatedTopics:
        speechData.topic
          ?.filter((t) => isValidCouncil(t.city))
          .map((t) => ({
            title: t.title,
            slug: t.slug,
            city: t.city as CouncilDistrict,
          })) || [],
      sourceLink: speechData.sourceLink || '',
      councilor:
        speechData.councilMember &&
        isValidCouncil(speechData.councilMember.city)
          ? {
              city: speechData.councilMember.city,
              ...speechData.councilMember.councilor,
            }
          : undefined,
    }
  }, [speechData])
}
