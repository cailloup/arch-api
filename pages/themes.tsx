import Head from 'next/head'
import { useCallback, useContext } from 'react'
import { ThemesKey } from '@/styles/themes'
import {ThemeContext } from '@/components/layout'
import { Select } from '@/components/assets';

export default function Home() {
  const { theme, setTheme} = useContext(ThemeContext);
  
  const changeTheme = useCallback((theme: ThemesKey )=>{
    setTheme(theme)
    localStorage.setItem('theme',theme)
  },[])

  return (
    <>
      <Head>
        <title>Temas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />  
      </Head>
      <div className='container-centered'>
        <h1>Selector de temas</h1>
          <Select  style={{width:'250px', fontSize:'20px'}} defaultValue={theme} onChange={({currentTarget}) => changeTheme(currentTarget.value as ThemesKey)} name="" id="">
            <option value={'default'}> Default</option>
            <option value={'dark'}> dark</option>
            <option value={'blueDark'}> blueDark</option>
          </Select>
      </div>
      
    </>
  )
}
