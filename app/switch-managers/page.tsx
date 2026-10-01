import { permanentRedirect } from 'next/navigation'
import { SWITCH_PAGE_PATH } from '@/lib/site-config'

export default function LegacySwitchManagersPage() {
  permanentRedirect(SWITCH_PAGE_PATH)
}
