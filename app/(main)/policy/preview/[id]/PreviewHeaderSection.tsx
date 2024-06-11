"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

type Props = {
  id: string;
  publishId?: string;
  mutate: () => void;
  isLoading: boolean;
};

export default function PreviewHeaderSection({
  id,
  publishId,
  mutate,
  isLoading,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isHGSE = pathname.includes("hgse");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mb-[20px] flex flex-col items-center justify-between px-[20px] print:hidden sm:flex-row lg:px-0">
      <div className="grid grid-flow-row items-center justify-center">
        <h1 className="text-2xl font-bold leading-normal text-black">
          Preview Page
        </h1>
        <Button
          variant="link"
          onClick={() => router.back()}
          className="flex items-baseline justify-center gap-2 p-0 py-1"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5684 8.08984C11.5684 8.83984 11.4082 9.49414 11.0879 10.0527C10.7715 10.6152 10.3086 11.0508 9.69922 11.3594C9.08984 11.6719 8.34766 11.8281 7.47266 11.8281H6.11914C5.95898 11.8281 5.83008 11.7773 5.73242 11.6758C5.63477 11.5742 5.58594 11.4512 5.58594 11.3066C5.58594 11.1621 5.63477 11.0391 5.73242 10.9375C5.83008 10.8359 5.95898 10.7852 6.11914 10.7852H7.4668C8.13477 10.7852 8.69531 10.6641 9.14844 10.4219C9.60156 10.1836 9.94336 9.85742 10.1738 9.44336C10.4043 9.0293 10.5195 8.55859 10.5195 8.03125C10.5195 7.50781 10.4043 7.04492 10.1738 6.64258C9.94336 6.23633 9.60156 5.91992 9.14844 5.69336C8.69531 5.4668 8.13477 5.35352 7.4668 5.35352H3.44141L1.625 5.27148L1.73047 5.00195L3.17773 6.24414L4.87109 7.89062C4.91406 7.9375 4.94727 7.99023 4.9707 8.04883C4.99805 8.10742 5.01172 8.17383 5.01172 8.24805C5.01172 8.40039 4.96289 8.52539 4.86523 8.62305C4.77148 8.7168 4.64648 8.76367 4.49023 8.76367C4.3457 8.76367 4.2207 8.70898 4.11523 8.59961L0.669922 5.21875C0.611328 5.16406 0.566406 5.10352 0.535156 5.03711C0.507812 4.9707 0.494141 4.90234 0.494141 4.83203C0.494141 4.75781 0.507812 4.6875 0.535156 4.62109C0.566406 4.55469 0.611328 4.49414 0.669922 4.43945L4.11523 1.05859C4.2207 0.949219 4.3457 0.894531 4.49023 0.894531C4.64648 0.894531 4.77148 0.943359 4.86523 1.04102C4.96289 1.13477 5.01172 1.25781 5.01172 1.41016C5.01172 1.48438 4.99805 1.55078 4.9707 1.60938C4.94727 1.66797 4.91406 1.7207 4.87109 1.76758L3.17773 3.41992L1.73047 4.65625L1.625 4.38672L3.44141 4.30469H7.37891C8.26953 4.30469 9.02734 4.46484 9.65234 4.78516C10.2773 5.10547 10.752 5.55078 11.0762 6.12109C11.4043 6.6875 11.5684 7.34375 11.5684 8.08984Z"
              fill="#888888"
            />
          </svg>

          <p className="text-xs font-normal leading-normal text-zinc-500">
            Go back to make more edits
          </p>
        </Button>
      </div>

      <div className="grid grid-flow-col gap-3">
        <HoverCard openDelay={0}>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              onClick={(e) => {
                mutate();
                return e;
              }}
              className="inline-flex h-9 w-[100%] min-w-[177px] items-center justify-center gap-1.5 rounded-[3px] border border-[#4A558E] px-3 py-1.5 text-center text-xs font-bold leading-normal text-[#4A558E] hover:text-[#4A558E]"
              loading={isLoading}
            >
              {publishId ? "Publish policy link" : "Create Publishable link"}
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.23633 12.9629C5.38867 12.9629 4.5918 12.8008 3.8457 12.4766C3.09961 12.1562 2.44141 11.7109 1.87109 11.1406C1.30078 10.5742 0.853516 9.91797 0.529297 9.17188C0.208984 8.42578 0.0488281 7.62695 0.0488281 6.77539C0.0488281 5.92773 0.208984 5.13086 0.529297 4.38477C0.853516 3.63867 1.29883 2.98047 1.86523 2.41016C2.43555 1.83984 3.09375 1.39453 3.83984 1.07422C4.58984 0.75 5.38867 0.587891 6.23633 0.587891C7.08398 0.587891 7.88086 0.75 8.62695 1.07422C9.37695 1.39453 10.0352 1.83984 10.6016 2.41016C11.1719 2.98047 11.6191 3.63867 11.9434 4.38477C12.2676 5.13086 12.4297 5.92773 12.4297 6.77539C12.4297 7.62695 12.2676 8.42578 11.9434 9.17188C11.6191 9.91797 11.1719 10.5742 10.6016 11.1406C10.0352 11.7109 9.37891 12.1562 8.63281 12.4766C7.88672 12.8008 7.08789 12.9629 6.23633 12.9629ZM3.3418 9.58789C3.73242 9.97852 4.16211 10.1562 4.63086 10.1211C5.09961 10.082 5.56055 9.83789 6.01367 9.38867L6.78125 8.64453C7.24219 8.1875 7.49023 7.7207 7.52539 7.24414C7.56055 6.76758 7.37695 6.33594 6.97461 5.94922C6.88477 5.85547 6.78711 5.77344 6.68164 5.70312C6.58008 5.63281 6.48828 5.58203 6.40625 5.55078C6.30859 5.625 6.20898 5.72266 6.10742 5.84375C6.00977 5.96484 5.94336 6.07422 5.9082 6.17188C6.00586 6.19531 6.10352 6.23633 6.20117 6.29492C6.30273 6.34961 6.38672 6.4082 6.45312 6.4707C6.67969 6.70117 6.77539 6.96094 6.74023 7.25C6.70508 7.53906 6.53711 7.83008 6.23633 8.12305L5.51562 8.84961C5.21875 9.13867 4.92578 9.30273 4.63672 9.3418C4.35156 9.37695 4.0957 9.28125 3.86914 9.05469C3.63867 8.83203 3.54102 8.57617 3.57617 8.28711C3.61133 7.99414 3.77539 7.70117 4.06836 7.4082L4.53125 6.96289C4.47656 6.85742 4.44141 6.70508 4.42578 6.50586C4.41016 6.30664 4.42773 6.12695 4.47852 5.9668L3.5293 6.9043C3.08008 7.35742 2.83789 7.82031 2.80273 8.29297C2.76758 8.76172 2.94727 9.19336 3.3418 9.58789ZM8.92578 3.96289C8.53516 3.57227 8.10547 3.39453 7.63672 3.42969C7.16797 3.46484 6.70703 3.70703 6.25391 4.15625L5.48633 4.90625C5.02539 5.35938 4.77734 5.82422 4.74219 6.30078C4.71094 6.77734 4.89453 7.20898 5.29297 7.5957C5.38281 7.68945 5.47852 7.77344 5.58008 7.84766C5.68555 7.91797 5.7793 7.96875 5.86133 8C5.95898 7.92578 6.05664 7.82812 6.1543 7.70703C6.25586 7.58594 6.32422 7.47656 6.35938 7.37891C6.26172 7.35156 6.16211 7.31055 6.06055 7.25586C5.96289 7.19727 5.88086 7.13672 5.81445 7.07422C5.58789 6.84766 5.49219 6.58984 5.52734 6.30078C5.5625 6.00781 5.73047 5.71484 6.03125 5.42188L6.75195 4.70117C7.04883 4.4082 7.33984 4.24414 7.625 4.20898C7.91406 4.17383 8.17188 4.26758 8.39844 4.49023C8.62891 4.7168 8.72656 4.97461 8.69141 5.26367C8.65625 5.55273 8.49219 5.84375 8.19922 6.13672L7.73633 6.58789C7.79492 6.68945 7.83008 6.83984 7.8418 7.03906C7.85742 7.23828 7.83984 7.41992 7.78906 7.58398L8.73828 6.64062C9.19141 6.1875 9.43359 5.72656 9.46484 5.25781C9.5 4.78516 9.32031 4.35352 8.92578 3.96289Z"
                  fill="#606DAB"
                />
              </svg>
            </Button>
          </HoverCardTrigger>
          {publishId && (
            <HoverCardContent
              className="h-[100%] self-center rounded-[5px] border
            border-[#FFA113] bg-[#FFF4E4] p-[15px] md:w-[100%] md:max-w-[725px]"
            >
              <Button asChild variant="link">
                <Link
                  href={isHGSE ? `/${publishId}/hgse` : `/${publishId}`}
                  target="_blank"
                >
                  View published policy
                </Link>
              </Button>
            </HoverCardContent>
          )}
        </HoverCard>
        <Button
<<<<<<< HEAD
          asChild
          onClick={handlePrint}
          className="inline-flex h-9 w-[130px] items-center justify-center gap-1.5 rounded-[3px]
          bg-coursePolicyGreen px-3 py-1.5 hover:bg-coursePolicyHoverGreen"
        >
          <p className="text-center text-xs font-bold leading-normal text-white">
            Print PDF
=======
          onClick={handlePrint}
          className="inline-flex h-9 w-[130px] cursor-pointer items-center justify-center gap-1.5 rounded-[3px] bg-coursePolicyGreen
          px-3 py-1.5 hover:bg-coursePolicyHoverGreen"
        >
          <p className="text-center text-xs font-bold leading-normal text-white">
            Download PDF
>>>>>>> main
          </p>
        </Button>
      </div>
    </div>
  );
}
