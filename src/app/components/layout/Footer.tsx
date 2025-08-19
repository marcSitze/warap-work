import { getDictionary } from '@/app/dictionaries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'

const Footer = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>}) => {
  const { footer, common } = dictionary;

  return (
    <footer className="bg-muted mt-16 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Warap</h3>
            <p className="text-muted-foreground">
              {footer.title}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{footer.quick_links}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  {footer.about_us}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  {footer.how_it_works}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  {footer.contact_us}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              {footer.subscribe_to_our_newsletter_for_the_latest_job_opportunities}
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" />
              <Button>{common.subscribe}</Button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Warap work. {footer.all_rights_reserved}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer