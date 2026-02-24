import Image from 'next/image';

export function Logo(props: { className?: string }) {
  return (
    <Image
      src="https://ik.imagekit.io/leosmc2zb/Page%20-%20S%C3%A1bado%20total%20MCA/ChatGPT%20Image%2024%20de%20fev.%20de%202026,%2016_56_27.png"
      alt="Sábado Total MCA Logo"
      width={1024}
      height={1024}
      className={props.className}
    />
  );
}
