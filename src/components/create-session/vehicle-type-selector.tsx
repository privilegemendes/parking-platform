import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface Props {
  onChange: (...event: never[]) => void;
  value: string;
}
export const VehicleTypeSelector: FC<Props> = ({ onChange, value }) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a vehicle type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="MOTOR">MOTOR</SelectItem>
          <SelectItem value="CAR">CAR</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
