import { Registration } from "@/components/landing/registration";
import { Particles } from "@/components/particles";

export default function InscricaoPage() {
  return (
    <div className="bg-background">
      <Particles />
      <div className="flex flex-col min-h-[100dvh] items-center py-2 px-4 relative z-10">
        <Registration />
      </div>
    </div>
  );
}
