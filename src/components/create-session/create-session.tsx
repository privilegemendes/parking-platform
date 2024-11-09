import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { toast } from "~/hooks/use-toast";
import {
  startParkingSessionRequest,
  StartParkingSessionRequest,
} from "~/types/parking-session";
import { useStartSession } from "~/endpoints/sessions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { VehicleTypeSelector } from "~/components/create-session/vehicle-type-selector";
import { Switch } from "~/components/ui/switch";
import { useParkingSessions } from "~/hooks/use-parking-sessions";

export function CreateSession() {
  const startSession = useStartSession();
  const { refetch } = useParkingSessions();

  const form = useForm<StartParkingSessionRequest>({
    resolver: zodResolver(startParkingSessionRequest),
    defaultValues: {
      parkingSession: {
        vehicleType: "",
        isResident: false,
        vehicleLicensePlate: "",
      },
    },
  });

  const onStartSession = async (payload: StartParkingSessionRequest) => {
    try {
      await startSession.mutateAsync(payload).then(() => {
        refetch();
        toast({
          title: "New Session Created",
          description: "started to create session",
        });
      });
    } catch (error) {
      toast({
        title: "Failed to create new session",
        variant: "destructive",
        description: `${error}`,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start a new parking session</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void form.handleSubmit(onStartSession)(event);
              }}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="parkingSession.vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <VehicleTypeSelector
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingSession.vehicleLicensePlate"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Vehicle License Plate</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1"
                        {...field}
                        placeholder={"PF-1234"}
                        aria-invalid={
                          form.formState.errors.parkingSession
                            ?.vehicleLicensePlate
                            ? "true"
                            : "false"
                        }
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.target.value === "")
                            form.clearErrors(
                              "parkingSession.vehicleLicensePlate"
                            );
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parkingSession.isResident"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Resident</FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Create Session</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
