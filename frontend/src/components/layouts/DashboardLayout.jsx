import Navbar from '../Navbar'
import { useState } from 'react';
import Sidebar from '../SideBAr';

const DashboardLayout = ({ children }) => {
  const [isShown, setisShown] = useState(false);

  return (
    <div className='flex flex-col w-screen  bg-gray-50 sticky top-0 left-0 z-50'>

      <Navbar toggleSidebar={() => setisShown(!isShown)} isShown={isShown} />

      <div className='md:flex w-full h-full'>

        <div className=' hidden lg:block w-1/4 h-full sticky top-16 z-10'>
          <Sidebar />
        </div>
        
        
        {isShown && (
            <div className='w-full lg:hidden block'>
          <Sidebar />
        </div> 
        )
      }
       
        <main className={`flex w-full ${isShown && 'hidden lg:block'}`}>
          {children}
          
        </main>

      </div>


      </div>
  )
}

export default DashboardLayout