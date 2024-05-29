export function Shapes() {
  return (
    <>
      <div
        className="pointer-events-none absolute left-0 top-0 -translate-x-2/3 rotate-180 -scale-x-100 opacity-60 blur-3xl"
        aria-hidden="true"
      >
        <img src="./shape.svg" className="max-w-none" width="852" height="582" alt="shape" />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 hidden -translate-x-1/4 rotate-0 opacity-60 blur-3xl lg:block"
        aria-hidden="true"
      >
        <img src="./shape.svg" className="max-w-none" width="852" height="582" alt="shape" />
      </div>
      <div
        className="pointer-events-none absolute right-0 top-0 hidden -translate-x-1/3 translate-y-1/3 scale-x-100 opacity-60 blur-3xl lg:block"
        aria-hidden="true"
      >
        <img src="./shape.svg" className="max-w-none" width="852" height="582" alt="shape" />
      </div>
      <div
        className="pointer-events-none absolute right-0 top-0 hidden opacity-60 blur-3xl lg:block"
        aria-hidden="true"
      >
        <img src="./shape.svg" className="max-w-none" width="852" height="582" alt="shape" />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 right-0 hidden rotate-180 opacity-60 blur-3xl lg:block"
        aria-hidden="true"
      >
        <img src="./shape.svg" className="max-w-none" width="852" height="582" alt="shape" />
      </div>
    </>
  );
}
