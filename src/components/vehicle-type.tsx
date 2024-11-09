import { FC } from "react";

interface Props {
  vehicleType: string;
}
export const VehicleType: FC<Props> = ({ vehicleType }) => {
  switch (vehicleType) {
    case "MOTOR":
      return <img src="/MOTOR.svg" alt="Motorcycle" className="h-10 w-10" />;
    case "MOTORCYCLE":
      return <img src="/MOTOR.svg" alt="Motorcycle" className="h-10 w-10" />;
    case "CAR":
      return <img src="/CAR.svg" alt="Car" className="h-10 w-10" />;
  }
};
