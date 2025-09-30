import Image from "next/image";
import Link from "next/link";
import { REQUIRE_ATTRIBUTION } from "@/lib/imagePolicy";
import images from "@/data/images.json";

type Props = {
  slug: string;
  index?: number;
  alt?: string;
  priority?: boolean;
};

export default function OpenImage({ slug, index = 0, alt = "", priority }: Props) {
  const pool = images.filter((item) => item.slug === slug);
  if (!pool.length) {
    return null;
  }

  const image = pool[index % pool.length];
  const [licenseName] = image.license.split("-");
  const requiresAttribution = REQUIRE_ATTRIBUTION.has(licenseName);

  const credit = (
    <small className="block text-xs text-slate-500 mt-2">
      {requiresAttribution ? (
        <>
          Credit: {image.creator ? image.creator : "Author"} -{" "}
          <Link href={image.attribution.sourcePage} target="_blank" className="underline">
            source
          </Link>{" "}-{" "}
          <Link
            href={`https://creativecommons.org/licenses/${image.license.replace("-", "/")}/`}
            target="_blank"
            className="underline"
          >
            license
          </Link>
        </>
      ) : (
        <>Image via Openverse</>
      )}
    </small>
  );

  return (
    <figure>
      <Image
        src={image.filePath}
        alt={alt || image.title || "Mushroom coffee"}
        width={1280}
        height={720}
        priority={priority}
      />
      {credit}
    </figure>
  );
}
