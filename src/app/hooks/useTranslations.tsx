import { useEffect, useState } from 'react';
import { getDictionary, LocaleType } from '../dictionaries';

const useTranslations = (lang: LocaleType) => {
  const [dict, setDict] = useState({});
  useEffect(() => {
    async function getTranslations() {
      const translations = await getDictionary(lang)
      setDict(translations);
    }
    getTranslations();
  }, [lang])

  return dict
}

export default useTranslations