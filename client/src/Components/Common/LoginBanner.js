import React from 'react'
import bannerImg from '../../Assets/Images/citizenBanner.png'
import bannerImg2 from '../../Assets/Images/policeBanner.png'
import '../../Assets/Styles/LoginBanner.css'

function LoginBanner({user}) {

  if(user=='citizen'){
    return (
      <div>
        <div className='citizen_banner' >
          <img src={bannerImg} className='img-fluid' alt='citizen_banner' />
        </div>
      </div>
    )
  }else if(user=='police'){
    return (
      <div>
        <div className='citizen_banner' >
          <img src={bannerImg2} className='img-fluid' alt='police_banner' />
        </div>
      </div>
    )
  }

 
}

export default LoginBanner
