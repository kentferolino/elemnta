import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { SortOrder } from "@/constants/sort";

type Props = {
  field: string;
  currentField: string;
  order: SortOrder;
};

const SortIcon = ({ field, currentField, order }: Props) => {
  if (field !== currentField) {
    return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
  }

  return order === "asc" ? (
    <ArrowUp className="h-4 w-4 text-primary" />
  ) : (
    <ArrowDown className="h-4 w-4 text-primary" />
  );
};

export default SortIcon;
