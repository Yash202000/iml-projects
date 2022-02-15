import React ,{useEffect,useState} from 'react';

export default function Navbar(props) {
  
  const [stack, setstack] = useState(
    {
      result: [],
      done: undefined
    }
  )

  useEffect(() => {
    var temp = []
    if (props.signup==='1'){
      temp.push(<li key='1' className="nav-item"><a href="/signup" className="nav-link">Signup</a></li>)
    }
    if(props.signin==='1'){
      temp.push(<li key='2' className="nav-item"><a href="/signin" className="nav-link">Signin</a></li>)
    }
    if(props.home==='1'){
      temp.push(<li key='3' className="nav-item"><a href="/home" className="nav-link" >Home</a></li>)
    }
    setstack(
      {
        result: temp,
        done: true
      }
    )
    
  }, [])
  
  
  return <>
  <nav className="navbar navbar-expand-lg py-3 navbar-light bg-light shadow-sm">
  <div className="container">
    <a href="/" className="navbar-brand">
      <img src="https://bootstrapious.com/i/snippets/sn-nav-logo/logo.png" width="75" alt="" className="d-inline-block align-middle mr-2"/>
    
      {/* <span className="text-uppercase font-weight-bold">Company</span> */}
    </a>

    <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>
    <div id="navbarSupportedContent" className="collapse navbar-collapse">
      <ul className="navbar-nav ml-auto" id='ulList'>
      
        {stack.result}
        
      </ul>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onClick={()=>{
      window.localStorage.removeItem('Token');
      window.location.href='/';}} className="bi bi-power" viewBox="0 0 16 16">
      <path d="M7.5 1v7h1V1h-1z"/>
      <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
    </svg>
  </div>
</nav>
  </>;
}
