import { usePathname } from 'next/navigation';
import React from 'react';

const useLocation = () => {
  const [currentPath, setCurrentPath] = React.useState('');
  const pathname = usePathname()

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(pathname);
    }
  }, []);


  const isFrench = currentPath.startsWith("/fr");
  const localizeUrl = (url: string) => isFrench ? `/fr${url}` :  `/en${url}`

  return {
    isFrench,
    currentPath,
    localizeUrl,
    lang: isFrench ? 'fr' : 'en',
  }
}

export default useLocation;
