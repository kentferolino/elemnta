import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetPeopleQuery,
  useDeletePeopleMutation,
} from "@/store/services/person";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import PeopleTableRow from "./PeopleTableRow";
import { toast } from "sonner";
import CreatePersonForm from "./createPersonForm/CreatePersonForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PeopleTable = () => {
  const { data: people, isLoading, error } = useGetPeopleQuery();
  const [deletePeople] = useDeletePeopleMutation();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(people?.map((person) => person.id) || []);
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
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === (people?.length || 0)}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Name</TableHead>
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
          <TableBody>
            {people?.map((person) => {
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
    </div>
  );
};

export default PeopleTable;
