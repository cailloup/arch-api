import Head from 'next/head'

import Form from '@/components/form'
import { DragMenu } from '@/components/dragMenu'
import { formRegisterFields } from '@/utils/formfields'

export default function Home() {
  return (
    <>
      <Head>
        <title>Registrar</title>
        <meta name="description" content="Registre edificios" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <DragMenu defaultWidth={50}>
        <div className='p-80'>
          <Form formComponents={formRegisterFields}></Form>
        </div>
      </DragMenu>
    </>
  )
}