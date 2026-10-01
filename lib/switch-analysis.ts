import { z } from 'zod'

const optionalText = (max: number) => z.string().trim().max(max).default('')
export const switchAnalysisSchema = z.object({
  requestId: z.string().uuid(),
  name: z.string().trim().min(1).max(150).regex(/^[^\r\n]+$/),
  email: z.string().trim().email().max(254),
  phone: optionalText(40).refine(value => !value || /^[+\d() .-]{7,40}$/.test(value)),
  address: optionalText(500),
  managed: z.enum(['Self-managed', 'Another management company', 'Not yet rented']),
  fee: optionalText(10).refine(value => !value || /^\d{1,3}(\.\d{1,2})?%?$/.test(value) && Number(value.replace('%', '')) <= 100),
  notice: optionalText(150),
  listing: z.enum(['', 'Me', 'My manager', 'Not sure']).default(''),
  license: z.enum(['', 'Me', 'My manager', 'Not sure', 'Not in City of SD']).default(''),
  website: z.string().max(0).default(''),
}).strict()

export type SwitchAnalysisSubmission = z.infer<typeof switchAnalysisSchema>

export function switchAnalysisEmail(data: SwitchAnalysisSubmission) {
  return [
    'New Free Switch Analysis Request',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Property address: ${data.address || 'Not provided'}`,
    `Currently managed: ${data.managed}`,
    `Current management fee: ${data.fee || 'Not provided'}`,
    `Notice period: ${data.notice || 'Not provided'}`,
    `Airbnb listing owner: ${data.listing || 'Not provided'}`,
    `STRO license holder: ${data.license || 'Not provided'}`,
    'Source: /property-management/switch-property-managers-san-diego',
  ].join('\n')
}
