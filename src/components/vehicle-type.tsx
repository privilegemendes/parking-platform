import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface Props {
  vehicleType: string;
}

export const VehicleType: FC<Props> = ({ vehicleType }) => {
  let iconSrc = "";
  let altText = "";

  switch (vehicleType) {
    case "MOTOR":
    case "MOTORCYCLE":
      iconSrc = "/MOTOR.svg";
      altText = "Motorcycle";
      break;
    case "CAR":
      iconSrc = "/CAR.svg";
      altText = "Car";
      break;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <img src={iconSrc} alt={altText} className="h-10 w-10" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{altText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
