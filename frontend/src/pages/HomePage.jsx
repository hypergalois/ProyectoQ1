import { useEffect, useState } from 'react';

const HomePage = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const navigateSlide = (direction) => {
    if (direction === "next") {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    } else {
      setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => navigateSlide("next"), 7000);
    return () => clearInterval(interval);
  }, [slideIndex])


  const slides = [
    '/carrousel-images/pepinillos.jpg',
    '/carrousel-images/tomate.jpg',
    '/carrousel-images/pesto.jpg',
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
    <div className='flex flex-col items-center'>

      <div className='flex flex-col items-center '>

        <div className='text-center mb-8'>
          <h1 className='text-9xl text-gray-800 font-bold my-6'>TapaTertulia</h1>
          <p className='text-3xl text-gray-600 mt-2'>Tu mejor lugar para hacer amigos con la cocina</p>
        </div>
      </div>


      <div className='relative w-4/5 md:w-1/2 lg:w-2/5 bg-gray-800 p-4 rounded-xl my-4'>

        <img src={slides[slideIndex]} alt='slide' className='block mx-auto w-full h-96 object-cover rounded-lg' />

        <h2 className='text-4xl text-white font-bold mt-4'>{slideTitles[slideIndex]}</h2>

        <div className='text-white text-left text-lg mt-2'>
          {slideTexts[slideIndex].split('\n').map((item, index) => (
            <p key={index} className='mb-1'>
              {item}
            </p>
          ))}
        </div>

        <button onClick={() => navigateSlide('prev')} className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full'>
          &lt;
        </button>
        <button onClick={() => navigateSlide('next')} className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full'>
          &gt;
        </button>
      </div>
    </div>
  );

};

export default HomePage;
