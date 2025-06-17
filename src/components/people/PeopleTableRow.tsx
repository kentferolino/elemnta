import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeletePersonMutation } from "@/store/services/person";
import type { Person } from "@/types/person";
import { toast } from "sonner";

type Props = {
  person: Person;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const PeopleTableRow = ({ person, checked, onCheckedChange }: Props) => {
  const {
    date_of_birth,
    first_name,
    gender,
    home_email,
    last_name,
    marital_status,
    mobile_number,
    office_email,
    preferred_name,
  } = person || {};
  const [deletePerson] = useDeletePersonMutation();

  const handleDelete = async () => {
    try {
      await deletePerson(person.id).unwrap();
      toast.success("Person deleted successfully");
    } catch (error) {
      toast.error("Failed to delete person");
      console.error("Error deleting person:", error);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      </TableCell>
      <TableCell>{first_name}</TableCell>
      <TableCell>{last_name}</TableCell>
      <TableCell>{preferred_name}</TableCell>
      <TableCell>{date_of_birth}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{marital_status}</TableCell>
      <TableCell>{mobile_number}</TableCell>
      <TableCell>{home_email}</TableCell>
      <TableCell>{office_email}</TableCell>
      <TableCell>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PeopleTableRow;
