import { RefObject, useEffect, useRef, useState } from "react";

export const useInView = (): [RefObject<HTMLDivElement>, boolean] => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const options = {
      threshold: 1.0,
    };
    let observer: IntersectionObserver;

    if (ref.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setInView(true);
        if (!entries[0].isIntersecting) setInView(false);
      }, options);
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [ref]);

  return [ref, inView];
};
