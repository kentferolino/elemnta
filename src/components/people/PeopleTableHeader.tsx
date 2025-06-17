import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { SortOrder } from "@/constants/sort";
import SortIcon from "../common/SortIcon";

type SortField = "first_name" | "last_name";

interface PeopleTableHeaderProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  selectedCount: number;
  totalCount: number;
  onSelectAll: (checked: boolean) => void;
}

const PeopleTableHeader = ({
  sortField,
  sortOrder,
  onSort,
  selectedCount,
  totalCount,
  onSelectAll,
}: PeopleTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox
            checked={selectedCount === totalCount}
            onCheckedChange={onSelectAll}
          />
        </TableHead>
        <TableHead>
          <Button
            variant="ghost"
            className="h-8 flex items-center gap-2 hover:text-foreground"
            onClick={() => onSort("first_name")}
          >
            First name
            <SortIcon
              field="first_name"
              currentField={sortField}
              order={sortOrder}
            />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            variant="ghost"
            className="h-8 flex items-center gap-2 hover:text-foreground"
            onClick={() => onSort("last_name")}
          >
            Last name
            <SortIcon
              field="last_name"
              currentField={sortField}
              order={sortOrder}
            />
          </Button>
        </TableHead>
        <TableHead>Preferred Name</TableHead>
        <TableHead>Date of Birth</TableHead>
        <TableHead>Gender</TableHead>
        <TableHead>Marital Status</TableHead>
        <TableHead>Mobile</TableHead>
        <TableHead>Home Email</TableHead>
        <TableHead>Office Email</TableHead>
        <TableHead className="w-[100px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PeopleTableHeader;
