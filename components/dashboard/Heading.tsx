import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
interface HeadingProps {
  title: string;
  description: string;
  image?: string;
  iconColor?: string;
  bgColor?: string;
  backURL?: string;
}

const Heading = ({
  title,
  description,
  image: imageURL,
  iconColor,
  bgColor,
  backURL,
}: HeadingProps) => {
  const router = useRouter();

  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 text-white">
      {backURL ? (
        <IoChevronBack
          className="cursor-pointer ml-2"
          size={35}
          onClick={() => router.push(backURL)}
        />
      ) : null}
      <div className={cn("p-2 rounded-md", bgColor)}>
        {imageURL ? (
          <Image src={imageURL} width={40} height={40} alt={`Icon-Coin`} />
        ) : null}
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
