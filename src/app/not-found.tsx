export default function NotFound() {
  return (
    <main>
      <div className='container m-auto px-3 pt-6 pb-24'>
        <div className='h-[300px] sm:h-[400px] md:h-[600px] bg-gradient-radial from-10% from-blue-300/[.07] via-40% via-blue-400/[.07] to-60% flex flex-col justify-center items-center'>
          <section className='text-center'>
            <h1 className='mt-20 text-[82px] md:text-[200px] font-black'>
              4O4
            </h1>
            <h4 className='mt-6 md:mt-10 text-2xl md:text-3xl font-bold'>
              Something is wrong
            </h4>
            <h2 className='mt-1 text-sm md:text-lg'>
              The page you are looking for was moved, removed, renamed or might
              never existed!
            </h2>
          </section>
        </div>
      </div>
    </main>
  );
}
