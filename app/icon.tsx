import { ImageResponse } from 'next/og'
import Logo from '@/components/sections/navbar/logo'

const Icon = () => {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#db2777',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          color: 'white',
        }}
      >
        <Logo width={20} height={20} />
      </div>
    ),
    { 
      width:  32, 
      height: 32 
    }
  )
}

export default Icon;