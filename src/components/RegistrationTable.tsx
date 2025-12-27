import { Registration } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface RegistrationTableProps {
  registrations: Registration[];
}

const RegistrationTable = ({ registrations }: RegistrationTableProps) => {
  if (registrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No registrations yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Year</TableHead>
            <TableHead className="font-semibold">Department</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Phone</TableHead>
            <TableHead className="font-semibold">Registered</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration, index) => (
            <TableRow 
              key={registration.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-medium">{registration.name}</TableCell>
              <TableCell>{registration.year}</TableCell>
              <TableCell>{registration.department}</TableCell>
              <TableCell className="text-muted-foreground">{registration.email}</TableCell>
              <TableCell className="text-muted-foreground">{registration.phone}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(registration.registeredAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegistrationTable;
