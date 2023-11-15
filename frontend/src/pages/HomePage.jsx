import { useEffect, useState } from 'react';

const HomePage = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  const slides = [
    'pepinillos.jpg',
    'tomate.jpg',
    'pesto.jpg',
  ];

  const slideTitles = [
    'Pepinillos',
    'Macarrones con tomatico',
    'Macarrones con pesto',
  ];

  const slideTexts = [
    'Los pepinillos son una variedad de pepino que se recolecta antes de que madure. Necesitamos:— 8-10 pepinillos pequeños\n— Agua\n— Vinagre blanco\n...',
    'Los macarrones con tomate son una receta muy sencilla y sabrosa. Necesitamos:\nMuchos macarrones para alimentar a toda la familia\n— Tomate frito\n— Orégano\n...',
    'Los macarrones con pesto son una receta de pasta muy sencilla y rápida de preparar. Necesitamos:\n— Macarrones\n— Albahaca\n...',
  ];

  return (
    <div className='text-center' style={{overflow:'hidden'}}>
      <div style={{marginLeft:'auto', marginRight:'auto', width:'40%', backgroundColor:'#444', padding:'1%', border:'5px solid #CCC', borderRadius:'20px'}}>
        <img src={slides[slideIndex]} alt='slide' style={{display:'block', marginLeft:'auto', marginRight:'auto', width:'700px', height:'400px', borderRadius:'10px'}}/>
        <button onClick={prevSlide}><img src='leftArrow.png' style={{width:'40px', margin:'5px 10px 5px 5px'}}/></button>
        <button onClick={nextSlide}><img src='rightArrow.png' style={{width:'40px', margin:'5px 5px 5px 10px'}}/></button>
        <p style={{fontSize:'40pt', textShadow:'#888 2px 2px 5px'}}>{slideTitles[slideIndex]}</p>
        <div style={{fontSize:'15pt', textAlign:'left'}}>
          {slideTexts[slideIndex].split('\n').map((item, i) => {
            return (
              <div key={i}>
                {item}
                <br/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
