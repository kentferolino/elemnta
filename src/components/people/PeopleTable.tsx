import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPeopleQuery } from "@/store/services/person";

const PeopleTable = () => {
  const { data: people, isLoading, error } = useGetPeopleQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading people data</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First name</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Preferred Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Marital Status</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Home Email</TableHead>
            <TableHead>Office Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people?.map((person) => {
            const {
              date_of_birth,
              first_name,
              gender,
              home_address,
              home_email,
              id,
              last_name,
              marital_status,
              mobile_number,
              office_address,
              office_email,
              preferred_name,
            } = person;
            return (
              <TableRow key={id}>
                <TableCell>{first_name}</TableCell>
                <TableCell>{last_name}</TableCell>
                <TableCell>{preferred_name}</TableCell>
                <TableCell>{date_of_birth}</TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>{marital_status}</TableCell>
                <TableCell>{mobile_number}</TableCell>
                <TableCell>{home_email}</TableCell>
                <TableCell>{office_email}</TableCell>
                <TableCell>{home_address}</TableCell>
                <TableCell>{office_address}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PeopleTable;
