import Link from "next/link";
import ChildProfile from "@/app/components/ChildProfile";
import { getChildDetail } from "@/app/lib/children";

export default async function ChildDetailPage({
  params,
}: PageProps<"/kids/[id]">) {
  const { id } = await params;
  const detail = getChildDetail(id);

  return (
    <div className="mx-auto w-full max-w-[820px] px-5 pb-14 pt-16 lg:px-10 lg:pb-20 lg:pt-[34px]">
      <Link
        href="/kids"
        className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-muted-2"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver a Niños
      </Link>

      <ChildProfile detail={detail} />
    </div>
  );
}
