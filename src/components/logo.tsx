import Image from 'next/image';

export function Logo(props: { className?: string }) {
  return (
    <Image
      src="https://ik.imagekit.io/leosmc2zb/Page%20-%20S%C3%A1bado%20total%20MCA/IMG_5680.PNG"
      alt="Logo do Sábado Total da Igreja Adventista da Promessa em Barreirinha"
      width={1024}
      height={1024}
      className={props.className}
    />
  );
}
