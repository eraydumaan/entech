import Image from "next/image";

export default function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Image src="/akis-mark.png" alt="" width={64} height={64} />
    </span>
  );
}
