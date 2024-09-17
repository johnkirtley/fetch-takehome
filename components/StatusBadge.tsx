import { Badge } from "@/components/ui/badge";

export default function StatusBadge() {
  const randomNum = Math.floor(Math.random() * 1000) + 1;

  const determineStatus =
    randomNum % 2 === 0
      ? { status: "Looking For A Home", color: "bg-green-600" }
      : { status: "Pending Adoption", color: "bg-yellow-600" };

  return (
    <Badge className={`${determineStatus.color} w-max mt-3 mr-2`}>
      {determineStatus.status}
    </Badge>
  );
}
