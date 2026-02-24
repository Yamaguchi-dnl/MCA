import { Registration } from "@/components/landing/registration";
import { Particles } from "@/components/particles";

export default function InscricaoPage() {
  return (
    <>
      <Particles />
      <div className="flex flex-col min-h-[100dvh] items-center py-8 sm:py-12 px-4 relative z-10">
        <Registration />
      </div>
    </>
  );
}
