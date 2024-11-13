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
import { useParkingSpaces } from "~/hooks/use-parking-spaces";

export function CreateSession() {
  const startSession = useStartSession();
  const { refetch: refetchSessions } = useParkingSessions();
  const { refetch: refetchSpaces } = useParkingSpaces();

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
      await startSession.mutateAsync(payload).then((response) => {
        refetchSessions();
        refetchSpaces();
        toast({
          title: text.toast.success.title,
          description: text.toast.success.description(
            response.startedSession.vehicleLicensePlate
          ),
        });
      });
    } catch (error) {
      toast({
        title: text.toast.error.title,
        variant: "destructive",
        description: text.toast.error.description(error),
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{text.dialog.triggerButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{text.dialog.title}</DialogTitle>
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
                    <FormLabel>{text.form.vehicleTypeLabel}</FormLabel>
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
                    <FormLabel>{text.form.vehicleLicensePlateLabel}</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1"
                        {...field}
                        placeholder={text.form.vehicleLicensePlatePlaceholder}
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
                    <FormLabel>{text.form.residentLabel}</FormLabel>
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
                  <Button type="submit">{text.form.submitButton}</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const text = {
  dialog: {
    triggerButton: "Create Session",
    title: "Start a new parking session",
  },
  form: {
    vehicleTypeLabel: "Vehicle Type",
    vehicleLicensePlateLabel: "Vehicle License Plate",
    vehicleLicensePlatePlaceholder: "PF-1234",
    residentLabel: "Resident",
    submitButton: "Create Session",
  },
  toast: {
    success: {
      title: "New Session Created",
      description: (text: string) => `New vehicle added License Plate: ${text}`,
    },
    error: {
      title: "Failed to create new session",
      description: (error: unknown) => `${error}`,
    },
  },
};
