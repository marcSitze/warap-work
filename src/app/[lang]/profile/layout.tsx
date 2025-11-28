"use client"
import getDecodedToken from '@/app/utils/getDecodedToken';
import { LOGIN } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Layout({ children }: LayoutProps<"/[lang]/profile">) {
  const decodedUser = getDecodedToken();
  const router = useRouter();
  if(!decodedUser) return router.push(`/${LOGIN}`)

  return (
    <div>{children}</div>
  )
}
