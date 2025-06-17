import { Table, TableBody } from "@/components/ui/table";
import {
  useGetPeopleQuery,
  useDeletePeopleMutation,
} from "@/store/services/person";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTableControls } from "@/hooks/useTableControls";
import type { Person } from "@/types/person";
import PeopleTableHeader from "./PeopleTableHeader";
import PeopleTableRow from "./PeopleTableRow";
import CreatePersonForm from "./createPersonForm/CreatePersonForm";
import TablePagination from "../common/TablePagination";

type SortField = "first_name" | "last_name";

const PeopleTable = () => {
  const { data: people, isLoading, error } = useGetPeopleQuery();
  const [deletePeople] = useDeletePeopleMutation();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const {
    tableData,
    currentPage,
    pageSize,
    totalPages,
    sortField,
    sortOrder,
    handleSort,
    setCurrentPage,
    handlePageSizeChange,
  } = useTableControls<Person, SortField>({
    data: people || [],
    defaultSortField: "first_name",
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(tableData.map((person) => person.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return;

    try {
      await deletePeople(selectedRows).unwrap();
      toast.success(`Successfully deleted ${selectedRows.length} person(s)`);
      setSelectedRows([]);
    } catch (error) {
      toast.error("Failed to delete selected people");
      console.error("Error deleting people:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading people data</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Person</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Person</DialogTitle>
            </DialogHeader>
            <CreatePersonForm onSuccess={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
        {selectedRows.length > 0 && (
          <Button variant="destructive" onClick={handleDeleteSelected}>
            Delete Selected ({selectedRows.length})
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <PeopleTableHeader
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            selectedCount={selectedRows.length}
            totalCount={tableData.length}
            onSelectAll={handleSelectAll}
          />
          <TableBody>
            {tableData.map((person) => {
              const { id } = person;
              return (
                <PeopleTableRow
                  key={id}
                  person={person}
                  checked={selectedRows.includes(id)}
                  onCheckedChange={(checked: boolean) =>
                    handleSelectRow(id, checked)
                  }
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={(people || []).length}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PeopleTable;
