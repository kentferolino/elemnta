import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (value: string) => void;
  totalPages: number;
}

const TablePagination = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  totalPages,
}: Props) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <Select value={pageSize.toString()} onValueChange={onPageSizeChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
