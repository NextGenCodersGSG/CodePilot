import { DocsLayout } from '@/components/documentation/docs-layout';
import { IntegrationContent } from '@/components/documentation/integration-content';
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({ params }: { params: Promise<{ section: string }> }) => {
  const {section} = await params;

  if(section === 'integration') return (
    <DocsLayout>
      <IntegrationContent />
    </DocsLayout>
  ); else{
    notFound();
  }
}

export default Page
