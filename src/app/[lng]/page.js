import { useTranslation } from "@/app/i18n"

export default async function World({ params: { lng }}) {
  console.log(lng)
  const { t } = await useTranslation(lng, 'common')
  return (
    <main>
      <h1>{t('weAreTheWorld')}</h1>
    </main>
  )
}