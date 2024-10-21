import WelcomeMessage from "./components/WelcomeMessage"



function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
              <div className="max-w-md">

              <h1 className='text-3xl text-center font-bold '><img src="/logo192.png" className="w-12 inline-block mr-2 mask mask-circle" alt="dashwind-logo" />Student Management System</h1>

              
              {/* Importing pointers component */}
              <WelcomeMessage />
              
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro