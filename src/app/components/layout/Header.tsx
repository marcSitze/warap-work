import { getLocalStorageItem } from '@/app/utils/local-storage'
import { Button } from '@/components/ui/button'
import { AUTH_TOKEN } from '@/constants/local-storage-keys'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const token = getLocalStorageItem(AUTH_TOKEN);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Warap
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/post-job">
            <Button
            >Post a Job</Button>
          </Link>
        {!token && <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>}
        </div>
      </div>
    </header>
  )
}

export default Header