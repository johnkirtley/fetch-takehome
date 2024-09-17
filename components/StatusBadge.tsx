import { Badge } from "@/components/ui/badge";

export default function StatusBadge() {
  const randomNum = Math.floor(Math.random() * 1000) + 1;

  const determineStatus =
    randomNum % 2 === 0
      ? { status: "Looking For A Home", color: "bg-green-600" }
      : { status: "Pending Adoption", color: "bg-yellow-600" };

  const { status } = determineStatus;

  return (
    <Badge
      className={`${determineStatus.color} absolute z-10 top-[155px] w-max ${status === "Pending Adoption" ? "md:left-[147px] left-[144px]" : "left-[130px] md:left-[134px]"} `}
    >
      {determineStatus.status}
    </Badge>
  );
}
