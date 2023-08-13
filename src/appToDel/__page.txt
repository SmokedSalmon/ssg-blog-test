// import Image from 'next/image'

export default function Home() {
  return (
    // <main className="main-window">
    //   <h1>This is the index page</h1>
    // </main>

    <main>
      <div className='fonts-load'>
        <div style={{fontFamily:'AvenirNextLTPro-BoldCn'}}>&nbsp;</div>
        <div style={{fontFamily:'avenirnextltpro-ultltcn'}}>&nbsp;</div>
        <div style={{fontFamily:'maisonneue-book-webfont'}}>&nbsp;</div>
        <div style={{fontFamily:'maisonneue-demi-webfont'}}>&nbsp;</div>
      </div>


      <div className='main'>
        <div className='wrapper'></div>

        <div id="title-container" style={{display: 'block'}}>
          <h1  className='all-animated' id="title" style={{transform: 'matrix(1, 0, 0, 1, 0, 0)'}}> Jerry</h1> 
          <h2 id="subtitle" className='all-animated' style={{transform: 'matrix(1, 0, 0, 1, 0, 0)'}}>Digital Artist / React / WebXR Developer </h2> 
          <h3 id="sub-jap" className='all-animated' style={{transform: 'matrix(1, 0, 0, 1, 0, 0)'}}>数字艺术 React前端 webXR开发</h3> 

          <p id="text" className='all-animated' style={{transform: 'matrix(1, 0, 0, 1, 0, 0)'}}>WebXR Technologist in Stealth Creative Startup Lab, Previously at HSBC UI Team/  <br /> Based in Shenzhen / Guangzhou  </p>

          <div className='available on all-animated'>
            <div className='available-status'></div>
            <div className='available-text'>Available</div>
          </div>

        </div>

      <div className='labbutton all-animated'>Enter</div>

      <div className='caroussel'>

        <div className='caroussel-content'></div>

      </div>

        </div>

        <div id='img-container'>
          
            {/* <a target='_blank' href='https://www.linkedin.com/in/xxxxx/' className='social' id='linkedin'></a> */}
            {/* <a target='_blank' href='https://twitter.com/xxxx' className='social' id='twitter'></a> */}
  
        </div>

        {/* Available soon */}
        {/* <a href='http://lab.jerry.ninja' className='visit'>Visit lab</a> */}
        <a href='http://lab.jerry.ninja' className='visit' hidden>Visit lab</a>

        <script src="/bundle.formatted.js?version=0.1.0"></script>
      </main>
  )
}
